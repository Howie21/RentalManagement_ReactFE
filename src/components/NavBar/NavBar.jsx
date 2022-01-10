import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Modal, Container} from 'react-bootstrap';

//Component Imports
import Login from "../Login/Login";

function NavBar({user, landLordStatus, logout}) {
    const [showModel, setShowModel] = useState(false);
    return ( 
        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Rental's
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id='responsive-navbar-nav' >
                    <Nav>
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/TPropertyManagement">
                                    Property Management
                                </Nav.Link>
                                <Nav.Link as={Link} to="/TPayment">
                                    Payment
                                </Nav.Link>
                                <Nav.Link as={Link} to="/WorkOrders">
                                    Work Orders
                                </Nav.Link>
                            </>
                        )}
                        {landLordStatus &&  (
                            <>
                                
                                <Nav.Link as={Link} to="/Management">
                                    Tenant Management
                                </Nav.Link>
                                
                            </>
                        )}
                    </Nav>
                    <Nav>
                        {user && (
                            <>
                                <NavDropdown title="Account" id="navbarScrollingDropdown">
                                    {/* <NavDropdown.Item as={Link} to="/Account">
                                        Manage Account
                                    </NavDropdown.Item> */}
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/" onClick={() => logout()}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}
                        {!user && (
                            <>
                                <Nav.Link  onClick={() => setShowModel(true)}>Login</Nav.Link>
                                
                            </>
                        )}
                    </Nav>
                    <Modal show={showModel} onHide={() => setShowModel(false)} >
                        <Modal.Header closeButton>
                            <Modal.Title>Please Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Login />
                        </Modal.Body>
                    </Modal>
                </Navbar.Collapse>
            </Container>
        </Navbar>
     );
}

export default NavBar;