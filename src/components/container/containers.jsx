import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios'
import './containers.css';
import Button from './button/button';
import Slider from './slider/slider';
import CheckBox from './checkbox/checkbox';
import {base,generate, setPasswordLength, copyToClipBoard,save } from '../../utils/helper';

const accessToken = localStorage.getItem('jwtToken')
const CHECKBOX_LIST = [
    {
        id: 0,
        name: 'uppercase',
        label: 'Uppercase',
        isChecked: true
    },
    {
        id: 1,
        name: 'lowercase',
        label: 'Lowercase',
        isChecked: true
    },
    {
        id: 2,
        name: 'symbols',
        label: 'Symbols',
        isChecked: true
    },
    {
        id: 3,
        name: 'numbers',
        label: 'Numbers',
        isChecked: true
    },
];

const Container = props => {
    const { setPassword, setRange, setPasswordProps, passwordRef, type } = props;

    const [rangeValue, setRangeValue] = useState(12);
    const [checkbox, setCheckBox] = useState({
        uppercase: true,
        lowercase: true,
        symbols: true,
        numbers: true
    });
    const [checked, setChecked] = useState(false);
    const [checkedName, setCheckedName] = useState(''); 
    const [minMaxValue, setMinMaxValue] = useState({
        min: 1,
        max: 60
    });

    const { uppercase, lowercase, symbols, numbers } = checkbox;
    const { min, max } = minMaxValue;

    useEffect(() => {
        setPasswordLength(rangeValue);
        setRange(rangeValue);
        setRangeValue(rangeValue);
        passwordGenerated(checkbox, rangeValue);

        checkBoxCount();

        // eslint-disable-next-line
    }, [uppercase, lowercase, symbols, numbers]);

    const checkBoxCount = () => {
        const checkedCount = Object.keys(checkbox).filter(key => checkbox[key]);
        const disabled = checkedCount.length === 1;
        const name = checkedCount[0];
        if (disabled) {
            setChecked(disabled);
            setCheckedName(name);
        } else {
            setChecked(false);
            setCheckedName('');
        }
    }

    const updateCheckBoxes = () => {
        if (type === 'pin') {
            CHECKBOX_LIST.map(checkbox => {
                const name = checkbox.name;
                if (name !== 'numbers') {
                    checkbox.isChecked = false;
                    const checkboxProps = {
                        name,
                        checkedName: name,
                        checked: true,
                        isChecked: checkbox.isChecked,
                        min: 0,
                        max: 15,
                        length: 3
                    };
                    checkBoxProperties(checkboxProps);
                }
                return '';
            });
        } else {
            CHECKBOX_LIST.map(checkbox => {
                const name = checkbox.name;
                checkbox.isChecked = true;
                const checkboxProps = {
                    name,
                    checkedName: '',
                    checked: false,
                    isChecked: checkbox.isChecked,
                    min: 1,
                    max: 60,
                    length: 12
                };
                checkBoxProperties(checkboxProps);
                return '';
            });
        }
    }

    const checkBoxProperties = checkBoxProps => {
        const { name, checked, isChecked, checkedName, min, max, length } = checkBoxProps;

        setCheckBox(prevState => ({ ...prevState, [name]: isChecked }));
        setChecked(checked);
        setCheckedName(checkedName);
        setPasswordLength(length);
        setMinMaxValue({ min, max });
        setRangeValue(length);
        setRange(length);
    }

    useMemo(updateCheckBoxes, [type]);

    const passwordGenerated = async (checkbox, rangeValue) => {
        try {
            
            const response = await axios.post(base + generate, {
                choices: Object.keys(checkbox).filter(choice => checkbox[choice]),
                length: rangeValue
              },
              {headers:
                {'Authorization': `Bearer ${accessToken}`}
            });
              
            console.log(checkbox)
            setPassword(response.data.password);
            setPasswordProps(checkbox);
            console.log("here")
        } catch (error) {
            console.error('Error generating password:', error);
            // Handle the error, show a message, or set a default password, etc.
        }
    }
    

    const onChangeSlider = e => {
        setPasswordLength(e.target.value);
        setRangeValue(e.target.value);
        setRange(e.target.value);
        passwordGenerated(checkbox, e.target.value);
    }

    const onChangeCheckBox = e => {
        if (type !== 'pin') {
            let { name, checked } = e.target;
            CHECKBOX_LIST.map(checkbox => {
                if (checkbox.name === name) {
                    checkbox.isChecked = checked;
                    setCheckBox(prevState => ({ ...prevState, [name]: checkbox.isChecked }));
                    setPasswordLength(rangeValue);
                    setRangeValue(rangeValue);
                }
                
                return '';
            });
        }
    }

    const copyClipBoard = elementRef =>async e => {
        e.preventDefault();
        copyToClipBoard(elementRef);
        try {
            const copiedPassword = await navigator.clipboard.readText();
            const response = await axios.post(base+save, {'copied': copiedPassword },
            {headers:
                {'Authorization': `Bearer ${accessToken}`}
            });
            console.log('Password copied to the backend:', response.data);
        } catch (error) {
            console.error('Error copying password to the backend:', error);
            // Handle the error, show a message, etc.
        }
    }

    return (
        <div className="password-settings">
            <h3 className="h3">Use the slider, and select from the options.</h3>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        &nbsp;
                        <Slider 
                            min={parseInt(min, 10)}
                            max={parseInt(max, 10)}
                            step={1}
                            defaultLength={parseInt(rangeValue, 10)}
                            value={parseInt(rangeValue, 10)}
                            onChangeValue={onChangeSlider}
                        />
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="row checkbox-container">
                        {
                            CHECKBOX_LIST.map(checkbox =>
                                <CheckBox 
                                    key={checkbox.id}
                                    name={checkbox.name}
                                    checked={checkbox.isChecked}
                                    label={checkbox.label}
                                    value={checkbox.isChecked}
                                    onChange={onChangeCheckBox}
                                    disabled={
                                        checked && checkbox.isChecked && checkedName === checkbox.name
                                    }
                                />
                            )
                        }
                    </div>
                </div>
            </div>
            <br />

            <div className="text-center">
                <div className="row">
                    <div className="col-md-12">
                        <Button 
                            className="btn password-btn"
                            label="Copy Password"
                            handleClick={copyClipBoard(passwordRef.current)}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export { Container };