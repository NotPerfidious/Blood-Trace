const Router = require('express');
const { getStats, getBloodDistribution, getDonors, deleteDonor, deleteUser } = require('../controllers/admin.controller');

const router = new Router();

router.route('/stats').get(getStats);

router.route('/blood-distribution').get(getBloodDistribution);

router.route('/donors').get(getDonors);

router.route('/donor/:id').delete(deleteDonor);

router.route('/user/:id').delete(deleteUser);

module.exports = router;
