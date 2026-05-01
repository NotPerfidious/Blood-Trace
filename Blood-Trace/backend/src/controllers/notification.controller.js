const Notification = require('../models/notification.model');
const Donor = require('../models/donor.model');

const getNotifications = async (req, res) => {

    try {

        const notifications = await Notification.find({ recipient: req.user.id })
            .populate('sender', 'email')  
            .sort({ createdAt: -1 }); // newest first

        return res.status(200).json({
            message: "Notifications fetched successfully",
            notifications
        });

    } catch (error) {
        console.log(`[ERROR in getNotifications]: Internal server error. ${error}`);
        return res.status(500).json({
            message: "Internal server error"
        });
    }

}

const markAsRead = async (req, res) => {

    try {

        const notification = await Notification.findOneAndUpdate(
            { _id: req.params.id, recipient: req.user.id, isRead: false },
            { isRead: true },
            { returnDocument: 'after' } // return the newly updated object
        );

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found / Already marked"
            });
        }

        return res.status(200).json({
            message: "Notification marked as read"
        });

    } catch (error) {
        console.log(`[ERROR in markAsRead]: Internal server error. ${error}`);
        return res.status(500).json({
            message: "Internal server error"
        });
    }

}

const markAllAsRead = async (req, res) => {

    try {

        await Notification.updateMany(
            { recipient: req.user.id, isRead: false },
            { isRead: true }
        );

        return res.status(200).json({
            message: "All notifications marked as read"
        });

    } catch (error) {
        console.log(`[ERROR in markAllAsRead]: Internal server error. ${error}`);
        return res.status(500).json({
            message: "Internal server error"
        });
    }

}

const deleteNotification = async (req, res) => {

    try {

        const notification = await Notification.findOneAndDelete(
            { _id: req.params.id, recipient: req.user.id }
        );

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }

        return res.status(200).json({
            message: "Notification deleted successfully"
        });

    } catch (error) {
        console.log(`[ERROR in deleteNotification]: Internal server error. ${error}`);
        return res.status(500).json({
            message: "Internal server error"
        });
    }

}

const respondToNotification = async (req, res) => {

    try {

        const { message } = req.body;

        if (!message || message.trim().length === 0) {
            return res.status(400).json({
                message: "Response message is required"
            });
        }

        const notification = await Notification.findOneAndUpdate(
            { _id: req.params.id, recipient: req.user.id },
            { responseMessage: message.trim(), hasResponded: true, isRead: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }

        // Sending a message creates another Notification
        if (notification.sender) {
            await Notification.create({
                recipient: notification.sender,
                sender: req.user.id,
                type: 'Info',
                title: 'Response to Your Blood Request',
                description: message.trim(),
                response: false,
            });
        }

        return res.status(200).json({
            message: "Response sent successfully"
        });

    } catch (error) {
        console.log(`[ERROR in respondToNotification]: Internal server error. ${error}`);
        return res.status(500).json({
            message: "Internal server error"
        });
    }

}

const sendDirectRequest = async (req, res) => {
    try {

        const donor = await Donor.findById(req.params.donorId);

        if (!donor) {
            return res.status(404).json({ message: "Donor not found" });
        }

        // Myself
        if (donor.user.toString() === req.user.id) {
            return res.status(400).json({ message: "You cannot send a request to yourself" });
        }

        const { location } = req.body;

        await Notification.create({
            recipient: donor.user,
            sender: req.user.id,
            type: 'Requests',
            title: 'Blood Donation Request',
            description: 'Someone has requested your blood donation assistance. Please respond if you are available.',
            response: true,
            ...(location && { location }),
        });

        return res.status(201).json({ message: "Request sent successfully" });

    } catch (error) {
        console.log(`[ERROR in sendDirectRequest]: Internal server error. ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const sendEmergencyAlert = async (req, res) => {
    try {

        const { donorUserIds, location } = req.body;

        if (!donorUserIds || donorUserIds.length === 0) {
            return res.status(400).json({ message: "No donors to notify" });
        }

        const uniqueRecipients = [...new Set(donorUserIds)].filter(id => id.toString() !== req.user.id);

        if (uniqueRecipients.length === 0) {
            return res.status(400).json({ message: "No valid donors to notify" });
        }

        const notifications = uniqueRecipients.map(userId => ({
            recipient: userId,
            sender: req.user.id,
            type: 'Emergency',
            title: 'Urgent Blood Request',
            description: 'An emergency blood donation is needed in your area. Please respond immediately if you are available to donate.',
            response: false,
            ...(location && { location }),
        }));

        await Notification.insertMany(notifications);

        return res.status(201).json({
            message: `Emergency alert sent to ${uniqueRecipients.length} donors`
        });

    } catch (error) {
        console.log(`[ERROR in sendEmergencyAlert]: Internal server error. ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { getNotifications, markAsRead, markAllAsRead, deleteNotification, respondToNotification, sendDirectRequest, sendEmergencyAlert };