const passport = require('passport');
const extensionOrigin = require('../config/key').extensionOrigin;

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
      // res.redirect(`${extensionOrigin}/index.html`);
      res.redirect('/login_success');
    }
  );

  app.get('/logout', (req, res) => {
    req.logout();
    res.send('Logout success!!');
  });

  app.get('/me', (req, res) => {
    console.log(req.user);
    res.send(req.user);
  });
};
