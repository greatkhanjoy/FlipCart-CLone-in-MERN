import multer from 'multer'
import path from 'path'
import shortid from 'shortid'

const __dirname = path.resolve()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/public/uploads/'))
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1]
    cb(null, file.originalname + '-' + shortid.generate() + '.' + extension)
  },
})

const upload = multer({ storage })

export { upload }
