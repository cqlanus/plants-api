const express = require('express')
const plant = require('../services/plant')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        let { query = {} } = req
        const { complex, q, page } = query
        let resp;
        if (complex) {
            resp = await plant.complexGetAll(JSON.parse(q), page)
        } else {
            const { page, ...restOfQuery } = query
            resp = await plant.getAll(restOfQuery, page)
        }
        res.json(resp)
    } catch (err) {
        console.log({ err })
        const { message } = err
        res.status(500).json({ message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const p = await plant.get(id)
        res.json(p)
    } catch (err) {
        console.log({ err })
        const { message } = err
        res.status(500).json({ message })
    }
})

router.get('/:id/images', async (req, res) => {
    try {
        const { id } = req.params
        const imageUrls = await plant.getPlantImages(id)
        res.json(imageUrls)
    } catch (err) {
        console.log({ err })
        const { message } = err
        res.status(500).json({ message })
    }
})

router.get('/:id/guide', async (req, res) => {
    try {
        const { id } = req.params
        const guide = await plant.getPlantGuide(id)
        res.json(guide)
    } catch (err) {
        console.log({ err })
        const { message } = err
        res.status(500).json({ message })
    }
})

module.exports = router
