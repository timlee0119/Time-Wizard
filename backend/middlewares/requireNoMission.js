module.exports = (req, res, next) => {
  if (req.user.mission) {
    res.status(409).send({ error: 'You already have a ongoing mission!' });
  }

  next();
};
