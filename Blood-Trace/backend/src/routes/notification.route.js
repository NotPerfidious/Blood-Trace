/**
 * Notification Routes
 * Defines API endpoints for retrieving, managing, and responding to notifications,
 * as well as sending direct blood requests and emergency alerts.
 */
const { getNotifications, markAsRead, markAllAsRead, deleteNotification, respondToNotification, sendDirectRequest, sendEmergencyAlert } = require('../controllers/notification.controller');
const Router = require('express');

const router = new Router();

router.route('/').get(getNotifications);
router.route('/read-all').patch(markAllAsRead);      
router.route('/send-request/:donorId').post(sendDirectRequest);  
router.route('/send-emergency').post(sendEmergencyAlert);   
router.route('/:id/read').patch(markAsRead);
router.route('/:id').delete(deleteNotification);
router.route('/:id/respond').post(respondToNotification);

module.exports = router;
