const adminModel = require('../models/adminModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const adminController = {
    getAdmin: (req, res) => {
        return res.status(200).json({ status: "Success", name: req.name })
    },
    postLogin: (req, res) => {
        adminModel.postLogin(req, res, (err, data) => {
            if (err) {
                res.json(err)
            }
            if (data.length === 0) {
                res.json("email not found")
            }
            const admin = data[0]
            bcrypt.compare(req.body.password, admin.password, (err, pass) => {
                if (err) {
                    res.json(err)
                }
                if (pass) {
                    const name = admin.uname
                    const token = jwt.sign({ name }, 'jwt-secretkey', { expiresIn: "1d" })
                    res.cookie('token', token)
                    res.status(200).json({ status: "Successful Login" })
                }
                else {
                    console.log("Incorrect password")
                    res.status(401).json({ status: "Invalid credentials" })
                }
            })
        })
    },
    postRegistration: (req, res) => {
        adminModel.postRegistration(req, res, (err, data) => {
            err ? res.json(err) : res.json(data)
        })
    },
    deleteAdmin: (req, res) => {
        res.clearCookie('token')
        res.json({ status: "Success" })
    },
    postMovie: (req, res) => {
        adminModel.postMovie(req, res, (err, data) => {
            err ? res.json(err) : res.json(data)
        })
    }
}
module.exports = adminController