import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import rootReducer from '../reducers';

const debugware = [];
if (process.env.NODE_ENV !== 'production') {
  debugware.push(createLogger({
    collapsed: true,
    // predicate: (getState, action) => action.type !== ActionType.UPDATE_COUNT,
  }));
}


export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(
      thunk,
      promise,
      ...debugware,
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
