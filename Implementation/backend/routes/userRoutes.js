const express = require('express')
const multer = require("multer")
const path = require('path')
const axios = require("axios")
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  deleteUser
} = require('../controller/userController')
const { protect , userProtect , adminProtect} = require('../middleware/authMiddleware')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: async function (req, file, cb) {
    try {
      const response = await axios.post("http://localhost:8080/api/counter");
      const count = response.data.count;
      const filename = `${count}${path.extname(file.originalname)}`;
      req.filename = filename; 
      cb(null, filename);
    } catch (err) {
      console.error(err);
      cb(err);
    }
  },
});

const upload = multer({ storage: storage });

router.post('/',upload.single("image") ,registerUser)
//router.post('/upload',upload.single("image") , imgUpload)
router.post('/login', loginUser)
router.post('/update',protect, userProtect, updateUser)
router.delete('/',protect, userProtect, deleteUser)
router.get('/me', protect, getMe)
router.get('/', (req, res) => res.send('Hello World!')) 


module.exports = router