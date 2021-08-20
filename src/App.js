import './App.css'
import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import LogInPage from './components/pages/log-in-page/log-in-page.component'


function App() {
    return (
        <div className="App">

            <Link to='/log-in'>
                Log in
            </Link>
            <Switch>
                <Route exact path='/log-in' component={LogInPage}/>
            </Switch>
        </div>
    )
}

export default App
