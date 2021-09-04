import './App.css'
import React, {useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import LogInPage from './components/pages/log-in-page/log-in-page'
import ProfilePage from './components/pages/profile-page/profile-page'
import HomePage from './components/pages/home-page/home-page'
import {useDispatch, useSelector} from 'react-redux'
import {setCurrentUserAsync} from './redux/user/user.actions'


const selectCurrentUser = state => state.user.currentUser

function App() {
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('effect in app.')
        if (JSON.stringify(currentUser) !== localStorage.getItem('currentUser'))
            dispatch(setCurrentUserAsync(JSON.parse(localStorage.getItem('currentUser'))))
    })
    return (
        <Switch>
            <Route exact path='/log-in'>
                {currentUser ? <Redirect to='/profile'/> :
                    <LogInPage/>}
            </Route>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/profile'>
                {currentUser ? <ProfilePage/> : <Redirect to='/log-in'/>}
            </Route>
        </Switch>
    )
}


export default App
