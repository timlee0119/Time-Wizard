const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  picture: String,
  currentMissionId: { type: Schema.Types.ObjectId, ref: 'Mission' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
