var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/Update');
var Update = mongoose.model('Update');

//get all updates
router.get('/api/updates', function(req, res, next) {
    Update.find(function(err, updates) {
        if(err) { return next(err); }
        
        res.json(updates);
    });
});

//post an update
router.post('/api/updates', function(req, res, next) {
    var update = new Update(req.body);
    //req.updates.push(update);
    update.save(function(err, update) {
        if(err) { return next(err); }

        res.json(update);
    });
});

//get a single update
router.get('/api/updates/:uId', function(req, res, next) {
    Update.findById(req.params.uId, function(err, update) {
        if (err) res.send(err);
        res.json(update);
    });
});

//delete an update; MAKE SURE to return a "promise"
router.delete('/api/updates/:uId', function(req, res) {
    Update.remove({
        _id : req.params.uId
    }, function(err, update) {
        if (err) res.send(err);
        res.json("");
    });
});

//test updates with curl:
//curl --data 'updateId=1&date=2016-09-01T23:23:50Z&text=test&isVisible=false' http://localhost:3000/updates
//curl http://localhost:3000/updates

module.exports = router;