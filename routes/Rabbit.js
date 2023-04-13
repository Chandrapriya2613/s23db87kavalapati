var express = require('express');
var router = express.Router();



const Rabbit_controlers = require('../controllers/Rabbit');

/* GET costumes */

router.get('/', Rabbit_controlers.Rabbit_view_all_Page);

module.exports = router;