const express = require('express');
const router = express.Router();
const controllers = require("../controllers/dynamicSelection")



router.get("/select",controllers.getSelectTableAttributes)



module.exports = router;