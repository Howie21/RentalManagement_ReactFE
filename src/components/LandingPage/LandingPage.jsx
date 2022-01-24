import React from 'react';
import "./LandingPage.css";
import image from "../imgs/Management.jpg";


function LandingPage() {
    return ( 
        <div>
            <div className="row title-bar">
                <h1>Welcome to Rental Management!</h1>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-3 col-sm-2 row testDiv1">
                    <h3 className=" text-center">Current Tenant?</h3>
                    <p className="text-center">
                        If you are a Current Tenant and wish to login, press the login button in the top right hand corner of the page! 
                    </p>
                </div>
                <div className="col-lg-6 col-md-3 col-sm-2 row testDiv2" >
                    <h3 className="text-center">Don't have an account?</h3>
                    <p className=" text-center">Reach out to your landlord to create your account!</p>
                </div>
                <div className="col-lg-6 col-md-3 col-sm-2 row text-center testDiv3">
                    <p className=" text-center"></p>
                </div>
            </div>
            <div className="text-center">
                <img src={image} alt="team" height="300" width="700"></img>
            </div>
        </div>
     );
}

export default LandingPage;