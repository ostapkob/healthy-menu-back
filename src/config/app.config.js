const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'downloads')
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + "-" + Date.now())
  }
})

const upload = multer({
  storage: storage
})
module.exports = {
  // HOST: "http://192.168.8.131:3000",
  HOST: "http://127.0.0.1:3000",
  upload: upload
}
