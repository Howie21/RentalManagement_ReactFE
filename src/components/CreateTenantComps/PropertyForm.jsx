import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';


class PropertyForm extends Component {
    constructor(props) {
        super(props);
        this.state ={
            addressId: "", 
            bathrooms: "",
            bedrooms: "",
            squareFeet: "",
            button: "Submit Property!"
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
        this.setState({ button: "Processing..." });
        const sendPackage = {
            "AddressId": parseInt(this.state.addressId),
            "Bathrooms": this.state.bathrooms,
            "Bedrooms": this.state.bedrooms,
            "SquareFeet": this.state.squareFeet
        }
        this.props.handleNewProperty(sendPackage).then(() => {
            this.setState({ button: "Successful" });
        })
     }
    
   
    render() { 
        return ( 
            <Container>
                 <h5 className="text-center">Property Information</h5>
                     <Form onSubmit={this.handleSubmit}>
                         <Form.Label>Address Item Id:  </Form.Label>
                         <Form.Control name="addressId" value={this.state.addressId} onChange={this.handleChange}></Form.Control>
                         <Form.Label>Bathrooms: </Form.Label>
                         <Form.Control name="bathrooms" value={this.state.bathrooms} onChange={this.handleChange} ></Form.Control>
                         <Form.Label>Bedrooms: </Form.Label>
                         <Form.Control name="bedrooms" value={this.state.bedrooms} onChange={this.handleChange} ></Form.Control>
                         <Form.Label>Square Feet:</Form.Label>
                         <Form.Control name="squareFeet" value={this.state.squareFeet} onChange={this.handleChange} ></Form.Control>
                         <Button type="submit" className='mt-3'>{this.state.button}</Button>
                     </Form>
            </Container>
         );
    }
}
 
export default PropertyForm;