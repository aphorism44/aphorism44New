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

//routers for user auth; using passport to make it easier
//only using login; no registration for my private page
var passport = require('passport');
var User = mongoose.model('User');

router.post('/api/login', function(req, res, next) {
    if(!req.body.username || !req.body.password) {
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    passport.authenticate('local', function(err, user, info){
        if(err){ return next(err); }
        if(user){
            return res.json({token: user.generateJWT()});
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});
    
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

//test updates with curl:
//curl --data 'updateId=1&date=2016-09-01T23:23:50Z&text=test&isVisible=false' http://localhost:3000/updates
//curl http://localhost:3000/updates

module.exports = router;