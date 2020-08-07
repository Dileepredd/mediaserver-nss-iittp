const express = require('express');
const router = express.Router();

// Actual Route : /home
// Request Type : GET

router.get('/',(req,res) => {
    // Write backend logic Here
    sample_data = {
        name: "IIT Tirupati"
    }
    res.render('home/home',sample_data);
});

module.exports = router;