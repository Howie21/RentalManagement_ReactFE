import React, { Component } from 'react';
import { Form, Button, Container, Card, Table} from "react-bootstrap";
import axios from 'axios';

class WorkOrders extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userId: this.props.UserId,
            workorders: "",
            landLordStatus: this.props.landLordStatus,
            currentWorkorders:"",
            historyWorkOrders:"",

            //Form states
            requestorId: "",
            propertyId: "",
            workOrderField: "",
            forLandlordBool: true,
         }
    }

    componentDidMount() {
        this.getAllWorkOrders;
    };

    sortWorkOrders = () => {
        this.state.workorders.forEach(element => {
            if(element.activeStatus === "Pending" || element.activeStatus === "Approved") {
                this.state.currentWorkorders.push(element);
            } else {
                this.state.historyWorkOrders.push(element)
            }
        });
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({
          [event.target.name]: event.target.value,
        });
      };

    getAllWorkOrders = async() => {
        await axios({
            method:"GET",
            url: "https://localhost:44394/api/workorders",

        }).then(res => {
            this.setState({
                workorders: res.data
            });
        }).then(this.sortWorkOrders)
    }

    postNewWorkOrder = async() => {
        await axios({
            method: "POST",
            url: "",
            data: {
                requestorId: this.state.requestorId,
                propertyId: parseInt(this.state.propertyId),
                workOrder: this.state.workOrderField,
                forLandLord: this.state.forLandlordBool,
                activeStatus: "Pending"
            }
        }).then(res => {
            console.alert("Work Order confirmed.");
            this.setState({
                workOrderField: "",
            })
        });
    }

    approveWorkOrder = async(wo) => {
        await axios({
            method: "PUT",
            url: "https://localhost:44394/api/workorders",
            data: {
                "orderId": parseInt(wo.orderId),
                "RequestorId": wo.RequestorId,
                "OrderChar": wo.OrderChar,
                "forLandlord": wo.forLandLord,
                "PropertyId": parseInt(wo.PropertyId),
                "activeStatus": "Approved"
            }
        })
    }

    denyWorkOrder = async(wo) => {
        await axios({
            method: "PUT",
            url: "https://localhost:44394/api/workorders",
            data: {
                "orderId": parseInt(wo.orderId),
                "RequestorId": wo.RequestorId,
                "OrderChar": wo.OrderChar,
                "forLandlord": wo.forLandLord,
                "PropertyId": parseInt(wo.PropertyId),
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
                "RequestorId": wo.RequestorId,
                "OrderChar": wo.OrderChar,
                "forLandlord": wo.forLandLord,
                "PropertyId": parseInt(wo.PropertyId),
                "activeStatus": "Complete"
            }
        })
    }


    render() { 
        return ( 
            <div className="row">
                <div className="col-lg-6 col-md-3 col-sm-2">
                    {this.state.workorders && (this.state.currentWorkorders.map(wo => (
                        <Card className="overflow">
                            <Card.Title>Order Number: {wo.orderId}</Card.Title>
                            <Card.Text>From: {wo.user.firstName} {wo.user.lastName}</Card.Text>
                            <Card.Text>Desc: {wo.orderChar}</Card.Text>
                            <Card.Subtitle>About: {wo.property.address.buildingNumber} {wo.property.address.street}</Card.Subtitle>
                            {this.state.landLordStatus === true && (
                                <>
                                    <Button className="mt-3" onClick={this.approveWorkOrder(wo)}>Approve</Button>
                                    <Button className="mt-4" onClick={this.denyWorkOrder(wo)} >Deny</Button>
                                    <Button className="mt-1" onClick={this.deleteWorkOrder(wo.orderId)} >Delete</Button>
                                    <Button className="mt-3" onClick={this.changeStatusComplete(wo)} >Complete</Button>
                                </>
                            ) }
                        </Card>
                    )))}

                </div>
                <div className="col-lg-6 col-md-3 col-sm-2">
                    <Container>
                        {this.state.landLordStatus === false && (
                            <Form onSubmit={this.postNewWorkOrder} >
                                <Form.Label>Work Order Description: </Form.Label>
                                <Form.Control name="workOrderField" value={this.state.workOrderField} onChange={this.handleChange} ></Form.Control>
                                <Button type="submit" className="mt-3" >Submit</Button>
                            </Form>
                        )}
                        
                    </Container>
                </div>
                {this.state.landLordStatus === true && (
                    <Table striped bordered hover variant="dark">
                    <thead>
                      <tr>
                        <th>Order Id</th>
                        <th>From</th>
                        <th>Property</th>
                        <th>Status</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                        {this.state.historyWorkOrders && (
                            this.state.historyWorkOrders.map(wo => (
                                <tr>
                                    <td>{wo.orderId}</td>
                                    <td>{wo.user.firstName} {wo.user.lastName}</td>
                                    <td>{wo.property.address.buildingNumber} {wo.property.address.street}</td>
                                    <td>{wo.activeStatus}</td>
                                    <td>
                                        <Button className="mt-1" onClick={this.deleteWorkOrder(wo.orderId)} >Delete</Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                  </Table>
                )}
            </div>
         );
    }
}
 
export default WorkOrders;