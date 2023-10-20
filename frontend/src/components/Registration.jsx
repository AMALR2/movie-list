import React,{useState} from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import swal from 'sweetalert'

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
            swal("ERROR","Username field can't be empty","error")
        }
        else if(admin.email.length===0){
            swal("ERROR","email field can't be empty","error")
        }
        else if(admin.password.length===0){
            swal("ERROR","email field can't be empty","error")
        }
        else{
            axios.post('http://localhost:3000/api/admin/registration',admin)
            .then((res)=>swal("Success", "Admin registered", "success"))
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
