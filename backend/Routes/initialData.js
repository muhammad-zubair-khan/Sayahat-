const express = require('express');
const { initialData } = require('../Controllers/initialData')
// const { requireLogin, isAdminAccess } = require('../middleware/auth');
const router = express.Router();

router.post('/initialdata' ,initialData);


module.exports = router
