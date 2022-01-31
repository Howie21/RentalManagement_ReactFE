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
    } 
    catch {
      console.log('Something went wrong // App Mount');
    }
    
  }

  moveWorkOrder = (wo) => {
    this.getAllWorkOrders();
    this.state.currentWorkorders[this.state.currentWorkorders.indexOf(wo)].push(this.state.historyWorkOrders);
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
      "39e1133f-da9c-4e1f-9f48-4ecc4602fd67"
    ]
    Landlords.forEach(element => {
      if (element === userId) {
        this.setState({
          isLandLord: true
        })
      }
      if (this.state.isLandLord === false) {
        this.getTenantInfo();
        this.getTenantPayments();
        this.getWorkOrdersById();
      } else {
        this.getLandlordPayments();
        this.getAllWorkOrders();
      }
    });
  }

  getWorkOrdersById = async() => {
    await axios({
      method:"GET",
      url: `https://localhost:44394/api/workorders/${this.state.userId}`,
    }).then(res => {
      if(res.data === []){
        console.log('Fetched no work orders')
      } else {
        this.setState({
            workorders: res.data
        });
        this.sortWorkOrders(res.data)
      }
        
        
    })
  }

  getAllWorkOrders = async() => {
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
    if(arr.length > 1){
      arr.forEach(element => {
        if(element.activeStatus === "Pending" || element.activeStatus === "Approved") {
            this.state.currentWorkorders.push(element);
        } else {
            this.state.historyWorkOrders.push(element)
        }
      });
    } else if (arr.length === 0){
      return;
    } else {
      if(arr[0].activeStatus === "Pending" || arr[0].activeStatus === "Approved") {
        this.state.currentWorkorders.push(arr[0]);
      } else {
        this.state.historyWorkOrders.push(arr[0]);
      }
    }
    
  }

  deleteWorkOrder = async (id) => {
    await axios({
        method: "DELETE",
        url: `https://localhost:44394/api/workorders/${id}`,
    }).then(res => {
        alert(`WorkOrder with an Id of ${id} was deleted.`)
    })
  }


  async getTenantInfo() {
    let info = await axios({
      method: "GET",
      url: `https://localhost:44394/api/tenantsinfo/${this.state.userId}`
    }).then(res => {
      console.log(res)
      this.setState({
      property: res.data.property,
      tenantInfo: res.data
      })
    });
    
  }

  async getTenantPayments() {
    await axios({
      method: "GET",
      url: `https://localhost:44394/api/payments/${this.state.userId}`
    }).then(res => {
      this.setState({
        payments: res.data
      })
      console.log(res);
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
      isLandLord: false,
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
          <Route path="/WorkOrders" element={ <WorkOrders moveWorkOrder={this.moveWorkOrder} deleteWorkOrder={this.deleteWorkOrder} getAllWorkOrders={this.getWorkOrdersById} historyWorkOrders={this.state.historyWorkOrders} currentWorkorders={this.state.currentWorkorders} UserId={this.state.userId} landLordStatus={this.state.isLandLord} property={this.state.property} /> } />
        </Routes> 
      </div>

     );
  }
}
 
export default App;