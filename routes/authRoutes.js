
const express = require('express');
const router = express.Router();


router.post('/login', (req, res) => {
    
    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json({ message: "Please enter Email and Password" });
    }

    
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        
        return res.status(200).json({ 
            message: "Login Successful.", 
            success: true 
        });
    } else {
        
        return res.status(401).json({ 
            message: "Invalid Email or Password!", 
            success: false 
        });
    }
});

module.exports = router;