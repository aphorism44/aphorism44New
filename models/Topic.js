var mongoose = require('mongoose');

var TopicSchema = new mongoose.Schema({
    text: String
});

mongoose.model('Topic', TopicSchema);