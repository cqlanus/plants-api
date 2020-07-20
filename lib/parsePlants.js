const fs = require('fs')
const path = require('path')
const csv = require('fast-csv')

const NUM_KEYS = [
    'Height at Base Age, Maximum (feet)',
    'Height, Mature (feet)',
    'Frost Free Days, Minimum',
    'pH (Minimum)',
    'pH (Maximum)',
    'Planting Density per Acre, Minimum',
    'Planting Density per Acre, Maximum',
    'Precipitation (Minimum)',
    'Precipitation (Maximum)',
    'Temperature, Minimum (°F)',
    'Seeds per Pound',
]

const parse = () => {
    return new Promise((resolve, reject) => {
        let data = []
        const now = new Date()
        fs.createReadStream(path.resolve(__dirname, 'data', 'plants.csv'))
            .pipe(csv.parse({ headers: true }))
            .on('error', error => reject(error))
            .on('data', row => {
                const newRow = NUM_KEYS.reduce((final, key) => {
                    const existing = final[key]
                    const newVal = Number(existing)
                    return {
                        ...final,
                        [key]: newVal,
                        createdAt: now,
                        updatedAt: now,
                    }
                }, row)
                data.push(newRow)
            })
            .on('end', () => resolve(data))

    })
}

module.exports = parse
