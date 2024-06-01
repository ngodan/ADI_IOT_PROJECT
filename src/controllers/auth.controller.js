const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserService = require("../services/sequelize/user.service");
const { getSecretKey,getGenerateHash } = require('../services/auth.service');

async function login(req, res) {
    const { user_name, user_password } = req.body;
    try {
        const user = await UserService.getUserByUsername(user_name);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(user_password, user.user_password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ pkid:user.pkid, user_name: user.user_name, user_full_name: user.user_full_name }, getSecretKey(), { expiresIn: '24h' });
        (await UserService.setUserActive({pkid:user.pkid,is_active:true})).success 
        ? res.json({ token:token,user_name:user.user_name,user_full_name:user.user_full_name }) : console.error('Login failed, database is not connect',);
        
    } catch (error) {
        console.error('Login failed', error);
        res.status(500).json({ message: 'Login failed' });
    }
}
async function logout(req, res) {
    const { token } = req.body;
    try {
        jwt.verify(token, getSecretKey(), async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            } else {
                (await UserService.setUserActive({pkid:decoded.pkid,is_active:false})).success 
        ? res.json({ message: 'Logout successful' }) : console.error('Logout failed, database is not connect',);
            }
        });
    } catch (error) {
        console.error('Logout failed', error);
        res.status(500).json({ message: 'Logout failed' });
    }
}
async function verifyToken(req, res) {
    const { token } = req.body;
    try {
        jwt.verify(token, getSecretKey(), async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            } else {
                const currentTime = Math.floor(Date.now() / 1000); 
                if(currentTime >= decoded.exp){
                    return res.status(200).json({ result: false })
                }
                else{
                    return res.status(200).json({ result: true });
                }
            }
        });
    } catch (error) {
        console.error('Verify Token failed', error);
        res.status(500).json({ message: 'Verify Token failed' });
    }
}
module.exports = { login,logout,verifyToken };
