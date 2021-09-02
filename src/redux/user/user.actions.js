import {LOG_IN} from './user.types'
import {LOG_OUT} from './user.types'

export const log_in_user = () => {
    localStorage.setItem('isAuthorized', 'true')
    return (
        {
            type: LOG_IN
        }
    )
}

export const log_out_user = () => {
    localStorage.removeItem('isAuthorized')
    console.log('log out')
    return (
        {
            type: LOG_OUT
        }
    )
}
