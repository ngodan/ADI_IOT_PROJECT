
const { initializeUserModel } = require('./user.model');

async function initializeModels() {
    try {
        const UserModel = await initializeUserModel();
        return {
            UserModel,
        };
    } catch (error) {
        console.error('Error initializing models:', error);
        throw error;
    }
}

module.exports = { initializeModels };