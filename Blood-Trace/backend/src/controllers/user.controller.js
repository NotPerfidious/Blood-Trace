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
                email: user.email,
                role: user.role
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
                email: user.email,
                role: user.role
            },
        })

    } catch (error) {

        console.log(`[ERROR at login]: ${error}`)

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

//for testing and development

// const createUsers = async (req, res) => {
//     try {
//         const pakistaniNames = [
//             "Ali Ahmed", "Sara Khan", "Bilal Hussain", "Fatima Zehra", "Hamza Tariq",
//             "Zainab Bibi", "Usman Sheikh", "Aisha Noor", "Omar Farooq", "Mariam Jameel",
//             "Hassan Ali", "Hania Amir", "Mustafa Kamal", "Dua Malik", "Abdullah Shah",
//             "Anaya Bi", "Zaid Qureshi", "Zoya Hassan", "Ibrahim Lodhi", "Mahnoor Baloch",
//             "Junaid Khan", "Alizey Shah", "Faisal Iqbal", "Iman Fatima", "Arsalan Bakht",
//             "Sana Javed", "Hussain Rizvi", "Kiran Mazhar", "Saad Rafique", "Amna Sheikh"
//         ];

//         const users = pakistaniNames.map((name, index) => {
//             const emailPrefix = name.toLowerCase().replace(/\s+/g, '.');
//             return {
//                 email: `${emailPrefix}@example.com`,
//                 password: '123456',
//                 // Logic: index 0 is Admin, everyone else is a User
//                 role: index === 0 ? 'admin' : 'user'
//             };
//         });

//         // Insert everything in one go
//         await User.create(users);

//         return res.status(201).json({
//             message: 'created 29 users and 1 admin'
//         })

//     } catch (error) {
//         console.error(`[SEED ERROR]: ${error.message}`);
//     }
// }


module.exports = {
    registerUser,
    loginUser,
    //createUsers
};