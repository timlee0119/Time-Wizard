const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin');
const { updateSuccessDayAndFillHistory } = require('../util');

module.exports = app => {
  app.get(
    '/login/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account'
    })
  );

  app.get(
    '/login/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/login_success');
    }
  );

  app.get('/logout', (req, res) => {
    req.logout();
    res.send('Logout success!!');
  });

  app.get('/me', requireLogin, async (req, res) => {
    try {
      if (req.user.mission) {
        await req.user.populate('mission').execPopulate();
        if (req.user.mission.ended) {
          await updateSuccessDayAndFillHistory(req.user.mission);
        }
      }
      res.send(req.user);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  });
};
