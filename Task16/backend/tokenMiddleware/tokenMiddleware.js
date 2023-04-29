const jwt = require('jsonwebtoken')

function checkJWTToken(req, res, next) {
    if (req.headers['authorization']) {
        let token = req.headers['authorization'].split(" ")[1];
        jwt.verify(token, "mySecretAdminKey", function (err, data) {
            if (err) {
                res.send({message: "Invaliid token"});
                next()
            } else {
                req.email = data.email;
                req.password = data.password
                req.role = data.role

                next()
            }
        })
    } else {
        res.send({message: "No token attached to the request"})
    }
}

module.exports = {
    checkJWTToken
}