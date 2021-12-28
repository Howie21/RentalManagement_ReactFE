import React from 'react';


function LandingPage() {
    return ( 
        <div>
            <div className="row">
                <h1>Welcome to Howard Rental's!</h1>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-3 col-sm-2 row testDiv1">
                    <h3 className=" text-center">Current Tenant?</h3>
                    <p className="text-center">
                        If you are a Current Tenant and wish to login, press the login button in the top right hand corner of the page! 
                    </p>
                </div>
                <div className="col-lg-6 col-md-3 col-sm-2 row testDiv2" >
                    <p>Testing 2</p>
                </div>
                <div className="col-lg-6 col-md-3 col-sm-2 row testDiv3">
                    <p>Testing 3</p>
                </div>
            </div>
        </div>
     );
}

export default LandingPage;