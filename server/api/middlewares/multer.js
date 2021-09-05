const multer = require('multer')

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/jpg|jpeg|png|gif$/i)) {
        req.fileValidationError = "Unsupported file";
        return cb(null, false, req.fileValidationError);
      }
      cb(null, true)
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})
  
module.exports = upload