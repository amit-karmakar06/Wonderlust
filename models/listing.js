const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true }
});

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    type: imageSchema,
    default: {
      filename: 'defaultimage',
      url: 'https://unsplash.com/photos/northern-lights-3l3RwQdHRHg'
    }
  },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
