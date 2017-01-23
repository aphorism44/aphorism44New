var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Update = mongoose.model('Update');

/* GET needed pages. 
In this app, we only need Express to grab the index and error pages; the rest of the pages
are fetched through the Angular framework, and must be located in the public folder. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Index' });
});


//get all updates
router.get('/updates', function(req, res, next) {
    Update.find(function(err, updates) {
        if(err) { return next(err); }
        
        res.json(updates);
    });
});

//post an update
router.post('/updates', function(req, res, next) {
    var update = new Update(req.body);

    //req.updates.push(update);
    update.save(function(err, update) {
        if(err) { return next(err); }

        res.json(update);
    });
});

//delete an update
router.delete('/updates/:uId', function(req, res) {
    Update.remove({
        _id : req.params.uId
    }, function(err, update) {
        if (err) res.send(err);
    });
});

module.exports = router;