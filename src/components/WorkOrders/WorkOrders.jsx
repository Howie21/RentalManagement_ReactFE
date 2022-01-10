import React, { Component } from 'react';
import { Form, Button, Container, Card, Table} from "react-bootstrap";
import axios from 'axios';

class WorkOrders extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentWorkorders:[],
            historyWorkOrders:[],

            //Form states
            RequestorId: this.props.UserId,
            OrderChar: "",
            forLandLord: true,
            propertyId: this.props.property.id,
            activeStatus: "Pending"
         }
    }

    componentDidMount() {
    };

    // sortWorkOrders = (arr) => {
    //     arr.forEach(element => {
    //         if(element.activeStatus === "Pending" || element.activeStatus === "Approved") {
    //             this.state.currentWorkorders.push(element);
    //         } else {
    //             this.state.historyWorkOrders.push(element)
    //         }
    //     });
    // }

    handleChange = event => {
        event.preventDefault();
        this.setState({
          [event.target.name]: event.target.value,
        });
      };

    

    handleSubmit = async event => {
        event.preventDefault();
        await axios({
            method: "POST",
            url: "https://localhost:44394/api/workorders",
            data: {
                "RequestorId": this.props.UserId,
                "OrderChar": this.state.OrderChar,
                "forLandLord": Boolean(this.state.forLandlordBool),
                "PropertyId": parseInt(this.props.property.id),
                "ActiveStatus": this.state.activeStatus
            }
        }).then(res => {
            alert("New Work Order submitted!");
        });
    }

    approveWorkOrder = async(wo) => {
        console.log(wo)
        let call = await axios({
            method: "PUT",
            url: "https://localhost:44394/api/workorders",
            data: {
                "orderId": parseInt(wo.orderId),
                "RequestorId": wo.requestorId,
                "OrderChar": wo.orderChar,
                "forLandlord": wo.forLandlord,
                "PropertyId": parseInt(wo.propertyId),
                "activeStatus": "Approved"
            }
        })
        console.log(call);
    }

    denyWorkOrder = async(wo) => {
        await axios({
            method: "PUT",
            url: "https://localhost:44394/api/workorders",
            data: {
                "orderId": parseInt(wo.orderId),
                "RequestorId": wo.requestorId,
                "OrderChar": wo.orderChar,
                "forLandlord": wo.forLandlord,
                "PropertyId": parseInt(wo.propertyId),
                "activeStatus": "Denied"
            }
        })
    }

    changeStatusComplete = async(wo) => {
        await axios({
            method: "PUT",
            url: "https://localhost:44394/api/workorders",
            data: {
                "orderId": parseInt(wo.orderId),
                "RequestorId": wo.requestorId,
                "OrderChar": wo.orderChar,
                "forLandlord": wo.forLandlord,
                "PropertyId": parseInt(wo.propertyId),
                "activeStatus": "Complete"
            }
        })
    }

    


    render() { 
        return ( 
            <div className="row">
                <div className="col-lg-6 col-md-3 col-sm-2">
                    {(this.props.currentWorkorders.map(wo => (
                        <div>
                        <br/>
                        <Card className="overflow" key={wo.orderId}>
                            <Card.Title>Order Number: {wo.orderId}</Card.Title>
                            <Card.Text>From: {wo.user.firstName} {wo.user.lastName}</Card.Text>
                            <Card.Text>Desc: {wo.orderChar}</Card.Text>
                            <Card.Subtitle>About: {wo.property.address.buildingNumber} {wo.property.address.street}</Card.Subtitle>
                            <Button variant="outline-danger" onClick={() => this.props.deleteWorkOrder(wo.orderId)} >Delete</Button>
                            {this.props.landLordStatus && (
                                <>
                                <Button variant="outline-primary" onClick={() => this.approveWorkOrder(wo)} >Approve</Button>
                                <Button variant="outline-warning" onClick={() => this.denyWorkOrder(wo)} >Deny</Button>
                                <Button variant="outline-success" onClick={() => this.changeStatusComplete(wo)} >Mark Complete</Button>
                                </>
                            )}
                        </Card>
                        
                        </div>
                    )))}

                </div>
                <div className="col-lg-6 col-md-3 col-sm-2">
                    <Container>
                        {this.props.landLordStatus === false && (
                            <Form onSubmit={this.handleSubmit} >
                                <Form.Label>Work Order Description: </Form.Label>
                                <Form.Control name="OrderChar" value={this.state.OrderChar} onChange={this.handleChange} ></Form.Control>
                                <Button type="submit" className="mt-3" >Submit</Button>
                            </Form>
                        )}
                        
                    </Container>
                </div>
                    <Container>
                    <Table striped bordered hover variant="dark">
                    <thead>
                      <tr>
                        <th>Order Id</th>
                        <th>From</th>
                        <th>Property</th>
                        <th>Status</th>
                        {this.props.landLordStatus === true && (
                            <th>Delete</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      
                        {this.props.historyWorkOrders && (
                            this.props.historyWorkOrders.map(wo => (
                                <tr key={wo.orderId}>
                                    <td>{wo.orderId}</td>
                                    <td>{wo.user.firstName} {wo.user.lastName}</td>
                                    <td>{wo.property.address.buildingNumber} {wo.property.address.street}</td>
                                    <td>{wo.activeStatus}</td>
                                    {this.props.landLordStatus === true && (
                                        <td>
                                            <Button className="mt-1" onClick={() => this.deleteWorkOrder(wo.orderId)} >Delete</Button>
                                        </td> 
                                    )}
                                    
                                </tr>
                            ))
                        )}
                    </tbody>
                  </Table>
                  </Container>
                
            </div>
         );
    }
}
 
export default WorkOrders;