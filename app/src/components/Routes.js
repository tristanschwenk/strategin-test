
import React, {useEffect} from 'react'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import { Login } from '../pages/Login/Login'
import {Register} from '../pages/Register/Register'
import {Users} from '../pages/Users/Users';
import {NotFound} from '../pages/NotFound/NotFound'

import * as api from '../api';


export const Routes = () => {

    const history = useHistory()
    const location = useLocation();


    useEffect(() => {
        (async ()=>{
            
          if (api.getToken()=== null && location.pathname !== "/register") {
            await history.push('/login')
          }
          if (location.pathname !== "/login") {
            if(typeof api.getToken() !== 'string') return;
            api.checkToken()
          }
        })()
    }, [])

    return (
        <Switch>
            <Route path="/users">
                <Users />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route component={NotFound} />
        </Switch>
    )
}


