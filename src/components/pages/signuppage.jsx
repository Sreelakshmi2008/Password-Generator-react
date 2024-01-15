import React, { useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import {base,register } from '../../utils/helper';
import '../../App.css'
import axios from 'axios'
export default function SignUpPage() {

    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()



    const signup = async (credentials) => {
        try {
        const response = await axios.post(base + register, credentials);
         
          console.log(response.data);
          navigate('/login')
        } catch (error) {
          
          console.error(error.response.data);       
        }

         
        }
    
        const handleSubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData();
    
            // Append each field to the FormData object
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            console.log(formData)

            // Call your signup function
            await signup(formData);
            
        };
    
    
        

    return (
        <div className="text-center" style={{marginLeft:'40%',marginTop:'10%'}}>
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form onSubmit={handleSubmit} >
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="first_name" 
                    onChange={(e)=>setUsername(e.target.value)} required />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)} />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} required />
                </p>
                
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}