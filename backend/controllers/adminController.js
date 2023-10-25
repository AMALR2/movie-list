const adminModel = require('../models/adminModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const adminController = {
    getAdmin: (req, res) => {
        return res.status(200).json({ status: "Success", name: req.name })
    },
    postMovie: (req, res) => {
        adminModel.postMovie(req, res, (err, data) => {
            err ? res.json(err) : res.json(data)
        })
    }
}
module.exports = adminController