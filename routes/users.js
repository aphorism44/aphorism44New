var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
require('../models/User');
require('../config/passport');
var User = mongoose.model('User');
router.use(passport.initialize());

//routers for user auth; using passport to make it easier
//only using login; no registration for my private page
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

module.exports = router;