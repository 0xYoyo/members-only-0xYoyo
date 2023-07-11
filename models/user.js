const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true, minLength: 4 },
  member: { type: Boolean },
});

UserSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.last_name) {
    fullname = `${this.first_name} ${this.family_name}`;
  }
  return fullname;
});

module.exports = mongoose.model("User", UserSchema);
