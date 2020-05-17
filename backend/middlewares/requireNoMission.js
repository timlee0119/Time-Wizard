module.exports = (req, res, next) => {
  if (req.user.currentMissionId) {
    res.status(409).send({ error: 'You already have a ongoing mission!' });
  }

  next();
};
