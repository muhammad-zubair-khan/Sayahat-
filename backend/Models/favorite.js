const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  packageId: {
    type: String,
    required: true,
  },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;