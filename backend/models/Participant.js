const mongoose = require('mongoose');
const { Schema } = mongoose;

const participantSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  owner: { type: Boolean, default: false },
  restrictedWebsites: {
    type: [String],
    required: true,
    validate: [
      validateRestrictedWebsites,
      'Please provide at least one restricted website.'
    ]
  },
  allowTime: { type: Number, required: true }, // seconds
  todayUsage: { type: Number, required: true } // seconds
});

function validateRestrictedWebsites(val) {
  return val.length > 0;
}

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;
