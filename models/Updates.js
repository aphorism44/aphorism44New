
var mongoose = require('mongoose');

module.exports = mongoose.model('Update', {
    date: String
    , text: String
});