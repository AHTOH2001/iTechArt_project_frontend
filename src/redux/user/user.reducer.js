import {LOG_IN} from './user.types'
import {LOG_OUT} from './user.types'

const INITIAL_STATE = {
    isAuthenticated: false
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case LOG_IN:
        return {
            ...state,
            isAuthenticated: true
        }
    case LOG_OUT:
        return {
            ...state,
            isAuthenticated: false
        }
    default:
        return state
    }
}

export default userReducer
