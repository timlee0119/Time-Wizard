const mongoose = require('mongoose');
const ParticipantSchema = require('./Participant').schema;

const missionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  days: { type: Number, required: true },
  money: { type: Number, required: true },
  participants: {
    type: [ParticipantSchema],
    validate: [validateParticipants, 'Participants length should be 1 or 2']
  },
  code: {
    type: String,
    default: function () {
      var buf = new Buffer.from(String(this._id));
      return buf.toString('base64');
    }
  },
  startTime: { type: Date }
});

function validateParticipants(val) {
  return val.length >= 1 && val.length <= 2;
}

missionSchema.virtual('endTime').get(function () {
  var endTime = new Date(this.startTime);
  endTime.setDate(this.startTime.getDate() + this.days);
  return endTime;
});

const Mission = mongoose.model('Mission', missionSchema);

module.exports = Mission;
