/**
 * User Model
 * Defines the Mongoose schema for user accounts, including email, hashed password,
 * and role-based access control. Includes methods for password hashing and JWT generation.
 */
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
// const dotenv = require('dotenv');

// dotenv.config();


const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 6,
            maxLength: 100
        },

        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function () {

    if (!this.isModified("password")) return;

    try {
        this.password = await bcryptjs.hash(this.password, 10)
    } catch (error) {
        throw error;
    }

    return;
});

userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcryptjs.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}

userSchema.methods.getAccessToken = function () {

    const user = { id: this._id, email: this.email, role:this.role };

    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRY || '1h'
    });
}

const User = mongoose.model('User', userSchema);

module.exports = User;