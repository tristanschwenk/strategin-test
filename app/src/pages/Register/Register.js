import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import "tabler-react/dist/Tabler.css";
import { Page, Card, Form, Button } from "tabler-react";
import * as api from '../../api'

export function Register({setUser}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [error, setError] = useState();


  const history = useHistory()

  const sendRegister = async (data) => {
    let user
    try {
       user = await api.fetchApi(`user/register`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      
    } catch (e) {
      console.log(e.data || e);
      setError(e.data || 'An error occurred');
      return;
    }

    if (user) {
      history.push("/login")
    }
    
    return user
  }

  const submit = async e => {
    e.preventDefault()

    await sendRegister({firstName, lastName, email, password})
  }

  return(
    <Page className="page-center">
      <div className="container-tight py-4">
      <Card className="card-md">
        <Card.Body>
          <h1 className="text-center card-title mb-4">Register</h1>
          <Form onSubmit={submit}>
          {error && (
              <div class="alert alert-danger">
                {error}
              </div>
            )}
          <div className="mb-3">
              <Form.Label>
                Firstname
              </Form.Label>
              <input type="firstname" className="form-control" placeholder="Firstname" onChange={e => setFirstName(e.target.value)}/>
            </div>
            <div className="mb-3">
              <Form.Label>
                Lastname
              </Form.Label>
              <input type="lastname" className="form-control" placeholder="Lastname" onChange={e => setLastName(e.target.value)}/>
            </div>
            <div className="mb-3">
              <Form.Label>
                Email Address
              </Form.Label>
              <input type="email" className="form-control" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
              <Form.Label>
                Password
              </Form.Label>
              <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </div>
            <Form.Footer>
              <Button className="btn btn-primary w-100" type="submit">Register</Button>
            </Form.Footer>
          </Form>
        </Card.Body>
      </Card>
      </div>
    </Page>
  )
}
