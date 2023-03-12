const notFound = (req, res) =>
  res.status(404).send("Ops! We couldn't find what you wanted");

module.exports = notFound;
