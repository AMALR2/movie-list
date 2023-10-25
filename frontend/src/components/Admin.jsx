import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AddMovie } from "./AddMovie";
import Swal from "sweetalert2";
export const Admin = () => {
    const [auth, setAuth] = useState(false)
    const [uname, setUname] = useState("")
    const [token, setToken] = useState()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('http://localhost:3000/api/admin')
            .then(res => {
                if (res.data.status === "Success") {
                    setAuth(true)
                    setToken(res.data)
                    setUname(res.data.name)
                }
                else {
                    setAuth(false)
                    navigate('/login')
                }
            })
            .catch(err => console.log(err))
    }, [token])
    const deleteHandler = () => {
        Swal.fire({
            title: 'Logout',
            text: 'Are you sure you want to log out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, log out',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
                axios.get('http://localhost:3000/api/admin/logout')
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
            }
          })
       
    }
    if (auth) {
        return (
            <>
            <div className="navbar">
                <h2>HOME</h2>
                <span>Hello {uname}</span>
                <button onClick={deleteHandler}>Logout</button>
            </div>
            <div className="loginContainer">
                <h2>Add new movie</h2>
                <AddMovie />
            </div>
            </>
        )
    }
}