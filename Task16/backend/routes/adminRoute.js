const express = require('express')
const {
    registerAdmin,
    loginAdmin
} = require('../controllers/adminController');


let router = express.Router()

router.post('/registerAdmin', registerAdmin)

router.post('/loginAdmin', loginAdmin)

module.exports = router