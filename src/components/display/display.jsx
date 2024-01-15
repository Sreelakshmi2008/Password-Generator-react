import React, { useState, useRef } from 'react';
import axios from 'axios'
import './display.css';
import { Container } from '../container/containers';
import Button from '../container/button/button';
import Tooltip from '../container/tooltip/tooltip';
import {  copyToClipBoard, base, generate } from '../../utils/helper';

const Display = () => {
    const [password, setPassword] = useState('');
    const [rangeValue, setRange] = useState();
    const [passwordProps, setPasswordProps] = useState();
    const [tooltip, setTooltip] = useState(false);
    const [type, setType] = useState('password');
    const passwordRef = useRef(null);
    const accessToken = localStorage.getItem('jwtToken')
    let pwdDescription = '';
     
    const generateNewPassword = async (checkbox,range) => {
        try {
            const response = await axios.post(base + generate, { choices:  Object.keys(checkbox).filter(choice => checkbox[choice]), length: range },
                {headers:
                    {'Authorization': `Bearer ${accessToken}`}
                }
            ); // Initialize with default values
            console.log(passwordProps)
            setPassword(response.data.password);
            console.log("here also")
        } catch (error) {
            console.error('Error generating password:', error);
            // Handle the error, show a message, or set a default password, etc.
        }
    }
    
    const copyClipBoard = e => {
        e.preventDefault();
        copyToClipBoard(passwordRef.current);
        setTooltip(true);
        setTimeout(() => {
            setTooltip(false);
        }, 2000);
    }

    const onSelectTag = e => {
        setType(e.target.value);
    }

    const setBackgroundColor = password => {
        if (password && password.length === 1 && password.length <= 5) {
            pwdDescription = 'Bad password';
            return '#cb473e';
        } else if (password && password.length >= 6 && password.length <= 10) {
            pwdDescription = 'Weak password';
            return '#f07d58';
        } else if (password && password.length > 10) {
            pwdDescription = 'Strong password';
            return '#55a95d';
        } else {
            pwdDescription = 'Bad password';
            return '#cb473e';
        }
    }

    return (
        <>
          
            <div className="row">
                <div className="col-12 password-display-container"
                    style={{ backgroundColor: setBackgroundColor(password) }}
                >
                    <div style={{ width: '100%' }}>
                        <div className="password-display">
                            <input 
                                ref={passwordRef}
                                type="text"
                                value={password}
                                className="password-display-input"
                                readOnly
                            />
                        </div>

                        <div className="password-description">
                            {
                                password && password.length > 10 ?
                                <>
                                    <i className="fas fa-check-circle"></i> { pwdDescription }
                                </> :
                                <>
                                    <i className="fas fa-exclamation-circle"></i> { pwdDescription }
                                </>
                            }
                        </div>
                    </div>

                    <div className="password-display-icons">
                        <Button
                            className="copy-btn"
                            iconClass="far fa-copy"
                            handleClick={copyClipBoard}
                        />
                        <Button
                            className="generate-btn"
                            iconClass="fas fa-sync-alt"
                            handleClick={() => generateNewPassword(passwordProps,rangeValue)}
                        />

                        <Tooltip 
                            message="Copied"
                            position="left"
                            displayTooltip={tooltip}
                        />
                    </div>
                </div>
            </div>

            <Container 
                type={type}
                setPassword={setPassword}
                setRange={setRange}
                setPasswordProps={setPasswordProps}
                passwordRef={passwordRef}
            />

        </>
    )
}

const selectTagStyle = {
    backgroundColor: 'inherit',
    color: '#506175',
    width: '20%',
    height: 'auto',
    marginLeft: '-4px'
}

export default Display;