const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireNoMission = require('../middlewares/requireNoMission');
const Mission = require('../models/Mission');

module.exports = app => {
  app.post('/missions', requireLogin, requireNoMission, async (req, res) => {
    const { name, days, limitTime, money, limitedWebsites } = req.body;
    const mission = new Mission({
      name,
      days,
      money: money * 2, // two participants contributes money
      participants: [
        {
          _user: req.user.id,
          owner: true,
          limitedWebsites,
          limitTime
        }
      ]
    });

    try {
      req.user.mission = mission._id;
      await mission.save();
      await req.user.save();
      res.send(req.user);
    } catch (error) {
      res.status(400).send(error);
    }
  });
};
