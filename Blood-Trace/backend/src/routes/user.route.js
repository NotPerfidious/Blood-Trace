/**
 * User Routes
 * Defines API endpoints for user authentication, including registration, login, and logout.
 */
const { registerUser, loginUser, logoutUser } = require("../controllers/user.controller");
const Router = require("express");
const router = new Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

module.exports = router;