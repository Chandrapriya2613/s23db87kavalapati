var Rabbit = require('../models/Rabbit');
// List of all Costumes
exports.Rabbit_list = function (req, res) {
    res.send('NOT IMPLEMENTED: Rabbit list');
};
// for a specific Costume.
exports.Rabbit_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Rabbit detail: ' + req.params.id);
};
// Handle Costume create on POST.
exports.Rabbit_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Rabbit create POST');
};
// Handle Costume delete form on DELETE.
exports.Rabbit_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Rabbit delete DELETE ' + req.params.id);
};
// Handle Costume update form on PUT.
exports.Rabbit_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: Rabbit update PUT' + req.params.id);
};
// List of all Costumes
exports.Rabbit_list = async function(req, res) {
    try{
    theRabbit = await Rabbit.find();
    res.send(theRabbit);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };
   // VIEWS
// Handle a show all view
exports.Rabbit_view_all_Page = async function(req, res) {
    try{
    theRabbit = await Rabbit.find();
    res.render('Rabbit', { title: 'Rabbit Search Results', results: theRabbit });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };
   // Handle Costume create on POST.
exports.Rabbit_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Rabbit();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.breed = req.body.breed;
    document.color = req.body.color;
    document.price = req.body.price;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };