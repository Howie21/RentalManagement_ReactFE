//Imports from dependencies
import React, { Component } from 'react';
import {Route, Routes} from 'react-router-dom';
import axios from 'axios';

//Imports from component files
import NavBar from "./components/NavBar/NavBar"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: '',
      isLandLord: false,
      property: '',

     }
  }

  componentDidMount() {
    const jwt = localStorage.getItem('token');
    try {
      this.getUser(jwt);
    } 
    catch {
      console.log('Something went wrong // line 26 of App');
    }
  }

  async getUser(token) {
    let user = await axios({
      method: 'GET',
      url: 'https://localhost:44394/api/examples/user',
      headers: { Authorization: `Bearer ${token}` },
    });
    this.setState({
      user: user.data,
    });
  }

  logout = () => {
    localStorage.removeItem('token');
    this.setState({
      user: '',
    });
  };

  render() { 
    return ( 
      <div className="App">
        <NavBar bg='light' expand='lg' user={this.state.user} landLordStatus={this.state.isLandLord} logout={this.logout}/>
        <Routes>
          <Route path='/' exact element={  } /> {/* Create Landing Page! */}
        </Routes>
      </div>
     );
  }
}
 
export default App;