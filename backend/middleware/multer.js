import multer from 'multer'

// Store uploaded files temporarily on disk
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage })
export default upload
