import React, { Component } from 'react';
import { Container, Form, Button } from "react-bootstrap";

class TenantForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            tenantId: "",
            tenantRentDueDate: "",
            tenantRentAmount: "$",
            tenantLicenseNumber: "",
            tenantAge: "",
            tenantPropertyId: "",
            tenantLeaseId: "",
            button: "Submit Tenant Info"
         }
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({
          [event.target.name]: event.target.value,
        });
      };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ button: "Processing" });
        const sendPackage = {
            "TenantId": this.state.tenantId,
            "RentDueDate": this.state.tenantRentDueDate,
            "RentAmount": `${this.state.tenantRentAmount}`,
            "LicenseNumber": this.state.tenantLicenseNumber,
            "Age": parseInt(this.state.tenantAge),
            "PropertyId": parseInt(this.state.tenantPropertyId),
            "LeaseId": parseInt(this.state.tenantLeaseId)
        }
        this.props.handleNewTenant(sendPackage).then(() => {
            this.setState({ button: "Successful" });
        })
    }
    
    render() { 
        return ( 
            <Container>
                <h5 className="text-center" >New Tenant Form</h5>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Label>Tenant Id: </Form.Label>
                    <Form.Control name="tenantId" placeholder='Copy and Paste from above' value={this.state.tenantId} onChange={this.handleChange}></Form.Control>
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
                    <Form.Control name="tenantPropertyId" placeholder='Copy and Paste from above' value={this.state.tenantPropertyId} onChange={this.handleChange} ></Form.Control>
                    <Form.Label>Tenant Lease Id:</Form.Label>
                    <Form.Control name="tenantLeaseId" placeholder='Copy and Paste from above' value={this.state.tenantLeaseId} onChange={this.handleChange} ></Form.Control>
                    <Button type="submit" className='mt-3'>{this.state.button}</Button>
                </Form>
            </Container>
         );
    }
}
 
export default TenantForm;