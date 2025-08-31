
const express = require('express');
const router = express.Router();

const taskRoutes = require('./taskRoutes');

// Mount route files
router.use('/tasks', taskRoutes);

// if we want to manage multiple api version
// router.use("/" + process.env.API_VERSION + "/tasks", taskRoutes);

module.exports = router;
