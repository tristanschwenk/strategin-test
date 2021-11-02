import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import "tabler-react/dist/Tabler.css";
import { Page, Card, Form, Button } from "tabler-react";
import * as api from '../../api'

export const Login = ({setUser}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const history = useHistory();

  const sendLogin = async (data) => {
    let user
    try {
       user = await api.fetchApi(`user/login`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
    } catch (e) {
      console.log(e.data || e);
      setError(e.data || 'An error occurred');
      return;
    }

    api.setToken(user.accessToken)
    history.push('/users');
  }

  const handleSubmit = async e => {
    e.preventDefault()

    await sendLogin({email, password})
  }

  return(
    <Page className="page-center">
      <div className="container-tight py-4">
      <Card className="card-md">
        <Card.Body>
          <h1 className="text-center card-title mb-4">Login</h1>
          <Form onSubmit={handleSubmit}>
            {error && (
              <div class="alert alert-danger">
                {error}
              </div>
            )}
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
              <Button className="btn btn-primary w-100" type="submit">Log in</Button>
            </Form.Footer>
          </Form>
          <div className="text-center text-muted mt-3">
          Don't have account yet? <a href="/register">Sign up</a>
        </div>
        </Card.Body>
      </Card>
      </div>
    </Page>
  )
}
