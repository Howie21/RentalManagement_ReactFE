//Dependencies Imports
import React, { Component } from 'react';
import {Table, Container} from "react-bootstrap";



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
                <Container>
                    <Table>
                        <thead>
                            <tr className="text-center">
                                <th>Tenant</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Property Id</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {paymentHistory.map(pm => {
                                return(
                                    <tr className="text-center">
                                        <td>{pm.user.firstName} {pm.user.lastName}</td>
                                        <td>{pm.paymentAmount}</td>
                                        <td>{pm.dateAndTime}</td>
                                        <td>{pm.propertyId}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Container>
            </div>
         );
    };
};
 
export default T_PaymentHistory;