var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var Rabbit_controller = require('../controllers/Rabbit');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a Costume.
router.post('/Rabbit', Rabbit_controller.Rabbit_create_post);
// DELETE request to delete Costume.
router.delete('/Rabbit/:id', Rabbit_controller.Rabbit_delete);
// PUT request to update Costume.
router.put('/Rabbit/:id', Rabbit_controller.Rabbit_update_put);
// GET request for one Costume.
router.get('/Rabbit/:id', Rabbit_controller.Rabbit_detail);
// GET request for list of all Costume items.
router.get('/Rabbit', Rabbit_controller.Rabbit_list);
module.exports = router;