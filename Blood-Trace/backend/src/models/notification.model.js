const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
    {
        recipient: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: null       
        },

        location: {
            type: [Number],     
            default: null
        },

        type: {
            type: String,
            required: true,
            enum: ['Emergency','Requests','Info'],
        },

        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true
        },

        isRead: {
            type: Boolean,
            default: false

        },

        response: {
            type: Boolean,
            default: false

        },

        responseMessage: {
            type: String,

        },

        hasResponded: {
            type: Boolean,
            default: false

        },
    },
    {
        timestamps: true
    }
);


const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;