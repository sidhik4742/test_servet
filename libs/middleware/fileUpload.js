const multer = require('multer');
const path = require('path');

const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + path.join('../../../microService/public/images/'));
  },
  filename: function (req, file, callback) {
    let imageUrl = file.fieldname + Date.now() + '.jpg';
    req.locals = '/images/' + imageUrl;
    callback(null, imageUrl);
  },
});

module.exports.imageUpload = multer({storage: storage1}).any();
