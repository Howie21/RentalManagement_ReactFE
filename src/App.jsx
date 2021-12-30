//Imports from dependencies
import React, { Component } from 'react';
import { Route, Routes} from 'react-router-dom';
import axios from 'axios';

//Imports from component files
import NavBar from "./components/NavBar/NavBar"
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import T_PaymentHistory from './components/T_PaymentHistory/T_PaymentHistory';
import T_PropertyManagement from './components/T_PropertyManagement/T_PropertyManagement';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: '',
      userId: "",
      isLandLord: false,
      property: '',
      payments: ""

     }
  }

  //Every time a Refresh/ReRender is triggered do this:
  componentDidMount() {
    const jwt = localStorage.getItem('token');
    try {
      this.getUser(jwt);
      if (this.state.isLandLord === false) {
        this.getTenantInfo(this.state.userId);
        this.getTenantPayments(this.state.userId);
        } else {
        this.getLandlordPayments();
        }
      
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
    }).then(res => {
        this.setState({
        user: res.data,
        userId: res.data.id
      });
      this.decideLandLordStatus(res.data.id)
    });
    
  }

  decideLandLordStatus(userId) {
    const Landlords = []
    Landlords.forEach(element => {
      if (element === userId) {
        this.setState({
          isLandLord: true
        })
      }
    });
  }


  async getTenantInfo(userId) {
    let info = await axios({
      method: "GET",
      url: `https://localhost:44394/api/tenantsinfo/${userId}`
    });
    this.setState({
      property: info.data[0].property
    })
  }

  async getTenantPayments(userId) {
    await axios({
      method: "GET",
      url: `https://localhost:44394/api/payments/${userId}`
    }).then(res => {
      this.setState({
        payments: res.data
      })
    })
  }

  async getLandlordPayments() {
    await axios({
      method: "GET",
      url: "https://localhost:44394/api/payments"
    }).then(res => {
      this.setState({
        payments: res.data
      });
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
        <h1>test</h1>
        <NavBar bg='light' expand='lg' user={this.state.user} landLordStatus={this.state.isLandLord} logout={this.logout}/>
        <Routes>
         
          <Route path='/' exact element={ <LandingPage /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/TPayment" element={ <T_PaymentHistory userObject={this.state.user} payments={ this.state.payments } /> } />
          <Route path="/TPropertyManagement" element={ <T_PropertyManagement userObject={this.state.user} property={this.state.property} /> } />
        </Routes> 
      </div>

     );
  }
}
 
export default App;