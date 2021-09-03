import './App.css'
import React, {useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import LogInPage from './components/pages/log-in-page/log-in-page'
import ProfilePage from './components/pages/profile-page/profile-page'
import HomePage from './components/pages/home-page/home-page'
import {connect} from 'react-redux'
import {setCurrentUser} from './redux/user/user.actions'

function App({currentUser, setCurrentUser}) {
    useEffect(() => {
        console.log('effect in app.')
        if (JSON.stringify(currentUser) !== localStorage.getItem('currentUser'))
            setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
    })
    return (
        <>
            {/*<div>*/}
            {/*    <span>is auth in local stor: {localStorage.getItem('currentUser')}</span>*/}
            {/*</div>*/}
            {/*<span>is auth in redux: {JSON.stringify(currentUser)}</span>*/}
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
        </>
    )
}


const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
