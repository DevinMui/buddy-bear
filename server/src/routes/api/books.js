import express from 'express'
import multer from 'multer'
import crypto from 'crypto'
import mime from 'mime-types'
import Book from '../../models/book'
import Page from '../../models/page'

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

router.get('/', async (req, res, next) => {
    try {
        const books = await Book.find({ user: req.user._id })
        res.json({ status: 'success', data: books })
    } catch (e) {
        next(e)
    }
})

// multipart/form-data
router.post('/', upload.array('audio'), async (req, res, next) => {
    try {
        let body = req.body
        if (req.files) body.audio = { files: req.files, mode: 'RECORDED' }
        body.user = req.user._id
        console.log(body)
        const book = await new Book(req.body).save()
        res.json({ status: 'success', data: book })
    } catch (e) {
        next(e)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id)
        res.json({ status: 'success', data: book })
    } catch (e) {
        next(e)
    }
})

router.get('/:id/pages', async (req, res, next) => {
    try {
        const pages = await Page.find({ book: req.user._id })
        res.json({ status: 'success', data: pages })
    } catch (e) {
        next(e)
    }
})

// multipart/form-data
router.post('/:id/pages', upload.single('audio'), async (req, res, next) => {
    try {
        const file = req.file.path
        let body = {text: JSON.parse(req.body.text)}
        body.book = req.params.id
        body.text.file = file
        const page = await new Page(body).save()
        res.json({ status: 'success', data: page })
    } catch (e) {
        next(e)
    }
})

export default router
