//Dependency Imports
import React from 'react';



function T_PropertyManagement(props) {
    
    return ( 
        <div>
            <div className="text-center" >
                <h3>Property Management Hub</h3>
                <p>Here you can make your payment</p>
            </div>
            <div>
                <h4>Property</h4>
                <ul>
                    <li>Property Id: {props.property.propertyId}</li>
                    <li>Rent Amount: {props.property.rentAmount}</li>
                    <li>Rent Due Date: {props.property.rentDueDate}</li>
                    <li>Address: {props.property.property.address.buildingNumber} {props.property.property.address.street} {props.property.property.address.city} {props.property.property.address.state}, {props.property.property.address.zipCode}</li>
                    <li>Tenant Id: {props.property.id}</li>
                </ul>
            </div>
            <div>
                <h5>Wanna make a payment? Click the button below!!</h5>
                <button className='btn btn-secondary' onClick={() => window.location="/MakePayment"} >Make Payment</button>
            </div>
        </div>
     );
}

export default T_PropertyManagement;