var mongoose = require('mongoose');

var EntrySchema = new mongoose.Schema({
    date: Date
    , title: String
    , text: String
    , topic:[{[ type: mongoose.Schema.types.ObjectId, ref: 'Topic' ]}] 
});

mongoose.model('Entry', EntrySchema);