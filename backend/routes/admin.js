const express = require('express');
const router = express.Router();
const admin = require('../middlewares/admin')
const {getAllUsers} = require('../controllers/adminDashboard')
const {addUser} = require('../controllers/adminDashboard')
const {updateUser} = require('../controllers/adminDashboard')
const {deleteUser} = require('../controllers/adminDashboard')

router.get('/admin',admin, getAllUsers)
router.post('/admin/add',admin, addUser)
router.put('/admin/update',admin, updateUser)
router.delete('/admin/delete',admin, deleteUser)



module.exports= router;