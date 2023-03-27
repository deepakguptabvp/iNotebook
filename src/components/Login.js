import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "", })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //  Save the auth token and redirect...
            localStorage.setItem('token', json.authtoken)
            navigate("/")
            props.showAlert("Logged in Successfully", "success")
        } else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }
        const onChange = (e) => {
            setCredentials({ ...credentials, [e.target.name]: e.target.value })
        }

        return (
            <div className="container mt-3">
                <h2><u>Login to access your notes on iNotebook</u></h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                        <label htmlFor="email" className="form-label"><h5>Email address</h5></label>
                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" placeholder="name@gmail.com"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label"><h5>Password</h5></label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" placeholder="*******"/>
                    </div>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        )
    }
    
export default Login