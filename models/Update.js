var mongoose = require('mongoose');

var UpdateSchema = new mongoose.Schema({
    date: Date
    , text: String
    , isVisible: Boolean
});

mongoose.model('Update', UpdateSchema);