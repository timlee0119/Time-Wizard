const mongoose = require('mongoose');
const keys = require('./config/key');
const User = require('./models/User');
const Mission = require('./models/Mission');
const Participant = require('./models/Participant');

mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
