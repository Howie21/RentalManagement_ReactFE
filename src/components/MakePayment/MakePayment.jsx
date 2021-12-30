import React, { Component } from 'react';


class MakePayment extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: this.props.user,
            //Add Info for Stripe
         }
    }
    render() { 
        return ( 
            <div>

            </div>
         );
    }
}
 
export default MakePayment;