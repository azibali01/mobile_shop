

const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

router.get('/', async (req, res) => {
    try {
    
        const { cnic, emi } = req.query;
        
        
        let filter = {};

        
        if (cnic) {
            filter.cnic = cnic; 


        }

        if (emi) {
            filter.emi = emi; 
        }

        const customers = await Customer.find(filter).sort({ createdAt: -1 });

    

        if (customers.length === 0) {
            return res.status(404).json({ message: "no result found" });
        }

        res.json(customers);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




router.post('/', async (req, res) => {
    const customer = new Customer(req.body);
    try {


        const newCustomer = await customer.save();
        res.status(201).json(newCustomer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});





router.put('/:id', async (req, res) => {

    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCustomer);
    } catch (err) {

        res.status(400).json({ message: err.message });
    }
});




router.delete('/:id', async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.json({ message: 'Customer Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;