import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from '../reducers';

const middleware = [thunk, createLogger()];

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, applyMiddleware(...middleware));

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
