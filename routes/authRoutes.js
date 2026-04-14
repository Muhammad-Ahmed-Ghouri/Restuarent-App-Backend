const express = require('express');
const { registerController } = require('../controllers/authControllers');
const router = express.Router();

// routes

// Register || Post
router.post('/register', registerController)

// exports
module.exports = router;