function fidoAuth(req, res, next) {
  if (!req.user.fidoAuth) return res.status(401).send("Access denied.");
  console.log(req.user.fidoAuth);
  next();
}

module.exports = fidoAuth;
