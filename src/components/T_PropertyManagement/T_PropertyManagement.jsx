//Dependency Imports
import React from 'react';



function TPropertyManagement(props) {
    
    return ( 
        <div>
            <div className="text-center" >
                <h3>Property Management Hub</h3>
                <p>Here you can make your payment</p>
            </div>
            <div>
                <h4>Property:</h4>
                <br/>
                <ul>
                    <li>Property Id: {props.property.id}</li>
                    <li>Square Feet: {props.property.squareFeet}</li>
                    <li>Bathrooms: {props.property.bathrooms}</li>
                    <li>Bedrooms: {props.property.bedrooms}</li>
                    <li>Address: {props.property.address.buildingNumber} {props.property.address.street} {props.property.address.city} {props.property.address.state}, {props.property.address.zipCode}</li>
                </ul>
            </div>
            <div>
                <h5>Lease Information</h5>
                <ul>
                    <li>Lease ID: {props.tenantInfo.lease.id}</li>
                    <li>Lease Number: {props.tenantInfo.lease.leaseNumber}</li>
                    <li>Start Date: {props.tenantInfo.lease.startDate}</li>
                    <li>End Date: {props.tenantInfo.lease.endDate}</li>
                    <li>Safety Deposit: {props.tenantInfo.lease.safetyDeposit}</li>
                </ul>
            </div>
            <div>
                <h5>Wanna make a payment? Click the button below!!</h5>
                <button className='btn btn-secondary' onClick={() => window.location="/MakePayment"} >Make Payment</button>
            </div>
        </div>
     );
}

export default TPropertyManagement;