const User = require('../models/User');

class Connection {
  constructor(pool, socket) {
    this.pool = pool;
    this.socket = socket;
    this.user;
    this.friend_id;
    this.createEvents();
  }

  createEvents() {
    this.socket.on('disconnect', () => {
      delete this.pool[this.socket.id];
      console.log(`Socket #${this.socket.id} is disconnected.`);
      console.log(`connection num: ${Object.keys(this.pool).length}`);
    });

    this.socket.on('clientUpdate', data => {
      console.log(data);
      const { timestamp, usingLimitedWebsite } = data;
    });
  }
}

module.exports = io => {
  const connectionPool = {};
  io.on('connection', socket => {
    // socket.emit('news', { hello: 'world' });
    // socket.on('my other event', data => {
    //   console.log(data);
    // });
    const connection = new Connection(connectionPool, socket);
    connectionPool[socket.id] = connection;
    console.log(`Socket #${socket.id} is connected`);
    console.log(`connection num :${Object.keys(connectionPool).length}`);
  });
};
