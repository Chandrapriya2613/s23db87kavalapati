var Rabbit = require('../models/Rabbit');
// List of all Costumes
exports.Rabbit_list = function (req, res) {
    res.send('NOT IMPLEMENTED: Rabbit list');
};
// for a specific Costume.
/*exports.Rabbit_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Rabbit detail: ' + req.params.id);
};*/

exports.Rabbit_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Rabbit.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};

// Handle Costume create on POST.
/*exports.Rabbit_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Rabbit create POST');
};*/
// Handle Costume update form on PUT.
exports.Rabbit_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Rabbit.findById(req.params.id)
        // Do updates of properties
        if (req.body.breed)
            toUpdate.breed = req.body.breed;
        if (req.body.color) toUpdate.color = req.body.color;
        if (req.body.price) toUpdate.price = req.body.price;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
    }
};
// Handle Costume delete form on DELETE.
exports.Rabbit_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Rabbit delete DELETE ' + req.params.id);
};
// Handle Costume update form on PUT.
/*exports.Rabbit_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: Rabbit update PUT' + req.params.id);
};*/
// List of all Costumes
exports.Rabbit_list = async function (req, res) {
    try {
        theRabbit = await Rabbit.find();
        res.send(theRabbit);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// VIEWS
// Handle a show all view
exports.Rabbit_view_all_Page = async function (req, res) {
    try {
        theRabbit = await Rabbit.find();
        res.render('Rabbit', { title: 'Rabbit Search Results', results: theRabbit });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// Handle Costume create on POST.
exports.Rabbit_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Rabbit();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.breed = req.body.breed;
    document.color = req.body.color;
    document.price = req.body.price;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle Costume delete on DELETE.
exports.Rabbit_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await Rabbit.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

// Handle a show one view with id specified by query
exports.Rabbit_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await Rabbit.findById(req.query.id)
        res.render('Rabbitdetail',
            { title: 'Rabbit Detail', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.Rabbit_create_Page = function (req, res) {
    console.log("create view")
    try {
        res.render('RabbitCreate', { title: 'Rabbit Create' });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a costume.
// query provides the id
exports.Rabbit_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await Rabbit.findById(req.query.id)
    res.render('Rabbitupdate', { title: 'Rabbit Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

   // Handle a delete one view with id from query
exports.Rabbit_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await Rabbit.findById(req.query.id)
    res.render('Rabbitdelete', { title: 'Rabbit Delete', toShow:
   result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

