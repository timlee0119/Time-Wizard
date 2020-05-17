const mongoose = require('mongoose');
const { Schema } = mongoose;

const participantSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  owner: { type: Boolean, default: false },
  limitedWebsites: {
    type: [String],
    required: true,
    validate: [
      validateLimitedWebsites,
      'Please provide at least one limited website.'
    ]
  },
  limitTime: { type: Number, required: true }, // seconds
  todayUsage: { type: Number, default: 0 } // seconds
});

function validateLimitedWebsites(val) {
  return val.length > 0;
}

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;
