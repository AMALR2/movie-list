const db = require('../config/config')
const loginModel={
    postLogin: (req, res, callback) => {
        const sql = "SELECT * FROM `user` WHERE `email`=?"
        db.query(sql, [req.body.email], callback)
    }
}
module.exports=loginModel

