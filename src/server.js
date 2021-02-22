import path from 'path';
import fs from 'fs';
import express from 'express';
import serialize from 'serialize-javascript';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable-ssr-addon';

import App from './App';
import routes from './routes';
import createStore from './store';
import manifest from '../build/server/assets-manifest.json';

const PORT = process.env.PORT || 3006;
const app = express();

app.use('/static', express.static('./build/static'));
app.use('/server', express.static('./build/server'));

app.get('*', (req, res) => {
  console.log('GET', req.url);

  const modules = new Set();

  const currentRoutes = matchRoutes(routes, req.path);
  const store = createStore();

  const promises = currentRoutes
    .map(({ route, match }) => {
      if (route.component.preload) {
        // Loadabable Component, preload first
        return route.component.preload().then(res => {
          return res.default.loadData ? res.default.loadData(store, route, match) : null;
        });
      }
      // Regular Component
      return route.component.loadData ? route.component.loadData(store, route, match) : null;
    })
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
      return null;
    });

  Promise.all(promises).then(() => {
    const context = {};
    const app = ReactDOMServer.renderToString(
      <Loadable.Capture report={moduleName => modules.add(moduleName)}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </Loadable.Capture>
    );

    const modulesToBeLoaded = [...manifest.entrypoints, ...Array.from(modules)];
    const bundles = getBundles(manifest, modulesToBeLoaded);
    const styles = bundles.css || [];
    const scripts = bundles.js || [];

    // res.send(`
    //   <!doctype html>
    //   <html lang="en">
    //     <head>
    //       <meta charset="utf-8" />
    //       <title>CRA SSR</title>
    //       ${styles.map(style => {
    //         return `<link href="/assets/${style.file}" rel="stylesheet" />`;
    //       }).join('\n')}
    //     </head>
    //     <body>
    //       <div id="root">${app}</div>
    //       ${scripts.map(script => {
    //         return `<script src="/assets/${script.file}"></script>`
    //       }).join('\n')}
    //     </body>
    //   </html>
    // `);

    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, indexData) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('Oops, better luck next time!');
      }

      if (context.status === 404) {
        res.status(404);
      }

      if (context.url) {
        return req.redirect(301, context.url);
      }

      return res.send(
        indexData
          .replace(
            '</head>',`
            ${styles.map(style => {
                return `<link href="/server/${style.file}" rel="stylesheet"/>`;
              }).join('\n')}
            </head>
            `
          )
          .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
          .replace(
            '</body>',
            `
              <script>window.__PRELOADED_STATE__ = ${serialize(store.getState()).replace(
                /</g,
                '\\u003c'
              )}</script>
              </body>
            `
          )
          .replace(
            '</body>',
            `
              ${scripts.map(script => {
                return `<script src="/server/${script.file}"></script>`
              }).join('\n')}
              <script>window.main();</script>
              </body>
            `
          )
      );
    });
  });
});

Loadable.preloadAll()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`React Server is running on: http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.log('Error Server Preload', err);
  });
