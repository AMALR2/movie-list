import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDisplay, faStar } from '@fortawesome/free-solid-svg-icons'

export const User = () => {
    const [genre, setGenre] = useState([])
    const [movies, setMovies] = useState([])
    const [filteredMovies, setFilteredMovies] = useState(movies)
    useEffect(() => {
        axios.get('http://localhost:3000/api/genres')
            .then((res) => setGenre(res.data))
            .catch((err) => console.log(err))
        axios.get('http://localhost:3000/api/movies')
            .then((res) => setMovies(res.data))
            .catch((err) => console.log(err))
    }, [])
    return (
        <>
            <div className='navbar'>
                <h2>Movie List</h2>
                <button onClick={() => setFilteredMovies(movies)}>All</button>
                {genre.map((item) =>
                    <button onClick={() => setFilteredMovies(movies.filter(item2 => item2.genre === item.id))} key={item.id}>{item.genre}</button>
                )}
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