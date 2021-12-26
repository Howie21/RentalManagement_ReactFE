//Dependencies Imports
import React, { Component } from 'react';
import axios from "axios";



class T_PaymentHistory extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: this.props.userObject,
            paymentHistory: []
         }
    }

    componentDidMount() {
        this.getPaymentHistory();
    }

    //Axios call to DB for Payment History
    //Add Authorization on Backend !!!!!!!!
    getPaymentHistory = async () => {
        authToken = localStorage.getItem("token");
        try {
           await axios({
            method:"GET",
            url: "",
            headers: { Authorization: `Bearer ${authToken}` },
            }).then(res => {
                this.setState({
                    paymentHistory: res.data,
                }) 
            });
            console.log("Completed Request on T_PaymentHistory Comp.")  
        } catch {
            console.log("Something went wrong retrieving payment info \non the Tenant Page")
        }
        
    }


    render() { 
        return ( 
            <div>

            </div>
         );
    }
}
 
export default T_PaymentHistory;