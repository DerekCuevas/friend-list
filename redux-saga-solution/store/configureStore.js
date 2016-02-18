import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import saga from '../sagas';
import sagaMonitor from '../sagaMonitor'

const createStoreWithMiddleware = applyMiddleware(
  sagaMonitor,
  createLogger(),
  createSagaMiddleware(saga)
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}
