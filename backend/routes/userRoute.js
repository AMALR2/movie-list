const express=require('express')
const userController=require('../controllers/userController')
const loginController=require('../controllers/loginController')
const router=express.Router()
const auth_user=(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res.json({error:"Token not found"})
    }
    else{
        jwt.verify(token,'jwt-secretkey',(err,decode)=>{
            if(err){
                res.json({error:"Token not verified"})
            }
            else{
                req.name=decode.name
                next()
            }
        })
    }
}
router.get('/',auth_user,userController.getUser)
router.get('/movies',userController.getAllMovies)
router.get('/genres',userController.getAllGenres)
router.post('/registration',userController.postRegistration)
router.post('/login', (req, res) => {
    const isAdmin = false
    loginController.postLogin(req, res, isAdmin)
  })
router.get('/logout',loginController.Logout)
module.exports=router