
const express = require('express');
const setupRoutes = require('./route.service');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
async function startExpressService() {
    const app = express();
    
    app.use(cors());
    app.use(express.json());
    app.use('/api', setupRoutes());
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = {startExpressService};
