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
      await mission.save();
      await req.user.updateMissionAndPopulate(mission);
      console.log(req.user);
      res.send(req.user);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  app.patch('/missions', requireLogin, requireNoMission, async (req, res) => {
    const { code, limitTime, limitedWebsites } = req.body;
    const buf = new Buffer.from(code, 'base64');
    const missionId = buf.toString();
    try {
      const mission = await Mission.findById(missionId);
      if (!mission) {
        res.status(404).send();
      } else {
        mission.participants.push({
          _user: req.user.id,
          limitTime,
          limitedWebsites
        });
        await mission.save();
        await req.user.updateMissionAndPopulate(mission);
        res.send(req.user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error });
    }
  });

  app.post('/missions/start', requireLogin, async (req, res) => {
    if (req.user.mission) {
      await req.user.populate('mission').execPopulate();
      req.user.mission.startTime = new Date();
      await req.user.mission.save();
      res.send({ mission: req.user.mission });
    }
  });

  app.get('/missions/result', requireLogin, async (req, res) => {});
};
