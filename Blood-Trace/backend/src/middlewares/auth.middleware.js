/**
 * Authentication Middleware
 * Verifies the JWT access token from signed cookies to ensure the user is authenticated.
 * Attaches the decoded user information to the request object.
 */
const jwt = require('jsonwebtoken');


const authenticateUser = (req, res, next) => {

    const accessToken = req.signedCookies.accessToken;

    if (!accessToken) {
        return res.status(401).json({
            message: 'Not authorized, no token'
        })
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.status(401).json({
                message: 'Token is not valid'
            })
        }

        console.log(user);

        req.user = user;

        return next();
    })
}

module.exports = authenticateUser;