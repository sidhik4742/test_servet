const {body, validationResult} = require('express-validator');

module.exports.userSignUpRule = () => {
  return [
    body('firstName')
      .notEmpty()
      .isString()
      .isLength({min: 3})
      .withMessage('Is less than 5 characters'),
    body('lastName')
      .notEmpty()
      .isString()
      .isLength({min: 2})
      .withMessage('Is less than 5 characters'),
    body('password').notEmpty().withMessage('Is less than 3 characters'),
    body('email').notEmpty().isEmail().withMessage('Is not an email'),
    body('phone')
      .notEmpty()
      .isMobilePhone()
      .withMessage('Is not a phone number'),
    body('city').isString().withMessage('Is not an empty value'),
    body('country').isString().withMessage('Is not an empty value'),
    //age must be between 8 to 100
    body('age')
      .notEmpty()
      .isInt({min: 8, max: 100})
      .withMessage('age should be between 8 to 99'),
    body('employeeId').isString().withMessage('Is not an empty value'),
  ];
};

module.exports.userLoginRule = () => {
  return [
    body('email').notEmpty().isEmail().withMessage('Is not an email'),
    body('password').notEmpty().withMessage('must be non empty'),
  ];
};

module.exports.userForgetPasswordRule = () => {
  return [
    body('email').notEmpty().isEmail().withMessage('Is not an email'),
  ];
};



module.exports.validate = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  console.log('validatorError', errors);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({[err.param]: err.msg}));

  return res.json({
    errors: extractedErrors,
  });
};
