const WebSocket = require('ws');
const PORT = process.env.SOCKET_PORT || 3001;
const wss = new WebSocket.Server({ port: PORT });

async function startSocketService() {
    wss.on('connection', function connection(ws) {
        console.log('Client connected to WebSocket.');
    
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
        });
    
        ws.on('close', function () {
            console.log('Client disconnected');
        });
    });
}



function broadcastNewData(data) {
    const jsonData = JSON.stringify({
        event: 'data_beltway_mqtt',
        data: data
    });
    
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(jsonData);
        }
    });
}
module.exports = {broadcastNewData,startSocketService}

