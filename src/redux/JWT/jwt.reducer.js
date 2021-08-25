import SET_CURRENT_TOKEN from './jwt.types'

const INITIAL_STATE = {
    currentToken: null
}

const jwtReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case SET_CURRENT_TOKEN:
        return {
            ...state,
            currentToken: action.payload
        }
    default:
        return state
    }
}

export default jwtReducer
