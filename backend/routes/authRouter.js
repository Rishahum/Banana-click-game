const express = require('express');
const router = express.Router();
const protected = require('../middlewares/protected')
const {registerUser,
    loginUser,
    logout,
    getUserProfile

} = require('../controllers/auth')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logout)
router.get('/profile',  protected, getUserProfile)




module.exports= router;