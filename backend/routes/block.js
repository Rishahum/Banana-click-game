const express = require('express');
const router = express.Router();
const {Blocked} = require('../controllers/block')
const {UnBlocked} = require('../controllers/block')


router.post('/block', Blocked)
router.post('/unblock',UnBlocked)


module.exports= router;