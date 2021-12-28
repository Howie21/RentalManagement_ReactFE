import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Container} from 'react-bootstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password: ''
         }
    }

    handleChange = (event) => { // Needed Parenthesis? No Parenthesis? 
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();
        await axios({
          method: 'post',
          url: 'https://localhost:44394/api/authentication/login',
          headers: {},
          data: {
            username: this.state.username,
            password: this.state.password,
          },
        }).then(response => localStorage.setItem('token', response.data.token));
        window.location = '/';
      };

    render() { 
        return ( 
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Label>Username: </Form.Label>
                    <Form.Control name="username" value={this.state.username} onChange={this.handleChange} />
                    <Form.Label> Password: </Form.Label>
                    <Form.Control name="password" value={this.state.password} onChange={this.handleChange} />
                    <Button type="submit" className="mt-3" > Login </Button>
                </Form>
            </Container>
         );
    }
}
 
export default Login;