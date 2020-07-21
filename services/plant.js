const { Plant } = require('../models')

class PlantService {
    get = async (query) => {
        const plants = await Plant.findAll({ where: query })
        return plants
    }
}

const plant = new PlantService()
module.exports = plant
