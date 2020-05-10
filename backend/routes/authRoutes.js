const passport = require('passport');

module.exports = app => {
  app.get(
    '/login/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/login/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/me', (req, res) => {
    res.send(req.user);
  });
};
