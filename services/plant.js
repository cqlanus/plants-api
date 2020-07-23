const { PythonShell } = require('python-shell')
const { Plant } = require('../models')
const parsePdf = require('../lib/parsePdf')

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
        const { plant_guides, plant_guides_text } = plant || {}
        if (plant_guides_text) {
            return plant_guides_text
        } else if (plant_guides) {
            const guides = plant_guides.replace(/^\.{2}/, '')
            const url = `${this.BASE}${guides}`
            const options = {
                args: [url]
            }

            const [text] = await getPythonData('./lib/parse_pdf.py', options)
            const guideText = await parsePdf(text)
            await Plant.update({
                plant_guides_text: guideText
            }, {
                    where: { id },
                })
            return guideText
        }
    }
}

const plant = new PlantService()
module.exports = plant
