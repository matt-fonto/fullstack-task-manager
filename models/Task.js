const mongoose = require("mongoose");

//Set the structure for your collection
//Since we set up the schema, only these properties will be passed to the database. Everything else will be ignored
const TaskSchema = new mongoose.Schema({
  //it will accept a name, which is a a string
  name: {
    type: String,
    required: [true, "Name must be provided"], //it guarantees that this data is needed and provides a custom message -- if we want
    trim: true, //to remove empty spaces
    maxlength: [20, "Name must be less than 20 characters"], //it guarantees that there is a maxlength
  },
  //it will accept a completed status, which is a boolean
  completed: {
    type: Boolean,
    default: false, //the default value in this case will be false
  },
});

module.exports = mongoose.model("Task", TaskSchema);
