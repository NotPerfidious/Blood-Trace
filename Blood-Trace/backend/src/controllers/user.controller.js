const User = require('../models/user.model');


const registerUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({
            message: "All fields are required"
        });

        const existing = await User.findOne({ email: email.toLowerCase() });

        if (existing) return res.status(400).json({
            message: "This email is already in use"
        });

        const user = await User.create({
            email: email.toLowerCase(),
            password: password
        })

        const accessToken = user.getAccessToken();

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            signed: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        return res.status(201).json({
            message: "Registration successful",
            user: {
                id: user._id,
                email: user.email
            },
        });


    } catch (error) {
        console.log(`[ERROR]: Internal server error. ${error}`);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}



const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({
            message: "All fields are required"
        });

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) return res.status(400).json({
            message: "User not found"
        });

        const isMatch = await user.comparePassword(password);

        if (!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        })

        const accessToken = user.getAccessToken();

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            signed: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
        })

    } catch (error) {

        console.log(`[ERROR at login]: ${error}`)

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


module.exports = {
    registerUser,
    loginUser
};