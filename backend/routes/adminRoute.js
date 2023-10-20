const express=require('express')
const jwt=require('jsonwebtoken')
const adminController=require('../controllers/adminController')
const router=express.Router()
const auth_user=(req,res,next)=>{
    const token=req.cookies.token
    console.log(token)
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
router.get('/',auth_user,adminController.getAdmin)
router.get('/delete',adminController.deleteAdmin)
router.post('/login',adminController.postLogin)
router.post('/registration',adminController.postRegistration)
module.exports=router