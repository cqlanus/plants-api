const express = require('express')
const router = express.Router()
const categories = require('../lib/data/plantCategoryOptions.json')

router.get('/', async (req, res) => {
    try {
        res.json(categories)
    } catch (err) {
        console.log({ err })
        const { message } = err
        res.status(500).json({ message })
    }
})

module.exports = router
