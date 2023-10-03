
const express = require('express');
const router = express.Router();


//API Home Page 
//@route   GET /
router.get('/',  (req, res) => {
 res.send("<h2>Hello, Soccer Sleuther</h2>")
});


module.exports = router ;