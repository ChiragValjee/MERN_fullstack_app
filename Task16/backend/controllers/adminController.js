const adminInfo = require('../models/adminModel')
const JWT = require('jsonwebtoken')


async function registerAdmin(req, res) {
    const contentType = req.headers["content-type"]
    if(!contentType || !contentType.includes("application/json")){
        res.status(415).send({error: "Unsupported content type"})
    }
    const {name, email, password, role} = req.body
    console.log(name, email, password, role)
    if (!name || !email || !password || !role) {
        return res.status(400).json({error: "User has not entered credentials correctly"})
    }

    try {
        const existingUser = await adminInfo.findOne({email})
        if (existingUser) {
            console.log('User already registered')
            return res.status(409).json({error: "Email already in use"})
        }
        const userLogin = await adminInfo.create({name, email, password, role})
        res.status(200).json({name, email, role})
        console.log("User successfully registered")

    } catch (error) {
        console.log(error)
        res.json({status: "error", error: "User was not successfully registered"})
    }
}

const secretKey = "mySecretAdminKey"

function generateToken(userId, role) {
    return JWT.sign({userId, role}, secretKey, {expiresIn: "1h"})
}

async function loginAdmin(req, res) {
    const contentType = req.headers["content-type"]
    if(!contentType || !contentType.includes("application/json")){
        res.status(415).send({error: "Unsupported content type"})
    }
    const {email, password} = req.body
    console.log(email, password)

    if (!email || !password) {
        console.log(`user has not put in their credentials properly`)
        return res.status(400).json({error: "Missing login credentials"})
    }

    try {
        const user = await adminInfo.findOne({email})
        if (!user) {
            console.log(`User not found`)
            return res.status(401).json({error: "Incorrect email or password"})
        }

        if (password !== user.password) {
            console.log(`Incorrect password`)
            return res.status(401).json({error: "Incorrect password"})
        }

        const token = generateToken(user._id, user.role)
        console.log(token)

        res.json({user: token})
        console.log(`User logged in successfully`)


    } catch (error) {
        console.log(error)
        return res.json({status: "error"}) //Why did we put user = false

    }
}

module.exports = {
    registerAdmin,
    loginAdmin

}