import React, { useState } from 'react';
import { Container, Form, Button } from "react-bootstrap";


function LeaseForm(props) {
    const [LeaseNumber, setLeaseNumber] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [safetyDeposit, setSafetyDeposit] = useState("");
    const [loadButton, setLoadButton] = useState("Submit Lease Info");

    const sendPackage = {
        "LeaseNumber": LeaseNumber,
        "StartDate": startDate,
        "EndDate": endDate,
        "SafetyDeposit": safetyDeposit,
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLoadButton("Processing");
        props.handleNewLease(sendPackage).then(() => {setLoadButton("Success!")});
    }


    return ( 
        <Container>
            <h5 className="text-center" >Lease Information</h5>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Lease Number</Form.Label>
                    <Form.Control name="LeaseNumber" value={LeaseNumber} onChange={e => setLeaseNumber(e.target.value)} ></Form.Control>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control name="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} ></Form.Control>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control name="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} ></Form.Control>
                    <Form.Label>Safety Deposit</Form.Label>
                    <Form.Control name="safetyDeposit" value={safetyDeposit} onChange={e => setSafetyDeposit(e.target.value)} ></Form.Control>
                    <Button type="submit" className='mt-3'>{loadButton}</Button>
                </Form>
        </Container>
     );
}

export default LeaseForm;  