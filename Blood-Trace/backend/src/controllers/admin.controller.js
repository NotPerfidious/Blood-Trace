const Donor = require('../models/donor.model');
const Notification = require('../models/notification.model');
const User = require('../models/user.model');

const Colour_Map = {
    'A+': '#ef4444',
    'A-': '#f87171',
    'B+': '#f97316',
    'B-': '#fb923c',
    'AB+': '#8b5cf6',
    'AB-': '#a78bfa',
    'O+': '#3b82f6',
    'O-': '#60a5fa',
};

const getStats = async (req, res) => {
    try {

        const total_donors = await Donor.countDocuments();
        const active_requests = await Notification.countDocuments({ type: 'Requests', hasResponded: false });
        const verified_donors = await Donor.countDocuments({ isAvailable: true });
        const success_rate = total_donors > 0
            ? Math.round((verified_donors / total_donors) * 100) + '%'
            : '0%';

        return res.status(200).json({
            stats: { total_donors, active_requests, verified_donors, success_rate }
        });

    } catch (error) {
        console.log(`[ERROR in getStats]: ${error}`);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

//for graphs
const getBloodDistribution = async (req, res) => {
    try {

        const distribution = await Donor.aggregate([
            { $group: { _id: '$bloodType', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        const result = distribution.map(item => ({
            type: item._id,
            count: item.count,
            color: Colour_Map[item._id] || '#94a3b8'
        }));

        return res.status(200).json({ distribution: result });

    } catch (error) {
        console.log(`[ERROR in getBloodDistribution]: ${error}`);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

//for table
const getDonors = async (req, res) => {
    try {

        const donors = await Donor.find({})
            .select('name bloodType isAvailable contactNumber createdAt')
            .sort({ createdAt: -1 });

        return res.status(200).json({ donors });

    } catch (error) {
        console.log(`[ERROR in getDonors]: ${error}`);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteDonor = async (req, res) => {
    try {

        const donor = await Donor.findByIdAndDelete(req.params.id);

        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }

        return res.status(200).json({ message: 'Donor deleted successfully' });

    } catch (error) {
        console.log(`[ERROR in deleteDonor]: ${error}`);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    try {

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await Donor.findOneAndDelete({ user: req.params.id });

        return res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        console.log(`[ERROR in deleteUser]: ${error}`);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getStats, getBloodDistribution, getDonors, deleteDonor, deleteUser };
