import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './root-reducer'
import rootSaga from './root-saga'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [logger, sagaMiddleware]

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store

sagaMiddleware.run(rootSaga)
