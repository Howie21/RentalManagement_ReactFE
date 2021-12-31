import React, { Component } from 'react';
import moment from 'react-moment';
import axios from "axios";

class MakePayment extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: this.props.user,
            //Add Info for Stripe
         }
    }
    getCurrentDate(separator='/'){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
        }

    async PostPayment() {
        let date = moment().format("DD-MM-YYYY hh:mm:ss");
        axios({
            method: "POST",
            url: "https://localhost:44394/api/payments",
            data: {
                "UserId": "12bb432c-14af-4a4b-9b8e-f0c215d646ef",
                "PropertyId": this.props.property.id,
                "DateAndTime": date.toString(), 
                "PaymentAmount": "" //Paid amount from state per form
            }
        })
    }

    render() { 
        return ( 
            <div>
                [Integrate Stripe API]
            </div>
         );
    }
}
 
export default MakePayment;