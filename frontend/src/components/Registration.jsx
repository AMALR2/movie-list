import React,{useState} from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'

export const Registration = () => {
    const nullUser={
        uname:'',
        email:'',
        password:''
      }
    const [user,setUser]=useState(nullUser)
    const registrationHandler=(e)=>{
        e.preventDefault()
        if(user.uname.length===0){
            Swal.fire("Username Required","Username field can't be empty.","error")
        }
        else if(user.email.length===0){
            Swal.fire("Email Required","Email field can't be empty.","error")
        }
        else if(user.password.length===0){
            Swal.fire("Password Required","Password field can't be empty.","error")
        }
        else if(user.password.length<8){
            Swal.fire("Password Too Short", "Your password must be at least 8 characters long.", "error")
        }
        else{
            axios.post('http://localhost:3000/api/registration',user)
            .then((res)=>Swal.fire("Registration Successful", "You have been registered succesfully.", "success"))
            .catch((err)=>console.log(err))
            setUser(nullUser)
    }}
    return (
        <div className="loginContainer">
            <form onSubmit={registrationHandler}>
                <input type="text" placeholder="Username" name="uname" value={user.uname} onChange={(e)=>setUser((prev)=>({...prev,[e.target.name]:e.target.value}))}></input>
                <input type="mail" placeholder="email" name="email" value={user.email} onChange={(e)=>setUser((prev)=>({...prev,[e.target.name]:e.target.value}))}></input>
                <input type="password" placeholder="Password" name="password" value={user.password} onChange={(e)=>setUser((prev)=>({...prev,[e.target.name]:e.target.value}))}></input>
                <button type="submit">Register</button>
            </form>
            <span>Already an user?</span>
            <Link to="/login">Login</Link>
        </div>
    )
}
