const express = require('express');
const router = express.Router();
const profile = require('../middlewares/profile');
const getEmail = require('../controllers/getEmail');


router.get('/profile', profile, getEmail)
module.exports = router;