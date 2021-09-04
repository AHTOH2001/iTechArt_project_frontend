import {SET_CURRENT_USER, SET_CURRENT_USER_ASYNC} from './user.types'

export const setCurrentUser = user => {
    localStorage.setItem('currentUser', JSON.stringify(user))
    return (
        {
            type: SET_CURRENT_USER,
            payload: user
        }
    )
}

export const setCurrentUserAsync = user => {
    return (
        {
            type: SET_CURRENT_USER_ASYNC,
            payload: user
        }
    )
}
