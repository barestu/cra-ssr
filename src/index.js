import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import App from './App';
import createStore from './store';
import './index.css';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = createStore(preloadedState);

window.main = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    );
  });
};
