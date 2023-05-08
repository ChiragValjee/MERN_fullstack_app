// Setting up a Node.js/Express.js server to handle HTTP requests.
// The code imports necessary modules such as 'express', 'cors', 'mongoose', and 'body-parser'.
// It defines a mongoURI to connect to a MongoDB Atlas database.
// The code sets up routes for handling requests to '/api/blog', including blog, sign up, and admin routes.
// The code also sets up middleware using 'express.json()' and 'helmet()'.
// Finally, the code starts the server listening on the defined PORT number and connects to the MongoDB database using mongoose.

const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const mongoURI = "mongodb+srv://hyperion:1234@carsapp.kkvpa29.mongodb.net/?retryWrites=true&w=majority"
const mongoose = require('mongoose').default
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const blogRouters = require('./routes/blogRoute')
const registerRouters = require('./routes/signUpRoute')
const adminRouters = require('./routes/adminRoute')
app.use(express.json())
const helmet = require("helmet");
app.use(helmet());

const PORT = process.env.PORT || 8080

app.use('/api/blog', blogRouters)
app.use('/api/blog', registerRouters)
app.use('/api/blog', adminRouters)

mongoose.connect(mongoURI)
    .then(() => {
        try {
            app.listen(PORT, function () {
                console.log(`You are now listening on port number: ${PORT} and you are connected to mongoDB`)
            })
        } catch (error) {
            console.log(error)
        }
    })

module.exports = app;

