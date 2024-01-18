const mongoose = require("../MongoDB/databse");
const Schema = mongoose.Schema;

const questionsSchema = new Schema({}, { strict: false });

const Questions = mongoose.model("Questions", questionsSchema);

module.exports = Questions;
