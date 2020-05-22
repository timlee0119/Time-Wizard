const User = require('../models/User');
const { updateSuccessDayAndFillHistory } = require('../util');

class Connection {
  constructor(pool, socket) {
    this.pool = pool;
    this.socket = socket;

    // User model
    // this.user;
    // Participant model
    // this.me;
    // this.friend_id;

    this.missionId;
    this.userParticipantIndex;

    this.createEvents();
  }

  createEvents() {
    this.socket.on('disconnect', () => {
      delete this.pool[this.socket.id];
      console.log(`Socket #${this.socket.id} is disconnected.`);
      console.log(`connection num: ${Object.keys(this.pool).length}`);
    });

    // tell me who you are, I'll get missionId, userParticipantIndex
    // if first time log in today, update success days and fill in usageHistory data
    this.socket.on('clientInit', async data => {
      console.log('clientInit');
      console.log(data);
      const { userId, currentTime } = data;
      const user = await User.findById(userId).populate('mission').exec();
      this.missionId = user.mission._id;
      this.userParticipantIndex = this.getParticipantIndex(user);

      const dayNum = this.getDayNum(user.mission, currentTime);
      await updateSuccessDayAndFillHistory(user.mission, dayNum);
      console.log('mission after updatec: ', mission);
    });

    this.socket.on('clientUpdate', async data => {
      console.log('clientUpdate');
      console.log(data);

      const { currentTime, usingLimitedWebsite } = data;
      const mission = await Mission.findById(this.missionId);

      // mission is ended
      if (mission.ended) {
        this.socket.emit('missionEnded');
        return;
      }
      // update usage
      const dayNum = this.getDayNum(mission, currentTime);
      const history =
        mission.participants[this.userParticipantIndex].usageHistory;
      // cross day
      if (history[dayNum] === undefined) {
        await updateSuccessDayAndFillHistory(mission, dayNum);
      } else {
        history[dayNum] += Number(usingLimitedWebsite);
        await mission.save();
        await mission.updateBonus(dayNum);
      }

      this.socket.emit('serverUpdate', mission);
    });
  }

  getParticipantIndex(user) {
    if (String(user.mission.participants[0]._user) === String(user._id)) {
      return 0;
    } else {
      return 1;
    }
  }

  getDayNum(mission, currentTime) {
    var s = mission.startTime.getTime();
    var c = new Date(currentTime).getTime();
    return Math.floor((c - s) / (1000 * 3600 * 24));
  }

  updateUsageHistory(mission, dayNum, plus) {
    // if user doesn't log in for over a day, usage history need to be padded with 0
    var userHistory = mission[this.userParticipantIndex].usageHistory;
    var friendHistory =
      mission[(this.userParticipantIndex + 1) % 2].usageHistory;
    for (var i = userHistory.length; i <= dayNum; ++i) {
      if (userHistory[i] === undefined) {
        userHistory[i] = 0;
      }
    }
    for (var i = friendHistory.length; i <= dayNum; ++i) {
      if (friendHistory[i] === undefined) {
        friendHistory[i] = 0;
      }
    }
    userHistory[dayNum] += plus;
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
