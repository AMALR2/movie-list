import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const AddMovie = () => {
    const nullMovie = {
        title: '',
        year: '',
        rating: '',
        genre: '',
        description: ''
    }
    const [newMovie, setNewMovie] = useState(nullMovie)
    const [imageData, setImageData] = useState()
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear()
    useEffect(() => {
        axios.get('http://localhost:3000/api/genres')
            .then((res) => setGenres(res.data))
            .catch((err) => console.log(err))
        axios.get('http://localhost:3000/api/movies')
            .then((res) => setMovies(res.data))
            .catch((err) => console.log(err))
    }, [])
    // console.log(genre)
    const submitHandler = (e) => {
        e.preventDefault()
        if (newMovie.title.length === 0) {
            Swal.fire("Title Required", "Title field can't be empty.", "error")
        }
        else if (movies.some((item) => item.title === newMovie.title)) {
            Swal.fire("Error", "Movie with same title already exists.", "error");
        }
        else if (newMovie.year.length === 0) {
            Swal.fire("Year Required", "Year field can't be empty.", "error")
        }
        else if (newMovie.rating.length === 0) {
            Swal.fire("Rating Required", "Rating field can't be empty.", "error")
        }
        else if (newMovie.genre.length === 0) {
            Swal.fire("Genre Required", "Genre field can't be empty.", "error")
        }
        else if (newMovie.description.length === 0) {
            Swal.fire("Description Required", "Description field can't be empty.", "error")
        }
        else if (imageData === null) {
            Swal.fire("ERROR", "poster field can't be empty.", "error")
        }
        else {
            const formData = new FormData()
            formData.append('poster', imageData)
            formData.append('title', newMovie.title);
            formData.append('year', newMovie.year);
            formData.append('rating', newMovie.rating);
            formData.append('genre', newMovie.genre);
            formData.append('description', newMovie.description);
            axios.post('http://localhost:3000/api/admin/add', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
                .then((res) => Swal.fire("Success", "Movie added succesfully.", "success"))
                .catch((err) => console.log(err))
            setNewMovie(nullMovie)
        }
    }
    return (
        <form onSubmit={submitHandler}>
            <input type="text" placeholder="title" name="title" value={newMovie.title} onChange={(e) => setNewMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }))}></input>
            <input type="number" placeholder="year" min={1888} max={currentYear} step={-1} name="year" value={newMovie.year} onChange={(e) => setNewMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }))}></input>
            <input type="number" placeholder="rating" min={0} max={5} step={0.5} name="rating" value={newMovie.rating} onChange={(e) => setNewMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }))}></input>
            <select name="genre" onChange={(e) => setNewMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }))}>
                <option>genre</option>
                {genres.map((item) =>
                    <option value={item.id} key={item.id}>{item.genre}</option>
                )}
            </select>
            <input type="text" placeholder="description" name="description" value={newMovie.description} onChange={(e) => setNewMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }))}></input>
            <span>Poster: </span>
            <input type="file" name="poster" onChange={(e) => setImageData(e.target.files[0])}></input>
            <button type="submit">Submit</button>
        </form>
    )
}