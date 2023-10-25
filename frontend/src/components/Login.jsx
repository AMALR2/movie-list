import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2";


export const Login = () => {
    const nullAdmin = {
        email: '',
        password: ''
    }
    const [admin, setAdmin] = useState(nullAdmin)
    const navigate=useNavigate()
    axios.defaults.withCredentials=true
    const loginHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/api/admin/login', admin)
            .then((res) => {
                console.log(res)
                if(res.data.status==="Successful Login"){
                    Swal.fire("Login Successful","You are now logged in!","success")
                    navigate('/admin')
                    setAdmin(nullAdmin)
                }
            })
            .catch((err) => {
                Swal.fire("Login Failed","Incorrect credentials. Try again.","error")
                console.log(err)})
    }
    return (
        <div className="loginContainer">
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
                <input type="mail" placeholder="email" name="email" value={admin.email} onChange={(e) => setAdmin((prev) => ({ ...prev, [e.target.name]: e.target.value }))}></input>
                <input type="password" placeholder="Password" name="password" value={admin.password} onChange={(e) => setAdmin((prev) => ({ ...prev, [e.target.name]: e.target.value }))}></input>
                <button type="submit">Login</button>
            </form>
            <span>New admin</span>
            <Link to="/registration">Register</Link>
        </div>
    )
}