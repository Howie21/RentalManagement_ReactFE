//Imports from dependencies
import React, { Component } from 'react';
import {Route, Routes} from 'react-router-dom';
import axios from 'axios';

//Imports from component files
import NavBar from "./components/NavBar/NavBar"
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import T_PaymentHistory from './components/T_PaymentHistory/T_PaymentHistory';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: '',
      isLandLord: false,
      property: '',

     }
  }

  //Every time a Refresh/ReRender is triggered do this:
  componentDidMount() {
    const jwt = localStorage.getItem('token');
    try {
      this.getUser(jwt);
    } 
    catch {
      console.log('Something went wrong // App Mount');
    }
  }

  //If a token is in storage, auto login user
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


  //All Routes are stored for the entire application here
  //using react-router-dom Route and Routes
  // Using ELEMENT instead of COMPONENT due to React Update
  render() { 
    return ( 
      <div className="App">
        <NavBar bg='light' expand='lg' user={this.state.user} landLordStatus={this.state.isLandLord} logout={this.logout}/>
        <Routes>
          <Route path='/' exact element={ <LandingPage /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/TPayment" element={ <T_PaymentHistory userObject={this.state.user} /> } />
        </Routes>
      </div>
     );
  }
}
 
export default App;