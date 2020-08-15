import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

//applyMiddleware => promise with 'thunk'

import pokesReducer from './pokeducks'

const rootReducer = combineReducers({
  pokemones: pokesReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
  return store
}