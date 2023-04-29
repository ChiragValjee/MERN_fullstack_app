const express = require('express')
const {
    registerUser,
    loginUser,
    googleLogin,
    facebookLogin
} = require('../controllers/signUpController');


let router = express.Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/googleLogin', googleLogin)

router.post('/facebookLogin', facebookLogin)

module.exports = router