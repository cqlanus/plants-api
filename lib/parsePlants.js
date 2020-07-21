const fs = require('fs')
const path = require('path')
const csv = require('fast-csv')
const columnMapping = require('./data/columnMapping.json')

const NUM_KEYS = {
    'Height at Base Age, Maximum (feet)': true,
    'Height, Mature (feet)': true,
    'Frost Free Days, Minimum': true,
    'pH (Minimum)': true,
    'pH (Maximum)': true,
    'Planting Density per Acre, Minimum': true,
    'Planting Density per Acre, Maximum': true,
    'Precipitation (Minimum)': true,
    'Precipitation (Maximum)': true,
    'Temperature, Minimum (°F)': true,
    'Seeds per Pound': true,
}

const parse = () => {
    return new Promise((resolve, reject) => {
        let data = []
        const now = new Date()
        fs.createReadStream(path.resolve(__dirname, 'data', 'plants.csv'))
            .pipe(csv.parse({ headers: true }))
            .on('error', error => reject(error))
            .on('data', row => {
                const newRow = Object.entries(row).reduce((final, [key, value]) => {
                    const isNum = NUM_KEYS[key]
                    const newVal = isNum ? Number(value) : value
                    const mappedCol = columnMapping[key]
                    return {
                        ...final,
                        [mappedCol]: newVal,
                        createdAt: now,
                        updatedAt: now,
                    }
                }, {})
                data.push(newRow)
            })
            .on('end', () => resolve(data))

    })
}

module.exports = parse
