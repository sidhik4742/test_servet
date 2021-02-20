const router = require('express').Router();
const controller = require('../../../libs/controllers/index');
const {
  userSignUpRule,
  userLoginRule,
  userForgetPasswordRule,
  validate,
} = require('../../../libs/middleware/validator');
const {jsonParser} = require('../../../libs/middleware/jsonParser');

const {imageUpload} = require('../../../libs/middleware/fileUpload');

// router.post('/login', (req, res) => {
//   console.log(req.body);
//   res.json({status: 200, msg: 'success'});
// });

router.post('/login', userLoginRule(), validate, controller.userLogin);
router.post(
  '/signup',
  imageUpload,
  jsonParser,
  userSignUpRule(),
  validate,
  controller.userSignup
);

router.post(
  '/forget_password',
  userForgetPasswordRule(),
  validate,
  controller.userForgetPasswrd
);

router.post(
  '/change_password',
  userLoginRule(),
  validate,
  controller.changePassword
);

module.exports = router;
