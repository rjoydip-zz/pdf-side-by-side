import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'

// CREATING INITIAL STORE
export default (initialState: any) => {
  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )

  // IF REDUCERS WERE CHANGED, RELOAD WITH INITIAL STATE
  if ((module as any).hot) {
    (module as any).hot.accept('./reducers', () => {
      const createNextReducer = require('./reducers').default

      store.replaceReducer(createNextReducer(initialState))
    })
  }

  return store
}
