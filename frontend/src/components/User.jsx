import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const User = () => {
    const [auth, setAuth] = useState(false)
    const [uname, setUname] = useState("")
    const [token, setToken] = useState()
    const [genre, setGenre] = useState([])
    const [movies, setMovies] = useState([])
    const [filteredMovies, setFilteredMovies] = useState(movies)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('http://localhost:3000/api')
            .then(res => {
                if (res.data.status === "Success") {
                    setAuth(true)
                    setToken(res.data)
                    setUname(res.data.name)
                }
                else {
                    setAuth(false)
                    const isAdmin=false
                    navigate(`/login/${isAdmin}`)
                }
            })
            .catch(err => console.log(err))
    }, [token])
    useEffect(() => {
        axios.get('http://localhost:3000/api/genres')
            .then((res) => setGenre(res.data))
            .catch((err) => console.log(err))
        axios.get('http://localhost:3000/api/movies')
            .then((res) => setMovies(res.data))
            .catch((err) => console.log(err))
    }, [])
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
                axios.get('http://localhost:3000/api/logout')
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
            }
          })
       
    }
    return (
        <>
            <div className='navbar'>
                <h2>Movie List</h2>
                <button onClick={() => setFilteredMovies(movies)}>All</button>
                {genre.map((item) =>
                    <button onClick={() => setFilteredMovies(movies.filter(item2 => item2.genre === item.id))} key={item.id}>{item.genre}</button>
                )}
                <button onClick={deleteHandler}><strong>Logout</strong></button>
            </div>
            <div className='body'>
                {filteredMovies.map(filteredItem => {
                    const selectedGenre = genre.find(item => filteredItem.genre === item.id)
                    return (
                        <div className="movieContainer" key={filteredItem.id}>
                            <img src={filteredItem.poster} />
                            <h2>{filteredItem.title} ({filteredItem.year})</h2>
                            <h3>{selectedGenre.genre}</h3>
                            <span><strong>{filteredItem.rating} </strong></span>
                            <FontAwesomeIcon icon={faStar} beat />
                            <p>{filteredItem.description}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}