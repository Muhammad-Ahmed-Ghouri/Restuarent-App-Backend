const express = require('express');
const { registerController, loginController } = require('../controllers/authControllers');
const router = express.Router();

// routes

// Register || Post
router.post('/register', registerController)

// Register || Login
router.post('/login', loginController)

// exports
module.exports = router;