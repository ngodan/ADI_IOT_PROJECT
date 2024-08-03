const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const { broadcastNewData } = require("./socket.service")
const { exchangeData } = require('./data/broker.data.service')
const PORT = process.env.BROKER_PORT || 1883;

async function startBrokerMQTTService() {
    server.listen(PORT, function () {
        console.log('Aedes MQTT broker listening on port:', PORT);
    });
    aedes.on('client', function (client) {
        console.log('Client Connected:', client.id);
    });
    aedes.on('publish', async function (packet, client) {
        if (client) {
            console.log('Message from client:', client.id);
            if (packet.topic === "DATA") {
                let data = await exchangeData(JSON.parse(packet.payload.toString()).sensorDatas)
                broadcastNewData(data,client.id)
            }
        }
    });
    aedes.on('subscribe', function (subscriptions, client) {
        if (client) {
            console.log('Subscribe from', client.id, 'to', subscriptions.map(s => s.topic).join(', '));
        }
    });
    aedes.on('clientDisconnect', function (client) {
        console.log('Client Disconnected:', client.id);
    });
    
}
module.exports = {startBrokerMQTTService};






