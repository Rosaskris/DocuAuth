const {Router}=require('express')
const uploadImages = require('../controllers/application')
import multer from 'multer';

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

const router = Router()

router.post('/uploadImages', upload.fields([{ name: 'image1' }, { name: 'image2' }]), uploadImages)

module.exports=router;