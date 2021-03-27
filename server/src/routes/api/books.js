import express from 'express'
import mongoose from 'mongoose'
import Book from '../../models/book'
import Page from '../../models/page'

let router = express.Router()

router.get('/', async (req, res) => {
    const books = await Book.find({ user: mongoose.ObjectId(req.user._id) })
    res.json({ status: 'success', data: books })
})

router.post('/', async (req, res) => {
    const book = await new Book(req.body).save()
    res.json({ status: 'success', data: book })
})

router.get('/:id', async (req, res) => {
    const book = await Book.findById(req.params.id)
    res.json({ status: 'success', data: book })
})

router.get('/:id/pages', async (req, res) => {
    const pages = await Page.find({ book: mongoose.ObjectId(req.user._id) })
    res.json({ status: 'success', data: pages })
})

router.post('/:id/pages', async (req, res) => {
    const page = await new Page(req.body).save()
    res.json({ status: 'success', data: page })
})

export default router
