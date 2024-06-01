const express = require('express');
const userRoutes = require('../routes/user.route');
const roleRoutes = require('../routes/role.router');
const authRoutes = require('../routes/auth.route');

function setupRoutes() {
    const router = express.Router();
    router.use('/users', userRoutes);
    router.use('/roles', roleRoutes);
    router.use('/auth', authRoutes);
    return router;
}

module.exports = setupRoutes;
