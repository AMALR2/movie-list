const express=require('express')
const jwt = require('jsonwebtoken')
const multer=require('multer')
const path=require('path')
const adminController=require('../controllers/adminController')
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
const storage=multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'public/uploads')
    },
    filename:(req,res,cb)=>{
        cb(null,res.fieldname+'_'+Date.now()+path.extname(res.originalname))
    }
})

const upload=multer({
    storage:storage
})
router.get('/',auth_user,adminController.getAdmin)
router.get('/logout',loginController.Logout)
router.post('/login', (req, res) => {
    const isAdmin = true
    loginController.postLogin(req, res, isAdmin)
  })
router.post('/add',upload.single('poster'),adminController.postMovie)
module.exports=router