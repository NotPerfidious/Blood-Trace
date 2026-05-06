/**
 * Express Application Setup
 * Configures middleware (CORS, JSON parsing, cookies) and registers API routes
 * for users, donors, notifications, and admin functionality.
 */
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user.route');
const donorRouter = require('./routes/donor.route');
const notificationRouter = require('./routes/notification.route');
const adminRouter = require('./routes/admin.route');
const accessibilityRouter = require('./routes/accessibility.route');
const authenticateUser = require('./middlewares/auth.middleware');
const isAdmin = require('./middlewares/isAdmin.middleware');
const { createUsers } = require('./controllers/user.controller')

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/donor', authenticateUser, donorRouter);
app.use('/api/v1/notification', authenticateUser, notificationRouter);
app.use('/api/v1/admin', authenticateUser, isAdmin, adminRouter);
app.use('/api/v1/accessibility', authenticateUser, accessibilityRouter);

//app.use('/api/v1/create', createUsers);  //  http://localhost:4000/api/v1/create for testing and development


app.use("/api/v1/me", authenticateUser, (req, res) => {
    const user = req.user;

    // console.log('Allah hu Akbar')

    return res.status(200).json({
        message: "Authentication successful",
        user: {
            id: user.id,
            email: user.email,
            role: user.role
        }
    })
})


app.use("/api/v1", (req, res) => {
    return res.status(200).json({
        message: "Backend working fine."
    })
}) //  http://localhost:4000/api/v1



module.exports = app;