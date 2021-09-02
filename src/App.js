import './App.css'
import React from 'react'
import {Route, Switch} from 'react-router-dom'
import LogInPage from './components/pages/log-in-page/log-in-page'
import ProfilePage from './components/pages/profile-page/profile-page'
import HomePage from './components/pages/home-page/home-page'


function App() {
    return (
        <Switch>
            <Route exact path='/log-in' component={LogInPage}/>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/profile' component={ProfilePage}/>
        </Switch>
    )
}

export default App
