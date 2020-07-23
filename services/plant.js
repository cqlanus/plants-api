const { Plant } = require('../models')
const { PythonShell } = require('python-shell')

const getPythonData = (path, options) => {
    return new Promise((resolve, reject) => {
        PythonShell.run(path, options, (err, data) => {
            if (err) { reject(err) }
            resolve(data)
        })
    })
}

class PlantService {
    BASE = 'https://plants.sc.egov.usda.gov'
    get = async (query) => {
        const plants = await Plant.findAll({ where: query })
        return plants
    }

    getPlantGuide = async (id) => {
        const plant = await Plant.findOne({ where: { id } })
        const { plant_guides } = plant || {}
        if (plant_guides) {
            const guides = plant_guides.replace(/^\.{2}/, '')
            const url = `${this.BASE}${guides}`
            const options = {
                args: [url]
            }

            const data = await getPythonData('./lib/parse_pdf.py', options)
            return data
        }
    }
}

const plant = new PlantService()
module.exports = plant
