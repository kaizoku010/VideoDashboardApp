const mongoose = require('mongoose');
// const uri = 'mongodb+srv://dev:<j0BOBWvPdNy3XW3a>@schoolcluster.vte6gnc.mongodb.net/';
const videoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  videoPath: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
}
});

const Video = mongoose.model('ads', videoSchema);

module.exports = Video;
const uri_ = "mongodb://atlas-sql-6364ec82b0ad221f6390815e-1oyjt.a.query.mongodb.net/ads?ssl=true&authSource=admin";
