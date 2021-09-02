import './App.css'
import React, {useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import LogInPage from './components/pages/log-in-page/log-in-page'
import ProfilePage from './components/pages/profile-page/profile-page'
import HomePage from './components/pages/home-page/home-page'
import {connect} from 'react-redux'
import {log_in_user, log_out_user} from './redux/user/user.actions'

function App({isAuthenticated, log_in_user, log_out_user}) {
    useEffect(() => {
        console.log('effect in app.')
        if (localStorage.getItem('isAuthenticated')) {
            console.log('log in')
            log_in_user()
        } else {
            log_out_user()
        }
    })
    return (
        <>
            <div>
                <span>is auth in local stor: {localStorage.getItem('isAuthorized')}</span>
            </div>
            <span>is auth in redux: {String(isAuthenticated)}</span>
            <Switch>
                <Route exact path='/log-in'>
                    {isAuthenticated ? <Redirect to='/profile'/> :
                        <LogInPage/>}
                </Route>
                <Route exact path='/' component={HomePage}/>
                <Route exact path='/profile'>
                    {isAuthenticated ? <ProfilePage/> : <Redirect to='/sign-up'/>}
                </Route>
            </Switch>
        </>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
})

const mapDispatchToProps = {log_in_user, log_out_user}

export default connect(mapStateToProps, mapDispatchToProps)(App)
