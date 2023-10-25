const userModel=require('../models/userModel')
const userController = {
    getUser: (req, res) => {
        return res.status(200).json({ status: "Success", name: req.name })
    },
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
    },
    postRegistration: (req, res) => {
        userModel.postRegistration(req, res, (err, data) => {
            err ? res.json(err) : res.json(data)
        })
    }
}
module.exports = userController
