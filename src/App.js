import './App.css'
import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'

function App() {
    return (
        <div className="App">

            <Link to='/signin'>
                Sign in
            </Link>
            <Switch>
                <Route exact path='/signin'/>
            </Switch>
        </div>
    )
}

export default App
