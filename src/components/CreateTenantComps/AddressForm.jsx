import React, { useState } from 'react';
import {Container, Form, Button} from "react-bootstrap";


function AddressForm(props) {
    const [buildingNumber, setBuildingNumber] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [buttonLoad, setbuttonLoad] = useState("Submit Address");

    const sendPackage = {
            "BuildingNumber": buildingNumber,
            "Street": street,
            "City": city,
            "State": state,
            "ZipCode": zipCode  
        }
    
    function handleSubmit(e) {
        e.preventDefault();
        setbuttonLoad("Processing");
        props.handleNewAddress(sendPackage).then(() => {setbuttonLoad("Success!")});
    }

    return ( 
        <Container>
            
            <p className="text-center"> If you already have address information just press submit </p>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Building Number:</Form.Label>
                <Form.Control name="buildingNumber" value={buildingNumber} onChange={e => setBuildingNumber(e.target.value)}></Form.Control>
                <Form.Label>Street:</Form.Label>
                <Form.Control name="street" value={street} onChange={e => setStreet(e.target.value)}></Form.Control>
                <Form.Label>City:</Form.Label>
                <Form.Control name="city" value={city} onChange={e => setCity(e.target.value)}></Form.Control>
                <Form.Label>State:</Form.Label>
                <Form.Control name="state" value={state} onChange={e => setState(e.target.value)}></Form.Control>
                <Form.Label>Zip Code:</Form.Label>
                <Form.Control name="zipCode" value={zipCode} onChange={e => setZipCode(e.target.value)}></Form.Control>
                <Button type="submit" className='mt-3'>{buttonLoad}</Button>
            </Form>
        </Container>
     );
}

export default AddressForm;