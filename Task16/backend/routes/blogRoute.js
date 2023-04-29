const express = require('express')
const router = express.Router()
const checkJWTToken = require('../tokenMiddleware/tokenMiddleware')

const {
    getBlogs,
    deleteAllBlogs,
    createBlog,
    editBlog,
    deleteBlog
} = require('../controllers/blogController')

router.get('/', getBlogs, )

router.post('/', createBlog)

router.delete('/', deleteAllBlogs)

router.delete('/:id', deleteBlog)

router.put('/:id', editBlog)

module.exports = router