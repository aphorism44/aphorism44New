var express = require('express');
var router = express.Router();

/* GET needed pages. 
In this app, we only need Express to grab the index page; the rest of the pages
are fetched through the Angular framework, and must be located in the public folder. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

//data routes
var mongoose = require('mongoose');
var Update = mongoose.model('Update');

//get all updates
router.get('/updates', function(req, res, next) {
    Update.find(function(err, updates) {
        if(err) { return next(err); }
        
        res.json(updates);
    });
});

//post an update;
router.post('/updates', function(req, res, next) {
    var update = new Update(req.body);

    //req.updates.push(update);
    update.save(function(err, update) {
        if(err) { return next(err); }

        res.json(update);
    });
});
//test this with:
//curl --data 'updateId=1&date=2016-09-01T23:23:50Z&text=test&isVisible=false' http://localhost:3000/updates
//curl http://localhost:3000/updates
//db.createUser({ user: "access1052", pwd: "melanchton25", roles: [ { role: "readWrite", db: "aphorism44blog" } ] })
/*
//preload an update object by id
router.param('update', function(req, res, next, id) {
    var query = Update.findById(id);

    query.exec(function (err, update){
        if (err) { return next(err); }
    if (!update) { return next(new Error('can\'t find update')); }

    req.update = update;
    return next();
    });
});
//grab single update
router.get('/updates/:updates', function(req, res) {
    res.json(req.post);
});
*/

module.exports = router;