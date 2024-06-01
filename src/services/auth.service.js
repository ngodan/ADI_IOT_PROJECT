require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
function getSecretKey(){
    return process.env.SECRET_KEY;
}
async function getGenerateHash(input){
    const salt = await bcrypt.genSalt(10);
    return hashedPassword = await bcrypt.hash(input, salt);
}
module.exports = { getGenerateHash,getSecretKey }