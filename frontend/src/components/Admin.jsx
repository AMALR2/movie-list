import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const Admin=()=>{
    const [auth,setAuth]=useState(false)
    const [uname,setUname]=useState("")
    const [token,setToken]=useState()
    const navigate=useNavigate()
    axios.defaults.withCredentials=true

    useEffect(()=>{
        axios.get('http://localhost:3000/api/admin')
            .then(res=>{
                if(res.data.status==="Success"){
                    setAuth(true)
                    setToken(res.data)
                    setUname(res.data.name)
                }
                else{
                    setAuth(false)
                    navigate('/admin/login')
                }
            })
            .catch(err=>console.log(err))
    },[token])
    const deleteHandler=()=>{
        axios.get('http://localhost:3000/api/admin/delete')
            .then((res)=>console.log(res))
            .catch((err)=>console.log(err))
    }
    if(auth){
        return(
            <>
                <h2>HOME</h2>
                <h2>Hello {uname}</h2>
                <button onClick={deleteHandler}>Logout</button>
            </>
    )}
}