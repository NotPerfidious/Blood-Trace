const {registerDonor, isUserDonor, getDonors, updateDonorProfile} = require('../controllers/donor.controller');
const Router = require('express');

const router = new Router();

router.route('/register').post(registerDonor);
router.route('/check').get(isUserDonor);
router.route('/search').get(getDonors);
router.route('/update').put(updateDonorProfile);

module.exports = router;