const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const morganBody = require('morgan-body');
const cors = require('cors');
const keys = require('./config/key');
// load passport settings
require('./services/passport');

// connect mongoDB Atlas
mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use(bodyParser.json());
// hook morganBody to express app
morganBody(app);
// localhost only for develop
const whitelist = [keys.extensionOrigin, 'http://localhost:3000'];
const corsOptions = {
  origin: function (origin, cb) {
    if (origin === undefined || whitelist.indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
app.use(cors(corsOptions));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
    sameSite: 'none'
    // secure: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Route handlers
require('./routes')(app);

// socket.io handlers
require('./services/io')(io);

const PORT = process.env.PORT || 5000;
server
  .listen(PORT, () => console.log(`Server started at port ${PORT}`))
  .on('error', e => {
    console.error(`Error happened when binding port: ${e.message}`);
  });
