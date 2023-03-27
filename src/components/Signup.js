import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name:"", email: "", password: "", cpassword: "" })
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password})
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //  Save the auth token and redirect...
      localStorage.setItem('token', json.authtoken)
      navigate("/")
      props.showAlert("Account Created Successfully", "success")
    } else {
      props.showAlert("Invalid Details", "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="container mt-3">
      <h2><u> Signup to create your notes on iNotebook</u></h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-3 mb-3">
          <label htmlFor="name" className="form-label"><h5>Name</h5> </label>
          <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name here " onChange={onChange} aria-describedby="name" />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="form-label"><h5>Email address</h5> </label>
          <input type="email" className="form-control" id="email" name="email" placeholder="name@gmail.com" onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label"><h5>Password</h5> </label>
          <input type="password" className="form-control" id="password" name="password" placeholder="******* " onChange={onChange} minLength = {5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label"><h5>Confirm Password</h5> </label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="*******" onChange={onChange} minLength = {5} required/>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
