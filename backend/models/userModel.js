const db=require('../config/config')
const userModel={
    getAllMovies:(callback)=>{
        const sql = "SELECT * FROM `movie`"
        db.query(sql,callback)
    },
    getAllGenres:(callback)=>{
        const sql = "SELECT * FROM `genre`"
        db.query(sql,callback)
    }
}
module.exports=userModel