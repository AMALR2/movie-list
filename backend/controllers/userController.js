const userModel=require('../models/userModel')
const userController = {
    getAllMovies: (req, res) => {
        userModel.getAllMovies((err,data)=>{
            err?res.json(err):res.json(data)
        })
    },
    getAllGenres: (req, res) => {
        userModel.getAllGenres((err,data)=>{
            err?res.json(err):res.json(data)
        })
    }
}
module.exports = userController
