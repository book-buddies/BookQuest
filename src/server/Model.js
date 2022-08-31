const mongoose = require('mongoose');
const { string } = require('prop-types');
const Schema = mongoose.Schema
const MONGO_URI = 'mongodb+srv://user:123@bookcluster.zyxykxa.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'bookquest'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

//interface
interface BookSchema {
  title: string;
  author: string;
  author_key: string;
  isbn: number;
}

const bookSchema = new Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  author_key: {type: String, required: true},
  isbn: {type: Number, required: true, unique: true}
})

const Book = mongoose.model('book', bookSchema);

module.exports = {
  Book,
}