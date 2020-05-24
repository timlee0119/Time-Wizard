const mongoose = require('mongoose');
const { Schema } = mongoose;

const participantSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  owner: { type: Boolean, default: false },
  name: { type: String, required: true },
  limitedWebsites: {
    type: [String],
    required: true,
    validate: [
      validateLimitedWebsites,
      'Please provide at least one limited website.'
    ]
  },
  limitTime: { type: Number, required: true }, // seconds
  // todayUsage: { type: Number, default: 0 } // seconds
  usageHistory: { type: [Number] },
  successDay: { type: Number, default: 0 },
  bonus: { type: Number, default: 0 }
});

function validateLimitedWebsites(val) {
  return val.length > 0;
}

function getHostname(url) {
  url = url.replace(/\/$/, '');
  return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
}

participantSchema.pre('save', function (next) {
  if (this.isModified('limitedWebsites')) {
    // format limitedWebsites
    for (var i in this.limitedWebsites) {
      this.limitedWebsites[i] = getHostname(this.limitedWebsites[i]);
    }
  }
  next();
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;
