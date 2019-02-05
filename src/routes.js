import React from 'react'
import {Switch, Route} from 'react-router-dom';
//Components
import Login from './Components/Login/Login';
import Register from './Components/Login/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import DetailedBracket from './Components/DetailedBracket/DetailedBracket';

export default <Switch>
    <Route exact path='/' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/bracket/:name/:id' component={DetailedBracket} />
</Switch>