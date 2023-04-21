const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { petModel } = require('../models/pet.model');
const { adminauthenticator } = require('../middlewares/authenticator');

const adminRouter = express.Router();

adminRouter.post('/login',async (req, res) => {
    const data = req.body;
    if(!data.email || !data.password){
        return res.send('please provide email and password');
    }
    try {
        let response = await fetch('https://reqres.in/api/login',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        });
        if(response.ok){
            response = await response.json();
            console.log(response);
            let users = await fetch('https://reqres.in/api/users');
            users = await users.json();
            const user = users.data.filter(elem => elem.email == data.email)[0];
            console.log(user);
            const token = jwt.sign(user,process.env.key);
            res.send({msg:'login successful', token});
        }
        else{
            response = await response.json();
            console.log(response);
            res.send(response);
        }
    }
    catch (error) {
        console.log(error);
    }
})

adminRouter.get('/alldata',adminauthenticator, async (req, res) => {
    const data = await petModel.find();
    res.send(data);
})

adminRouter.delete('/delete/:id',async (req, res) => {
    const id = req.params.id;
    const pet = await petModel.find({id});
    if(!pet.length){
        return res.send({msg:'invalid per id'});
    }
    await petModel.findByIdAndDelete(pet[0]._id);
    res.send({msg:'pet deleted'});
})

adminRouter.patch('/update/:id', async (req, res) => {
    const update = req.body;
    const id = req.params.id;
    const pet = await petModel.find({id});
    if(!pet.length){
        return res.send({msg:'invalid per id'});
    }
    await petModel.findByIdAndUpdate(pet[0]._id, update);
    res.send({msg:'pet updated'});
})

module.exports = {
    adminRouter
}