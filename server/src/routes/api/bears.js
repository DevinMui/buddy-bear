import express from 'express'
import multer from 'multer'
import crypto from 'crypto'
import mime from 'mime-types'
import Bear from '../../models/bear'

let router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)

            cb(null, `${raw.toString('hex')}.${mime.extension(file.mimetype)}`)
        })
    },
})

const upload = multer({ storage: storage })

router.post('/', async (req, res) => {
    const bear = await new Bear(req.body).save()
    res.json({ status: 'success', data: bear })
})

router.get('/:id', async (req, res) => {
    const bear = await Bear.findById(req.params.id)
    res.json({ status: 'success', data: bear })
})

router.post('/ocr', upload.single('file'), async (req, res) => {
    const file = req.file.path
    const texts = await detectText(file)
    res.json({ status: 'success', data: texts })
})

// im laz5
async function detectText(fileName) {
    const vision = require('@google-cloud/vision')

    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename: './service-account.json',
    })

    // Performs text detection on the local file
    const [result] = await client.textDetection(fileName)
    const detections = result.textAnnotations
    return detections
}

export default router
