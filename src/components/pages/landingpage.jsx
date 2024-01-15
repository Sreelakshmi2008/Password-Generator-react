import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../header/header'
import '../../App.css'
export default function LandingPage() {
    return (
            <div style={{marginTop:'10%'}}>
            <Header />
           
            <div className="buttons text-center">
                <Link to="/login" style={{marginLeft:'40%'}}>
                    <button className="primary-button">log in</button>
                </Link>
                <Link to="/register">
                    <button className="primary-button" id="reg_btn"><span>register </span></button>
                </Link>
            </div>
        </div>
    )
}

