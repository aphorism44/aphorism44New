var mongoose = require('mongoose');

var EntrySchema = new mongoose.Schema({
    date: Date
    , title: String
    , text: String
    , topics:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }] 
});

mongoose.model('Entry', EntrySchema);