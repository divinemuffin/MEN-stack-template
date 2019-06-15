// file that contains routes (controllers). This is root route.
// will be triggered when we dont have resource (model) in url: http://localhost:3000/

const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index');
})

module.exports = router;