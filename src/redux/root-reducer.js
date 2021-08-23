import jwtReducer from './JWT/jwt.reducer'

import {combineReducers} from 'redux'


export default combineReducers({
    jwt: jwtReducer
})
