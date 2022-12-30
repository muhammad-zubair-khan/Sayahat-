const express = require('express');
const { signup, signin, signout, allAdmins,deleteUser } = require('../../Controllers/admin/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth');
const { requireSignin } = require('../../common-middleware');
const router = express.Router();


router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);
router.post('/admin/signout', signout)


router.get('/allAdmins', allAdmins)
router.delete('/admin/user/delete/:id',deleteUser)
module.exports = router;