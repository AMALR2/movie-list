const db=require('../config/config')
const bcrypt=require('bcrypt')
const userModel={
    getAllMovies:(callback)=>{
        const sql = "SELECT * FROM `movie`"
        db.query(sql,callback)
    },
    getAllGenres:(callback)=>{
        const sql = "SELECT * FROM `genre`"
        db.query(sql,callback)
    },
    postRegistration: (req, res, callback) => {
        const sql = "INSERT INTO user(`uname`,`email`,`password`) VALUES (?)"
        const salt = 10

        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
                res.json(err)
            }
            const values = [
                req.body.uname,
                req.body.email,
                hash
            ]
            db.query(sql, [values], callback)
        })
    }
}
module.exports=userModel