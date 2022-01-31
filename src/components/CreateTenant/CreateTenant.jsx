import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Container } from "react-bootstrap";

class CreateTenant extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: "",
            tenantInfo: "",
            propertyInfo: "",
            address: "",
            lease: "",

            //User Feilds:
            userFirstName: "",
            userLastName: "",
            userUserName: "",
            userPassword: "",
            userEmail: "",
            userPhoneNumber: "",

            //Address feilds:
            addressBuildingNumber: "",
            addressStreet: "",
            addressCity: "",
            addressState: "",
            addressZipCode: "",
            
            //Property Feilds:
            propertyAddressId: "",
            propertyBathrooms: "",
            propertyBedrooms: "",
            propertySquareFeet: "",

            //Lease Feilds:
            leaseLeaseNumber: "",
            leaseStartDate: "",
            leaseEndDate: "",
            leaseSafetyDeposit: "",

            //TenantInfo Feilds:
            tenantId: "",
            tenantRentDueDate: "",
            tenantRentAmount: "$",
            tenantLicenseNumber: "",
            tenantAge: "",
            tenantPropertyId: "",
            tenantLeaseId: ""

         }
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({
          [event.target.name]: event.target.value,
        });
      };

     //USER POST
    handleNewUser = async(event) => {
        event.preventDefault();
        await axios({
            method: "POST",
            url: "https://localhost:44394/api/authentication",
            data: {
                "firstname": this.state.userFirstName,
                "lastname": this.state.userLastName,
                "username": this.state.userUserName,
                "password": this.state.userPassword,
                "email": this.state.userEmail,
                "phonenumber": this.state.userPhoneNumber
            }
        }).then(response => {
            console.log(response.data);
            this.setState({
                user: response.data,
                tenantId: response.data.id,
            })
        });
    }
    //ADDRESS POST 
    
    handleNewAddress = async(event) => {
        event.preventDefault();
        await axios({
            method: "POST",
            url: "https://localhost:44394/api/address",
            data: {
                "BuildingNumber": this.state.addressBuildingNumber,
                "Street": this.state.addressStreet,
                "City": this.state.addressCity,
                "State": this.state.addressState,
                "ZipCode": this.state.addressZipCode  
            }
        }).then(response => {
            console.log(response.data);
            this.setState({
                address: response.data,
                propertyAddressId: response.data.id
            })
        });
    }
    
    //LEASE POST
    handleNewLease = async(event) => {
        event.preventDefault();
        await axios({
            method: "POST",
            url: "https://localhost:44394/api/leases",
            data: {
                "LeaseNumber": this.state.leaseLeaseNumber,
                "StartDate": this.state.leaseStartDate,
                "EndDate": this.state.leaseEndDate,
                "SafetyDeposit": `${this.state.leaseSafetyDeposit}`
            }
        }).then(response => {
            console.log(response.data);
            this.setState({
                lease: response.data,
                tenantLeaseId: response.data.id,
            })
        });
    }

    //PROPERTY POST
    handleNewProperty = async(event) => {
        event.preventDefault();
        await axios({
            method: "POST",
            url: "https://localhost:44394/api/properties",
            data: {
                "AddressId": parseInt(this.state.propertyAddressId),
                "Bathrooms": this.state.propertyBathrooms,
                "Bedrooms": this.state.propertyBedrooms,
                "SquareFeet": this.state.propertySquareFeet
            }
        }).then(res => {
            console.log("Property Info",res.data)
            this.setState({
                propertyInfo: res.data,
                tenantPropertyId: res.data.id
            })
        });
    }

    //TenantInfo POST

    handleNewTenant = async(event) => {
        event.preventDefault();
        await axios({
            method: "POST",
            url: "https://localhost:44394/api/tenantsinfo",
            data: {
                "TenantId": this.state.tenantId,
                "RentDueDate": this.state.tenantRentDueDate,
                "RentAmount": `${this.state.tenantRentAmount}`,
                "LicenseNumber": this.state.tenantLicenseNumber,
                "Age": parseInt(this.state.tenantAge),
                "PropertyId": parseInt(this.state.tenantPropertyId),
                "LeaseId": parseInt(this.state.tenantLeaseId)
            }
        }).then(res => {
            console.log(res.data);
            this.setState({
                tenantInfo: res.data
            })
            alert("New Tenant account is functional")
            window.location = "/"
        });
    }



    render() { 
        return ( 
            <div>
                <h3 className="text-center">Management Home</h3>
                <p className="text-center">
                    For your Convience, this page has been structured to provide the correct order of Operations 
                    when making a new tenant account. 
                    <br/>
                    If entering completly new information for the first time for all the require documents: 
                    <br/>User Account, Address Info, Property Info, Lease Info, TenantInfo<br/><br/>
                    You will find in the forms, suggestions for completion of the forms.
                </p>
                <div className="userForm">
                    <Container>
                        <h5>New User:</h5>
                        <Form onSubmit={this.handleNewUser}>
                            <Form.Label>First Name: </Form.Label>
                            <Form.Control name="userFirstName" value={this.state.userFirstName} onChange={this.handleChange} ></Form.Control>
                            <Form.Label>Last Name: </Form.Label>
                            <Form.Control name="userLastName" value={this.state.userLastName} onChange={this.handleChange} ></Form.Control>
                            <Form.Label>User Name: </Form.Label>
                            <Form.Control name="userUserName" value={this.state.userUserName} onChange={this.handleChange} ></Form.Control>
                            <Form.Label>Password: "(Temp Password)"</Form.Label>
                            <Form.Control name="userPassword" value={this.state.userPassword} onChange={this.handleChange} ></Form.Control>
                            <Form.Label>Email: </Form.Label>
                            <Form.Control name="userEmail" value={this.state.userEmail} onChange={this.handleChange} ></Form.Control>
                            <Form.Label>Phone Number: </Form.Label>
                            <Form.Control name="userPhoneNumber" value={this.state.userPhoneNumber} onChange={this.handleChange} ></Form.Control>
                            <Button type="submit" className='mt-3'>Register Tenant</Button>
                        </Form>
                    </Container>
                    <br/>
                </div>
                <div className="addressForm">
                    <Container>
                        <h5>New Address Item:</h5>
                        <Form onSubmit={this.handleNewAddress}>
                            <Form.Label>Building Number:</Form.Label>
                            <Form.Control name="addressBuildingNumber"value={this.state.addressBuildingNumber} onChange={this.handleChange}></Form.Control>
                            <Form.Label>Street:</Form.Label>
                            <Form.Control name="addressStreet"value={this.state.addressStreet} onChange={this.handleChange}></Form.Control>
                            <Form.Label>City:</Form.Label>
                            <Form.Control name="addressCity"value={this.state.addressCity} onChange={this.handleChange}></Form.Control>
                            <Form.Label>State:</Form.Label>
                            <Form.Control name="addressState"value={this.state.addressState} onChange={this.handleChange}></Form.Control>
                            <Form.Label>Zip Code:</Form.Label>
                            <Form.Control name="addressZipCode"value={this.state.addressZipCode} onChange={this.handleChange}></Form.Control>
                            <Button type="submit" className='mt-3'>Submit Address</Button>
                        </Form>
                    </Container>
                    <br/>
                </div>
                <div className="leaseForm">
                    <Container>
                        <h5>New Lease:</h5>
                        <Form onSubmit={this.handleNewLease}>
                            <Form.Label>Lease Number:</Form.Label>
                            <Form.Control name="leaseLeaseNumber" value={this.state.leaseLeaseNumber} onChange={this.handleChange} ></Form.Control>
                            <Form.Label>Start Date:</Form.Label>
                            <Form.Control name="leaseStartDate" value={this.state.leaseStartDate} onChange={this.handleChange} ></Form.Control>
                            <Form.Label>End Date:</Form.Label>
                            <Form.Control name="leaseEndDate" value={this.state.leaseEndDate} onChange={this.handleChange} ></Form.Control>
                            <Form.Label>Safety Deposit:</Form.Label>
                            <Form.Control name="leaseSafetyDeposit" value={this.state.leaseSafetyDeposit} onChange={this.handleChange} ></Form.Control>
                            <Button type="submit" className='mt-3'>Submit Lease</Button>
                        </Form>
                    </Container>
                    <br/>
                </div>
                <div className="propertyForm">
                    <Container>
                    <h5>New Property:</h5>
                        <Form onSubmit={this.handleNewProperty}>
                            <Form.Label>Address Item Id:  </Form.Label>
                            {!this.state.address && (
                                <p>No previous Address Item Created</p>
                            )
                            }
                            {this.state.address && (
                                <p>Previously Created Address Item Id: {this.state.address.id}</p>
                            )
                            }
                            <Form.Control name="propertyAddressId" value={this.state.propertyAddressId} onChange={this.handleChange}></Form.Control>
                            <Form.Label>Bathrooms: </Form.Label>
                            <Form.Control name="propertyBathrooms" value={this.state.propertyBathrooms} onChange={this.handleChange} ></Form.Control>
                            <Form.Label>Bedrooms: </Form.Label>
                            <Form.Control name="propertyBedrooms" value={this.state.propertyBedrooms} onChange={this.handleChange} ></Form.Control>
                            <Form.Label>Square Feet:</Form.Label>
                            <Form.Control name="propertySquareFeet" value={this.state.propertySquareFeet} onChange={this.handleChange} ></Form.Control>
                            <Button type="submit" className='mt-3'>Submit Property</Button>
                        </Form>
                    </Container>
                    <br/>
                </div>
                <div className="tenantForm">
                    <Container>
                    <h5>New Tenant Form:</h5>
                        <Form onSubmit={this.handleNewTenant}>
                            <Form.Label>Tenant Id: </Form.Label>
                               <p>Previously Created Address Item Id: {this.state.user.id}</p>
                            <Form.Control name="tenantId" value={this.state.tenantId} onChange={this.handleChange}></Form.Control>
                            <Form.Label>Rent Due Date:</Form.Label>
                            <p>Ex: "First of the Month"</p>
                            <Form.Control name="tenantRentDueDate" value={this.state.tenantRentDueDate} onChange={this.handleChange}></Form.Control>
                            <Form.Label>Rent Amount:</Form.Label>
                            <Form.Control name="tenantRentAmount" value={this.state.tenantRentAmount} onChange={this.handleChange}></Form.Control>
                            <Form.Label>Tenant License Number:</Form.Label>
                            <Form.Control name="tenantLicenseNumber" value={this.state.tenantLicenseNumber} onChange={this.handleChange}></Form.Control>
                            <Form.Label>Primary Tenant Age:</Form.Label>
                            <Form.Control name="tenantAge" value={this.state.tenantAge} onChange={this.handleChange} ></Form.Control>
                            <Form.Label>Tenant Property Id: </Form.Label>
                            {!this.state.propertyInfo && (
                                <p>No previous Property Created</p>
                            )
                            }
                            {this.state.propertyInfo && (
                                <p>Previously Property Id: {this.state.propertyInfo.id}</p>
                            )
                            }
                            <Form.Control name="tenantPropertyId" value={this.state.tenantPropertyId} onChange={this.handleChange} ></Form.Control>
                            <Form.Label>Tenant Lease Id:</Form.Label>
                            {!this.state.lease && (
                                <p>No previous Lease Created</p>
                            )
                            }
                            {this.state.lease && (
                                <p>Previously Created Lease Id: {this.state.lease.Id}</p>
                            )
                            }
                            <Form.Control name="tenantLeaseId" value={this.state.tenantLeaseId} onChange={this.handleChange} ></Form.Control>
                            <Button type="submit" className='mt-3'>Submit Tenant</Button>
                        </Form>
                    </Container>
                    <br/>
                </div>
            </div>
         );
    }
}
 
export default CreateTenant;