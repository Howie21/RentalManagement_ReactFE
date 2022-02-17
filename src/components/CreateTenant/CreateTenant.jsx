import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Container, Modal } from "react-bootstrap";


import AddressForm from '../CreateTenantComps/AddressForm';
import LeaseForm from '../CreateTenantComps/LeaseForm';
import PropertyForm from '../CreateTenantComps/PropertyForm';
import TenantForm from '../CreateTenantComps/TenantForm';

class CreateTenant extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: "",
            tenantInfo: "",
            propertyInfo: "",
            address: "",
            lease: "",
            button: "Submit User",
            propertyAddressId: "",

            //User Feilds:
            userFirstName: "",
            userLastName: "",
            userUserName: "",
            userPassword: "",
            userEmail: "",
            userPhoneNumber: "",
            userError: "",
            
            //Modals
            addressModal: false,
            leaseModal: false,
            propertyModal: false,
            tenantInfoModal: false,

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
        this.setState({ button: "Processing..." });
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
        }).then(res => {
            console.log(res.data);
            this.setState({
                user: res.data,
                tenantId: res.data.id,
                userFirstName: "",
                userLastName: "",
                userUserName: "",
                userPassword: "",
                userEmail: "",
                userPhoneNumber: "",
                button: "Successful",
                addressModal: true,
            })
        });
        
        
    }
    //ADDRESS POST 
    
    handleNewAddress = async(pack) => {
        await axios({
            method: "POST",
            url: "https://localhost:44394/api/address",
            data: {
                "BuildingNumber": pack.BuildingNumber,
                "Street": pack.Street,
                "City": pack.City,
                "State": pack.State,
                "ZipCode": pack.ZipCode  
            }
        }).then(response => {
            console.log(response.data);
            this.setState({
                address: response.data,
                propertyAddressId: response.data.id,
                addressModal: false,
                leaseModal: true
            })
        });
    }

    showAddressModal = () => {
        this.setState({ addressModal: true });
    }

    hideAddressModal = () => {
        this.setState({ addressModal: false });
    }
    
    //LEASE POST
    handleNewLease = async(pack) => {
        await axios({
            method: "POST",
            url: "https://localhost:44394/api/leases",
            data: {
                "LeaseNumber": pack.LeaseNumber,
                "StartDate": pack.StartDate,
                "EndDate": pack.EndDate,
                "SafetyDeposit": `${pack.SafetyDeposit}`
            }
        }).then(response => {
            console.log(response.data);
            this.setState({
                lease: response.data,
                tenantLeaseId: response.data.id,
                leaseModal: false,
                propertyModal: true,
            })
        });
    }

    showLeaseModal = () => {
        this.setState({ leaseModal: true });
    }

    hideLeaseModal = () => {
        this.setState({ leaseModal: false });
    }

    //PROPERTY POST
    handleNewProperty = async(pack) => {
        await axios({
            method: "POST",
            url: "https://localhost:44394/api/properties",
            data: {
                "AddressId": parseInt(pack.AddressId),
                "Bathrooms": pack.Bathrooms,
                "Bedrooms": pack.Bedrooms,
                "SquareFeet": pack.SquareFeet
            }
        }).then(res => {
            console.log("Property Info",res.data)
            this.setState({
                propertyInfo: res.data,
                tenantPropertyId: res.data.id,
                propertyModal: false,
                tenantInfoModal: true
            })
        });
    }

    showPropertyModal = () => {
        this.setState({ propertyModal: true });
    }

    hidePropertyModal = () => {
        this.setState({ propertyModal: false });
    }

    //TenantInfo POST

    handleNewTenant = async(pack) => {
        await axios({
            method: "POST",
            url: "https://localhost:44394/api/tenantsinfo",
            data: {
                "TenantId": pack.TenantId,
                "RentDueDate": pack.RentDueDate,
                "RentAmount": `${pack.RentAmount}`,
                "LicenseNumber": pack.LicenseNumber,
                "Age": parseInt(pack.Age),
                "PropertyId": parseInt(pack.PropertyId),
                "LeaseId": parseInt(pack.LeaseId)
            }
        }).then(res => {
            console.log(res.data);
            this.setState({
                tenantInfo: res.data,
                tenantInfoModal: false
            })
            alert("New Tenant account is functional")
            window.location = "/"
        });
    }

    showTenantModal = () => {
        this.setState({ tenantInfoModal: true });
    }

    hideTenantModel = () => {
        this.setState({ tenantInfoModal: false });
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
                            <Button type="submit" className='mt-3'>{this.state.button}</Button> {this.state.userError !== "" && (<p className='text-center'>{this.state.userError}</p>) }
                        </Form>
                        <Button type='click' className='mt-2' onClick={this.showAddressModal} > Skip step </Button>
                    </Container>
                    <br/>
                </div>
                    <Modal show={this.state.addressModal} onHide={this.hideAddressModal} >
                        <Modal.Header closeButton>
                            <Modal.Title>Address Info</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddressForm handleNewAddress={this.handleNewAddress} />
                        </Modal.Body>
                    </Modal>
                    <br/>
                <div className="leaseForm">
                <Modal show={this.state.leaseModal} onHide={this.hideLeaseModal} >
                        <Modal.Header closeButton>
                            <Modal.Title>Lease Info</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <LeaseForm handleNewLease={this.handleNewLease} />
                        </Modal.Body>
                    </Modal>
                    <br/>
                </div>
                <div className="propertyForm">
                <Modal show={this.state.propertyModal} onHide={this.hidePropertyModal} >
                        <Modal.Header closeButton>
                            <Modal.Title>Property Info</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className="text-center" >The created Address Id is: {this.state.address.id}</p>
                            <PropertyForm handleNewProperty= {this.handleNewProperty}  />
                        </Modal.Body>
                    </Modal>
                    
                    <br/>
                </div>
                <div className="tenantForm">
                <Modal show={this.state.tenantInfoModal} onHide={this.hideTenantModel} >
                        <Modal.Header closeButton>
                            <Modal.Title>Tenant Registery</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className="text-center" >The User Id is: {this.state.user.id}</p>
                            <p className="text-center" >The Property Id is: {this.state.propertyInfo.id}</p>
                            <p className="text-center" >The Lease Id is: {this.state.lease.id}</p>
                            <TenantForm handleNewTenant={this.handleNewTenant} />
                        </Modal.Body>
                    </Modal>
                    

                    <br/>
                </div>
            </div>
         );
    }
}
 
export default CreateTenant;