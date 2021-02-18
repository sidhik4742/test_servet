const router = require('express').Router();
const controller = require('../../../libs/controllers/index');

// router.post('/login', (req, res) => {
//   console.log(req.body);
//   res.json({status: 200, msg: 'success'});
// });

router.post('/login', controller.userLogin);

module.exports = router;
