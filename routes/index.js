var express = require('express');
var router = express.Router();

/* GET needed pages. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});


module.exports = router;

