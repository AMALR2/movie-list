const db=require('../config/config')
const userModel={
    getAllUsers:(callback)=>{
        const sql = "SELECT * FROM `movie`"
        db.query(sql,callback)
    }
}
module.exports=userModel