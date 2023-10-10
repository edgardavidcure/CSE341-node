module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      if (process.env.NODE_ENV === "developer") {
        res.status(401).json("You do not have access");
      } else {
        res.redirect("/");
      }
    }
  },
  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect("/dashboard");
    } else {
      return next();
    }
  },
};
