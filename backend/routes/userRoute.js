const express=require('express')
const userController=require('../controllers/userController')
const router=express.Router()
router.get('/movies',userController.getAllMovies)
router.get('/genres',userController.getAllGenres)
module.exports=router