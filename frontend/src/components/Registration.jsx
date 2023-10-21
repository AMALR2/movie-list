import React,{useState} from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'

export const Registration = () => {
    const nullAdmin={
        uname:'',
        email:'',
        password:''
      }
    const [admin,setAdmin]=useState(nullAdmin)
    const registrationHandler=(e)=>{
        e.preventDefault()
        if(admin.uname.length===0){
            Swal.fire("Username Required","Username field can't be empty.","error")
        }
        else if(admin.email.length===0){
            Swal.fire("Email Required","Email field can't be empty.","error")
        }
        else if(admin.password.length===0){
            Swal.fire("Password Required","Password field can't be empty.","error")
        }
        else if(admin.password.length<8){
            Swal.fire("Password Too Short", "Your password must be at least 8 characters long.", "error")
        }
        else{
            axios.post('http://localhost:3000/api/admin/registration',admin)
            .then((res)=>Swal.fire("Registration Successful", "You have been registered succesfully.", "success"))
            .catch((err)=>console.log(err))
            setAdmin(nullAdmin)
    }}
    return (
        <>
            <form onSubmit={registrationHandler}>
                <input type="text" placeholder="Username" name="uname" value={admin.uname} onChange={(e)=>setAdmin((prev)=>({...prev,[e.target.name]:e.target.value}))}></input>
                <input type="mail" placeholder="email" name="email" value={admin.email} onChange={(e)=>setAdmin((prev)=>({...prev,[e.target.name]:e.target.value}))}></input>
                <input type="password" placeholder="Password" name="password" value={admin.password} onChange={(e)=>setAdmin((prev)=>({...prev,[e.target.name]:e.target.value}))}></input>
                <button type="submit">Register</button>
            </form>
            <span>Already an admin?</span>
            <Link to="/admin/login">Login</Link>
        </>
    )
}
