const {userLogin, userSignup} = require('./index');
const {
  findUser,
  insertUser,
  updatePassword,
} = require('../../libs/Db/userAuth');
const {mailService} = require('../helpers/mailService');

module.exports.userLogin = async (req, res) => {
  try {
    console.log(req.body);
    let result = await findUser(req.body);
    if (result.logged) {
      return res.json({
        status: 200,
        msg: result.msg,
      });
    } else {
      return res.json({
        status: 409,
        msg: result.msg,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.userSignup = async (req, res) => {
  try {
    // let originalPath = req.files[0].split('/');
    console.log(req.locals);
    console.log('Enter the router');
    // console.log(req.body);
    req.body.imageUrl = req.locals;

    let result = await findUser(req.body);
    if (result.logged) {
      return res.json({
        status: 409,
        msg: 'User with the same email already exists',
      });
    } else {
      let result = await insertUser(req.body);
      console.log(result.ops);
      return res.json({
        status: 200,
        msg: 'User register successfully',
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.userForgetPasswrd = async (req, res) => {
  try {
    console.log('Enter the forget password router' + req.body.email);

    let result = await mailService(req.body.email);
    if (result.status) {
      res.json({status: 200, msg: result.msg});
    } else {
      res.json({status: 409, msg: 'something went wrong'});
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    console.log('Enter the forget password router' + JSON.stringify(req.body));

    let result = await updatePassword(req.body);
    if (result.status) {
      res.json({status: 200, msg: result.msg});
    } else {
      res.json({status: 409, msg: result.msg});
    }
  } catch (error) {
    console.log(error);
  }
};
