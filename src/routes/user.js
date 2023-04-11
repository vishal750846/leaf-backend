const express = require('express');
const User = require('../models/User')
const bcrypt = require('bcrypt')
const {signup , login } = require("../controllers/user");
// const router = 
const router = new express.Router()

router.post('/api/signup', signup )
router.post('/api/login' , login)




module.exports = router