import {all} from 'redux-saga/effects'
import {watchSetCurrentUserAsync} from './user/user.sagas'

export default function* rootSaga() {
    yield all([watchSetCurrentUserAsync()])
}
