const express = require('express')
const plant = require('../services/plant')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const { query } = req
        const resp = await plant.get(query)
        res.json(resp)
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
