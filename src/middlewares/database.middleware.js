// dbMiddleware.js
let {initializeDbContext} = require('../services/database.service');

module.exports = function DbContextMiddleware() {
    return async (request, response, next) => {
        await initializeDbContext();
    };
};