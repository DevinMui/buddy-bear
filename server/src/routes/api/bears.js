import express from 'express'
import Bear from '../../models/bear'

let router = express.Router()

router.post('/', async (req, res) => {
    const bear = await new Bear(req.body).save()
    res.json({ status: 'success', data: bear })
})

router.get('/:id', async (req, res) => {
    const bear = await Bear.findById(req.params.id)
    res.json({ status: 'success', data: bear })
})

export default router
