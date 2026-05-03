/**
 * Database Configuration
 * Handles the connection to MongoDB using Mongoose with error handling and logging.
 */
const mongoose = require('mongoose');

const connectDB = async () => {
    try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\nMongoDB connected ${connectionInstance.connection.host}`);

    } catch (error) {

        console.log(`[EXCEPTION]: MongoDB connection failed. ${error}`);
        process.exit(1);

    }
}

module.exports = connectDB;