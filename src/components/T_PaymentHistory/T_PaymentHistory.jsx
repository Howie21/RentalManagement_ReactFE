//Dependencies Imports
import React, { Component } from 'react';




class T_PaymentHistory extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: this.props.userObject,
            paymentHistory:this.props.payments
         }
    }


     // Console Log result of Payment History to check what to put into Table Data
    render() { 
        let paymentHistory = this.state.paymentHistory;
        return ( 
            <div> 
                <div>
                    <h3>All Previous payments for the Year!</h3>
                </div>
                <br/>
                <table id='paymentHistory' className='paymentTable'> 
                    <tr className='cartTableHeader'>
                        <th>Tenant</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Property ID</th>
                    </tr>
                    {paymentHistory.map(pm => {
                        return (
                        <tr className='cartItem'>
                            <td>{pm.user.FirstName} {pm.user.lastName}</td>
                            <td>{pm.paymentAmount}</td>
                            <td>{pm.dateAndTime}</td>
                            <td>{pm.propertyId}</td>
                        </tr>
                        );
                    })};
                </table>
            </div>
         );
    };
};
 
export default T_PaymentHistory;