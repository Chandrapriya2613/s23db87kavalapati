var express = require('express');
var router = express.Router();



const Rabbit_controlers = require('../controllers/Rabbit');

/* GET costumes */

router.get('/', Rabbit_controlers.Rabbit_view_all_Page);

module.exports = router;

/* GET detail costume page */
router.get('/detail', Rabbit_controlers.Rabbit_view_one_Page);

/* GET create costume page */
router.get('/create', Rabbit_controlers.Rabbit_create_Page);

/* GET create update page */
router.get('/update', Rabbit_controlers.Rabbit_update_Page);
/* GET delete costume page */
router.get('/delete', Rabbit_controlers.Rabbit_delete_Page);
