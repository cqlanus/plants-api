const { PythonShell } = require('python-shell')
const { Op } = require('sequelize')
const { Plant } = require('../models')
const { parsePdf } = require('../lib/parsePdf')

const getPythonData = (path, options) => {
    return new Promise((resolve, reject) => {
        PythonShell.run(path, options, (err, data) => {
            if (err) { reject(err) }
            resolve(data)
        })
    })
}

const parseComplexQuery = (query) => {
    return Object.entries(query).reduce((final, [k, { op, value }]) => {
        const existingOp = Op[op]
        console.log({ existingOp, Op, op })
        if (existingOp) {
            return {
                ...final,
                [k]: { [existingOp]: value }
            }
        }
        return final
    }, {})
}

const formatQuery = query => {
    const doFirstCap = val => `${val.slice(0, 1).toUpperCase()}${val.slice(1).toLowerCase()}`
    const identity = val => val
    const allLower = val => val.toLowerCase()
    const allUpper = val => val.toUpperCase()
    const config = {
        genus: doFirstCap,
        species: allLower,
        symbol: allUpper,
        common_name: allLower,
    }
    return Object.entries(query).reduce((finalQ, [ key, value ]) => {
        const formatter = config[key] || identity
        const formatted = formatter(value)
        return {
            ...finalQ,
            [key]: formatted
        }
    }, query)
}

class PlantService {
    BASE = 'https://plants.sc.egov.usda.gov'

    get = async (id) => {
        const plant = await Plant.findOne({ where: { id } })
        return plant
    }

    getAll = async (query) => {
        const plants = await Plant.findAll({ where: formatQuery(query) })
        return plants
    }

    complexGetAll = async (complexQuery) => {
        console.log({ complexQuery })
        const query = parseComplexQuery(complexQuery)
        console.log({ query })
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

            const things = await getPythonData('./lib/parse_pdf.py', options)
            console.log({ things })
            const guideText = await parsePdf(things)
            await Plant.update({
                plant_guides_text: guideText
            }, { where: { id }, })
            return guideText
        }
    }
}

const plant = new PlantService()
module.exports = plant
