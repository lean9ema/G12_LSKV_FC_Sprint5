const express = require('express'); 
const controllers=require('../controllers/homeControllers')
const router = express.Router();
const path = require('path');

router.get('/', controllers.index);
router.get('/locals', controllers.locals);
router.get('/contact', controllers.contact);

module.exports = router;