const express = require('express');
const Model = require('../model/model');
const router = express.Router()

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getCustomer/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = {
            name: req.body.name,
            address: req.body.address,
            mobile:req.body.mobile,
            countryCode:req.body.countryCode,
            countryName:req.body.countryName
        };
        const options = { new: false };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(true)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(true)
    }
    catch (error) {
        res.status(400).send(false);
    }
})

//Add Customer
router.post('/addCustomer', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        address: req.body.address,
        mobile:req.body.mobile,
        countryCode:req.body.countryCode,
        countryName:req.body.countryName
    })

    try {
        await data.save();
        res.status(200).send(true)
    }
    catch (error) {
        res.status(400).send(false);
    }
})

module.exports = router;