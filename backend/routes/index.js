module.exports = app => {
  require('./authRoutes')(app);
  require('./missionRoutes')(app);
};
