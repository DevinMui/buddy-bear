import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import Book from '../../models/book'
import Page from '../../models/page'

let router = express.Router()

const upload = multer({ dest: 'uploads/' })

router.get('/search', async (req, res) => {})

router.get('/', async (req, res, next) => {
    try {
        const books = await Book.find({ user: mongoose.ObjectId(req.user._id) })
        res.json({ status: 'success', data: books })
    } catch (e) {
        next(e)
    }
})

// multipart/form-data
router.post('/', upload.array('audio'), async (req, res, next) => {
    try {
        let body = req.body
        body.audio.files = req.files
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
        const pages = await Page.find({ book: mongoose.ObjectId(req.user._id) })
        res.json({ status: 'success', data: pages })
    } catch (e) {
        next(e)
    }
})

// multipart/form-data
router.post('/:id/pages', upload.single('audio'), async (req, res, next) => {
    try {
        const file = req.file.path
        let body = req.body
        body.text.file = file
        const page = await new Page(body).save()
        res.json({ status: 'success', data: page })
    } catch (e) {
        next(e)
    }
})

export default router
