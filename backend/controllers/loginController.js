const loginModel = require('../models/loginModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
let user
const loginController = {
    postLogin: (req, res, isAdmin) => {
        if (!isAdmin) {
            loginModel.postLogin(req, res, (err, data) => {
                if (err) {
                    res.json(err)
                }
                if (data.length === 0) {
                    res.json("user email not found")
                }
                user = data[0]
                bcrypt.compare(req.body.password, user.password, (err, pass) => {
                    if (err) {
                        res.json(err)
                    }
                    if (pass) {
                        const name = user.uname
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
        } else {
            user = {
                uname: "admin",
                email: "admin",
                password: "$2b$10$VqOwyEAOrpIVcColDGpfx.4bNUsR1EQiAcjYeoxhSmpiXjonX5C5q"
            }
            if (req.body.email != user.email) {
                res.json("admin email not found")
            }
            bcrypt.compare(req.body.password, user.password, (err, pass) => {
                if (err) {
                    res.json(err)
                }
                if (pass) {
                    const name = user.uname
                    const token = jwt.sign({ name }, 'jwt-secretkey', { expiresIn: "1d" })
                    res.cookie('token', token)
                    res.status(200).json({ status: "Successful Login" })
                }
                else {
                    console.log("Incorrect password")
                    res.status(401).json({ status: "Invalid credentials" })
                }
            })
        }
    },
    Logout: (req, res) => {
        res.clearCookie('token')
        res.json({ status: "Success" })
    }
}
module.exports = loginController
