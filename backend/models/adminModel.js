const db = require('../config/config')
const bcrypt = require('bcrypt')
const adminModel = {
    postHome: (req, res, callback) => {
        const sql = "SELECT * FROM movie"
        db.query(sql, callback)
    },
    postLogin: (req, res, callback) => {
        const sql = "SELECT * FROM `admin` WHERE `email`=?"
        db.query(sql, [req.body.email], callback)
    },
    postRegistration: (req, res, callback) => {
        const sql = "INSERT INTO admin(`uname`,`email`,`password`) VALUES (?)"
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
    },
    postMovie: (req, res, callback) => {
        const sql = "INSERT INTO `movie`(`title`,`year`,`rating`,`genre`,`description`,`poster`) VALUES (?)"
        const poster=req.file.filename
        if (!poster) {
            return res.status(400).json({ error: 'No image provided' });
        }
        const values = [
            req.body.title,
            req.body.year,
            req.body.rating,
            req.body.genre,
            req.body.description,
            poster
        ]
        db.query(sql, [values], callback)
    }
}
module.exports = adminModel