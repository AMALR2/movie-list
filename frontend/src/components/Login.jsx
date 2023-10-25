import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2";


export const Login = () => {
    const nullUser = {
        email: '',
        password: ''
    }
    const [user, setUser] = useState(nullUser)
    const { isAdmin } = useParams()
    const isAdminBool = isAdmin === 'true'
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    const loginHandler = (e) => {
        e.preventDefault()
        if (!isAdminBool) {
            axios.post('http://localhost:3000/api/login', user)
                .then((res) => {
                    console.log(res)
                    if (res.data.status === "Successful Login") {
                        Swal.fire("Login Successful", "You are now logged in!", "success")
                        navigate('/')
                        setUser(nullUser)
                    }
                })
                .catch((err) => {
                    Swal.fire("Login Failed", "Incorrect credentials. Try again.", "error")
                    console.log(err)
                })
        }
        else{
            axios.post('http://localhost:3000/api/admin/login', user)
                .then((res) => {
                    console.log(res)
                    if (res.data.status === "Successful Login") {
                        Swal.fire("Login Successful", "You are now logged in!", "success")
                        navigate('/admin')
                        setUser(nullUser)
                    }
                })
                .catch((err) => {
                    Swal.fire("Login Failed", "Incorrect credentials. Try again.", "error")
                    console.log(err)
                })
        }

    }
    return (
        <div className="loginContainer">
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
                <input type="mail" placeholder="email" name="email" value={user.email} onChange={(e) => setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))}></input>
                <input type="password" placeholder="Password" name="password" value={user.password} onChange={(e) => setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))}></input>
                <button type="submit">Login</button>
            </form>
            {!isAdminBool && (
            <>
                <span>New user</span>
                <Link to="/registration">Register</Link>
            </>
            )}
            
        </div>
    )
}