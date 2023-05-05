const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const phoneBookEntrySchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String
  });

  module.exports = PhoneBook = mongoose.model("pheneBook", phoneBookEntrySchema);
