import path from 'path';
import fs from 'fs';
import React from 'react';
import express from 'express';
import serialize from 'serialize-javascript';
import ReactDOMServer from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from '../src/App';
import routes from '../src/routes';
import createStore from '../src/store';

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static('./build'));

app.get('/*', (req, res) => {
  const currentRoute = routes.find(route => matchPath(req.url, route)) || {};
  const store = createStore();

  let promise;

  if (currentRoute.loadData) {
    promise = currentRoute.loadData(store);
  } else {
    promise = Promise.resolve(null);
  }

  promise.then(() => {
    const context = {};
    const app = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );

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
          .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
          .replace(
            '</body>',
            `<script>window.__PRELOADED_STATE__ = ${serialize(store.getState()).replace(
              /</g,
              '\\u003c'
            )}</script></body>`
          )
      );
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
