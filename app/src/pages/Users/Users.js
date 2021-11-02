import React, {useState, useEffect,} from 'react';
import {useHistory} from 'react-router-dom';
import * as api from '../../api';
import Card from '../../components/Card'
import { Button } from "tabler-react";


export function Users({user}) {
  const [users, setUsers] = useState([])
  const [error, setError] = useState()

  const history = useHistory()

  const disconnectUser = () => {
    api.removeToken()
    history.push('/login')
  }

  useEffect(()=> {
    (async ()=>{

      try {
        let pendingUsers = await api.fetchApi("user/all")
        setUsers(pendingUsers)
      }catch (e) {
        console.log(e.data || e);
        setError(e.data || 'An error occurred');
        return;
      }
    })()
  }, [])

  return(
    <div className="page-wrapper">
        <div className="container-xl">
          <div className="page-header page-header-border">
            <div className="row align-items-center w-100">
              <div className="col">
                <h2 className="page-title">
                  Users
                </h2>
                <div className="text-muted mt-1">{users.length} people</div>
              </div>
              <div className="col-auto">
                  <Button className="btn-primary" onClick={disconnectUser}>Disconnect</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="page-body">
          <div className="container-xl">
            <div className="row row-cards">
              {users.map(user => <Card data={user} key={user._id}/>)}
            </div>
            {error && (
              <div className="row">
                <div className="alert alert-danger">
                {error}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  )}
