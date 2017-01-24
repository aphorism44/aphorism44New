var express = require('express')
var router = express.Router();


//file organization: https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers
//and https://www.terlici.com/2014/09/29/express-router.html
//updates api
router.use(require('./updates'));
//user api (logins)
router.use(require('./users'));

/* GET needed pages. 
In this app, we only need Express to grab the index and error pages; the rest of the pages
are fetched through the Angular framework, and must be located in the public folder. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Index' });
});

module.exports = router;

