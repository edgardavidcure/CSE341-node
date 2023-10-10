const express = require("express");
const router = express.Router();
const passport = require("passport");

//@desc Auth with google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//@desc LOGIN/Landing Page
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// @desc Logout User
// @route /auth/logout

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
