const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

 app.get('/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    console.log("User after callback:", req.user); // Debug
    res.redirect('http://localhost:4000');
  }
);

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:4000');
  });

  app.get('/api/current-user', (req, res) => {
    console.log(req.user);
    console.log("=====");
    res.send(req.user);
  });
};