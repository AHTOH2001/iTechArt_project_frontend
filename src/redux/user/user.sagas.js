import {put, takeEvery} from 'redux-saga/effects'
import {setCurrentUser} from './user.actions'
import {SET_CURRENT_USER_ASYNC} from './user.types'

export function* setCurrentUserAsync(action) {
    yield put(setCurrentUser(action.payload))
}

export function* watchSetCurrentUserAsync() {
    yield takeEvery(SET_CURRENT_USER_ASYNC, setCurrentUserAsync)
}
