import SET_CURRENT_TOKEN from './jwt.types'

export const setCurrentToken = token => (
    {
        type: SET_CURRENT_TOKEN,
        payload: token
    }
)
