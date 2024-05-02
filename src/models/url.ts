const mongoose = require('mongoose');
const shortid = require('shortid');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  shortcode: {
    type: String,
    required: true,
    unique: true,
    default: shortid.generate
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Url = mongoose.model('Url', urlSchema);

export default Url;
