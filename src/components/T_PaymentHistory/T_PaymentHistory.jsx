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

    //Axios call to BE for Payment History
    //Add Authorization on Backend !!!!!!!!
    getPaymentHistory = async () => {
        let authToken = localStorage.getItem("token");
        try {
           await axios({
            method:"GET",
            url: "", // URL for Payment GET all -- Backend will manage auth and org.
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

     // Console Log result of Payment History to check what to put into Table Data
    render() { 
        let paymentHistory = this.state.paymentHistory
        return ( 
            <div> 
                {/* <table id='paymentHistory' className='paymentTable'> 
                    <tr className='cartTableHeader'>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                    {paymentHistory.map(pm => {
                        return (
                        <tr className='cartItem'>
                            <td>{pm.}</td>
                            <td>{pm.}</td>
                            <td>{pm.}</td>
                        </tr>
                        );
                    })}
                </table> */}
            </div>
         );
    }
}
 
export default T_PaymentHistory;