//function to register a user. email variable and password variable assigned.
//If the user is not found on the db, create a new user and push that new user to the users array

const userInfo = require('../models/signUpModel')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')
const {response} = require("express");
const client = new OAuth2Client("803762574211-h0t59lbnd7mrrnog9qic18fvj0il90e4.apps.googleusercontent.com")
// const fetch = require('node-fetch')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


async function registerUser(req, res) {
    const contentType = req.headers["content-type"]
    if (!contentType || !contentType.includes("application/json")) {
        res.status(415).send({error: "Unsupported content type"})
    }
    const {name, email, password} = req.body
    console.log(name, email, password)
    if (!name || !email || !password || email.indexOf("@gmail.com") === -1) {
        return res.status(403).json({error: "User has not entered credentials correctly"})
    }

    try {
        const existingUser = await userInfo.findOne({email})
        if (existingUser) {
            console.log('User already registered')
            return res.status(409).json({error: "Email already in use"})
        }
        const userLogin = await userInfo.create({name, email, password})
        res.status(200).json({status: "ok"})
        console.log("User successfully registered")

    } catch (error) {
        console.log(error)
        res.json({status: "error", error: "User was not successfully registered"})
    }
}

const secretKey = "mySecretKey"

function generateToken(userId) {
    return jwt.sign({userId}, secretKey, {expiresIn: "1h"})
}

async function loginUser(req, res) {
    const contentType = req.headers["content-type"]
    if (!contentType || !contentType.includes("application/json")) {
        res.status(415).send({error: "Unsupported content type"})
    }
    const {email, password} = req.body
    console.log(email, password)

    if (!email || !password) {
        console.log(`user has not put in their credentials properly`)
        return res.status(400).json({error: "Missing login credentials"})
    }

    try {
        const user = await userInfo.findOne({email})
        if (!user) {
            console.log(`User not found`)
            return res.status(401).json({error: "Incorrect email or password"})
        }

        if (password !== user.password) {
            console.log(`Incorrect password`)
            return res.status(401).json({error: "Incorrect password"})
        }

        const token = generateToken(user._id)
        console.log(token)

        res.json({user: token})
        console.log(`User logged in successfully`)


    } catch (error) {
        console.log(error)
        return res.json({status: "error"}) //Why did we put user = false

    }
}

async function googleLogin(req, res) {
    const {userName} = req.body
    console.log(userName)
    const existingUser = await userInfo.findOne({email: userName})
    if (existingUser) {
        const token = jwt.sign({email: existingUser.username}, secretKey, {expiresIn: "1h"})
        return res.json({status:"ok", existingUser: token})

    }else if(!existingUser){
        return res.json({status: "error", existingUser: false})
    }
    // const {token_Id} = req.body
    //
    // client.verifyIdToken({
    //     token_Id,
    //     audience: "803762574211-h0t59lbnd7mrrnog9qic18fvj0il90e4.apps.googleusercontent.com"
    // }).then(response => {
    //     const {email_verified, name, email} = response.payload
    //
    //     if (email_verified) {
    //         userInfo.findOne({email}).exec((error, user) => {
    //             if (error) {
    //                 return res.status(400).json({error: "Something went wrong"})
    //
    //             } else {
    //                 if (user) {
    //                     const token = jwt.sign({_id: user._id}, secretKey, {expiresIn: "1h"})
    //                     const {_id, name, email} = user
    //                     res.json({token, user: {_id, name, email}})
    //
    //                 } else {
    //                     let password = email + name + 14
    //                     const newUser = userInfo.create({name, email, password})
    //                     res.status(200).json({name, email, password})
    //                     console.log("User successfully registered")
    //
    //                     newUser.save((error, data) => {
    //                         if (error) {
    //                             return res.status(400).json({error: "Something went wrong"})
    //                         } else {
    //                             const token = jwt.sign({_id: user._id}, secretKey, {expiresIn: "1h"})
    //                             const {_id, name, email} = newUser
    //                             res.json({token, user: {_id, name, email}})
    //
    //                         }
    //                     })
    //                 }
    //             }
    //         })
    //     }
    // })
}

async function facebookLogin(req, res){
    const {username} = req.body
    console.log(username)
    const existingUser = await userInfo.findOne({email: username})
    if (existingUser) {
        const token = jwt.sign({email: existingUser.username}, secretKey, {expiresIn: "1h"})
         return res.json({status:"ok", existingUser: token})

    }else if(!existingUser){
        return res.json({status: "error", existingUser: false})
    }


//     const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
//     fetch(url, {
//         method: "GET"
//     })
//         .then(response => response.json())
//         .then(response => {
//             const {email, name} = response
//             userInfo.findOne({email}).exec((error, user) => {
//                 if (error) {
//                     return res.status(400).json({
//                         error: "Something went wrong"
//                     })
//                 } else{
//                     if (user) {
//                         const token = jwt.sign({_id: user._id}, secretKey, {expiresIn: "1h"})
//                         const {_id, name, email} = user
//                         res.json({token, user: {_id, name, email}})
//
//                     } else {
//                         let password = email + name + 14
//                         const newUser = userInfo.create({name, email, password})
//                         res.status(200).json({name, email, password})
//                         console.log("User successfully registered")
//
//                         newUser.save((error, data) => {
//                             if (error) {
//                                 return res.status(400).json({error: "Something went wrong"})
//                             } else {
//                                 const token = jwt.sign({_id: user._id}, secretKey, {expiresIn: "1h"})
//                                 const {_id, name, email} = data
//                                 res.json({token, user: {_id, name, email}})
//
//                             }
//                         })
//                     }
//
//                 }
//             })
//         })
 }

module.exports = {
    registerUser,
    loginUser,
    googleLogin,
    facebookLogin

}