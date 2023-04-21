const express = require('express');
const { petModel } = require('../models/pet.model');

const petRouter = express.Router();

petRouter.get('/alldata', async (req, res) => {
    const data = await petModel.find();
    res.send(data);
})

petRouter.post('/register',async (req, res) => {
    const {name, age, place, gender} = req.body;
    if(!name || !age || !place || !gender){
        return res.send({msg:'Please provide name, age, place and gender'});
    }
    const data = {
        name, age, place, gender
    }
    const pets = await petModel.find();
    data.id = pets.length+1;
    const pet = new petModel(data);
    await pet.save();
    res.send({msg:'Pet registered'});
})

module.exports = {
    petRouter
}