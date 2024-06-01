let { initializeDbContext } = require('./src/services/database.service');
const { startExpressService } = require('./src/services/express.service');
const { startBrokerMQTTService } = require('./src/services/broker.service');
const { startSocketService } = require('./src/services/socket.service');
async function start() {
    try {
        await startBrokerMQTTService();
        await initializeDbContext();
        await startExpressService();
        await startSocketService();
        
    } catch (error) {
        console.error('Error starting application:', error);
    }
}

start();