import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../App.css'
import { login,base } from '../../utils/helper'

export default function SignInPage() {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()


    const loginuser = async (credentials) => {
        try {
        const response = await axios.post(base + login, credentials);
         
          console.log(response.data);
          localStorage.setItem('jwtToken', response.data.access);
          localStorage.setItem('refreshjwtToken', response.data.refresh);
          navigate('/main')
        } catch (error) {
          
          console.error(error.response.data);       
        }

         
        }
    
        const handleLoginSubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData();
    
            // Append each field to the FormData object
            formData.append('username', username);
            formData.append('password', password);
            console.log(formData)

            // Call your signup function
            await loginuser(formData);
            
        };
    
    return (
        <div className="text-center" style={{marginLeft:'40%',marginTop:'10%'}}>
            <h2>Sign in</h2>
            <form onSubmit={handleLoginSubmit}>
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="first_name" value={username} onChange={(e)=>setUsername(e.target.value)} required />
                </p>
                <p>
                    <label>Password</label>
                  
                    <br/>
                    <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}