const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/User');

router.post('/login', async (request, response) => {
    const username = request.body.name, password = request.body.password;
    console.log(username, password);
    try {
        const user = await User.findOne({username: username})
        console.log(user);
        if(!user){
            return response.status(400).json({error: 'User not found'})
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            return response.status(400).json({error: 'Invalid Password'})
        }
        return response.status(200).json({success: 'Authenticated User'})
    } catch (error) {
        console.error(error)
        return response.status(500).send('Server Error')
    }
})
router.post('/register', async (request, response) => {
    const username = request.body.username, password = request.body.password, id = request.body.id;
    try {
        const prevUser = await User.findOne({username: username})
        if(prevUser){
            return response.status(400).json({error: 'User already exists'})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({username: username, password: hashedPassword, userId: id})
        response.status(200).send(user)
    } catch (error) {
        console.error(error)
        return response.status(500).send('Server Error on Register')
    }
})


module.exports = router