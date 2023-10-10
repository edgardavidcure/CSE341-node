const { check, validationResult } = require("express-validator");

const commentValidation = [
  check("content", "content cannot be empty").not().isEmpty(),
  check("rate", "rate cannot be empty").not().isEmpty(),
];

// const userValidation = [
//   check("oauthProvider", "oauth provider cannot be empty").not().isEmpty(),
//   check("oauthId", "oauthId cannot be empty").not().isEmpty(),
//   check("displayName", "display name cannot be empty").not().isEmpty(),
//   check("email", "email cannot be empty")
//     .isEmail()
//     .normalizeEmail({ gmail_remove_dots: true }),
//   check("username", "username cannot be empty").not().isEmpty(),
// ];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = { commentValidation, validate };
