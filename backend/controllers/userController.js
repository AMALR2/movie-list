const userModel=require('../models/userModel')
const userController = {
    getAllMovies: (req, res) => {
        userModel.getAllMovies((err,data)=>{
            if (err) {
                req.json(err)
            } else {
                const movies = data.map((item) => {
                    return ({
                        title: item.title,
                        year: item.year,
                        rating: item.rating,
                        genre: item.genre,
                        description: item.description,
                        poster: `http://localhost:3000/uploads/${item.poster}`
                    })
                })
                res.json(movies)
            }
        })
    },
    getAllGenres: (req, res) => {
        userModel.getAllGenres((err,data)=>{
            err?res.json(err):res.json(data)
        })
    }
}
module.exports = userController
