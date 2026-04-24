const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user.route');
const donorRouter = require('./routes/donor.route');
const authenticateUser = require('./middlewares/auth.middleware');
const {createUsers} = require('./controllers/user.controller')

const app = express();

app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json({ limit: "16kb" })); // allows server to read json bodies

app.use(express.urlencoded({ extended: true, limit: "16kb" })); // reads url parameters



app.use('/api/v1/user', userRouter); //  http://localhost:4000/api/v1/user
app.use('/api/v1/donor', donorRouter); //  http://localhost:4000/api/v1/donor

app.use('/api/v1/create', createUsers);  //  http://localhost:4000/api/v1/create


app.use("/api/v1/me", authenticateUser, (req, res) => {
    const user = req.user;

    // console.log('Allah hu Akbar')

    return res.status(200).json({
        message: "Authentication successful",
        user
    })
})


app.use("/api/v1", (req, res) => {
    return res.status(200).json({
        message: "Backend working fine."
    })
}) //  http://localhost:4000/api/v1



module.exports = app;