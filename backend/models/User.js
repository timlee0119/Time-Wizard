const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  picture: String,
  mission: { type: Schema.Types.ObjectId, ref: 'Mission' }
});

userSchema.methods.updateMissionAndPopulate = async function (mission) {
  const user = this;
  user.mission = mission._id;
  await user.save();
  user.mission = mission;

  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
