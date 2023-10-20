const userModel=require('../models/userModel')
const userController = {
    getAllUsers: (req, res) => {
        userModel.getAllUsers((err,data)=>{
            err?res.json(err):res.json(data)
        })
    }
}
module.exports = userController
