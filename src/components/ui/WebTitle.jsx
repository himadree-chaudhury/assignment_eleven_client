import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";

const WebTitle = () => {
    return (
        <div>
            <Link to="/" className="flex-centric">
                <img className="w-10" src={logo} alt="driveXpress logo"/>
                <h1 className="title-style">driveXpress</h1>
                <h2>
                    <sup>&trade;</sup>
                </h2>
            </Link>
        </div>
    );
};

export default WebTitle;