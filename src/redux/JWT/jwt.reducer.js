const INITIAL_STATE = {
    currentTokens: null
}

const jwtReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case 'SET_CURRENT_TOKENS':
        return {
            ...state,
            currentTokens: action.payload
        }
    default:
        return state
    }
}

export default jwtReducer
