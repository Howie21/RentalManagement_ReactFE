//Imports from dependencies
import React, { Component } from 'react';
import { Route, Routes} from 'react-router-dom';
import axios from 'axios';
import "./App.css";

//Imports from component files
import NavBar from "./components/NavBar/NavBar"
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import T_PaymentHistory from './components/T_PaymentHistory/T_PaymentHistory';
import TPropertyManagement from './components/T_PropertyManagement/T_PropertyManagement';
import Wrapper from './components/CheckoutForm';
import CreateTenant from './components/CreateTenant/CreateTenant';
import WorkOrders from './components/WorkOrders/WorkOrders';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: '',
      userId: "",
      isLandLord: false,
      property: '',
      payments: "",
      tenantInfo: "",
      workorders: [],
      currentWorkorders: [],
      historyWorkOrders: []
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
        this.getWorkOrdersById();
        } else {
        this.getLandlordPayments();
        this.getAllWorkOrders();
        }
      
    } 
    catch {
      console.log('Something went wrong // App Mount');
    }
    
  }

  //If a token is in storage, auto login user
   async getUser(token) {
    await axios({
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
    const Landlords = [
      "12bb432c-14af-4a4b-9b8e-f0c215d646ef"
    ]
    Landlords.forEach(element => {
      if (element === userId) {
        this.setState({
          isLandLord: true
        })
      }
    });
  }

  async getWorkOrdersById() {
    await axios({
      method:"GET",
      url: `https://localhost:44394/api/workorders/${this.state.userId}`,

    }).then(res => {
        this.setState({
            workorders: res.data
        });
        this.sortWorkOrders(res.data)
    })
  }

  async getAllWorkOrders() {
    await axios({
        method:"GET",
        url: `https://localhost:44394/api/workorders`,

    }).then(res => {
        this.setState({
            workorders: res.data
        });
        this.sortWorkOrders(res.data)
    })
  }

  sortWorkOrders(arr) {
    console.log(arr)
    arr.forEach(element => {
        if(element.activeStatus === "Pending" || element.activeStatus === "Approved") {
            this.state.currentWorkorders.push(element);
        } else {
            this.state.historyWorkOrders.push(element)
        }
    });
  }

  deleteWorkOrder = async (id) => {
    await axios({
        method: "DELETE",
        url: `https://localhost:44394/api/workorders/${id}`,
    }).then(res => {
        alert(`WorkOrder with an Id of ${id} was deleted.`)
    })
  }


  async getTenantInfo(userId) {
    let info = await axios({
      method: "GET",
      url: `https://localhost:44394/api/tenantsinfo/${userId}`
    });
    this.setState({
      property: info.data[0].property,
      tenantInfo: info.data[0]
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

  onSuccessfulCheckout = () => {
    window.location = "/"
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
          <Route path="/TPayment" element={ <T_PaymentHistory userObject={this.state.user} payments={ this.state.payments } /> } />
          <Route path="/TPropertyManagement" element={ <TPropertyManagement userObject={this.state.user} property={this.state.property} tenantInfo={this.state.tenantInfo} /> } />
          <Route path="/MakePayment" element={ <Wrapper price={this.state.tenantInfo.rentAmount} onSuccessfulCheckout={this.onSuccessfulCheckout} /> } />
          <Route path="/Management" element={ <CreateTenant isLandlord={this.state.isLandLord} /> } />
          <Route path="/WorkOrders" element={ <WorkOrders deleteWorkOrder={this.deleteWorkOrder} getAllWorkOrders={this.getAllWorkOrders} historyWorkOrders={this.state.historyWorkOrders} currentWorkorders={this.state.currentWorkorders} UserId={this.state.userId} landLordStatus={this.state.isLandLord} property={this.state.property} /> } />
        </Routes> 
      </div>

     );
  }
}
 
export default App;