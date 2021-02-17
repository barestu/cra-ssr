import {
  createStore as reduxCreateStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import todoReducer from './reducers';

const rootReducers = combineReducers({
  todos: todoReducer,
});

const createStore = (preloadedState = {}) => {
  const store = reduxCreateStore(
    rootReducers,
    { ...preloadedState },
    applyMiddleware(thunk)
  );
  return store;
};

export default createStore;
