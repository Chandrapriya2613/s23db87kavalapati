var express = require('express');
var router = express.Router();



const Rabbit_controlers = require('../controllers/Rabbit');

/* GET costumes */

router.get('/', Rabbit_controlers.Rabbit_view_all_Page);
router.get('/Rabbit/:id', Rabbit_controlers.Rabbit_detail);

const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
    }

module.exports = router;

/* GET detail costume page */
router.get('/detail',secured, Rabbit_controlers.Rabbit_view_one_Page);

/* GET create costume page */
router.get('/create',secured, Rabbit_controlers.Rabbit_create_Page);

/* GET create update page */
router.get('/update',secured, Rabbit_controlers.Rabbit_update_Page);
/* GET delete costume page */
router.get('/delete',secured, Rabbit_controlers.Rabbit_delete_Page);
