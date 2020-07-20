const fs = require('fs').promises
const path = require('path')
const sample = require('./data/sampleModel')

const normalizeColumn = (name) => {
    const regex1Tuple = [ /(\/|:|<sub>)/g, '_' ]
    const regex2Tuple = [ /(\(|\)|,|°|<\/sub>)/g, '' ]
    return name.toLowerCase()
               .replace(...regex2Tuple)
               .replace(...regex1Tuple)
               .split(' ')
               .join('_')
}

const createColumnMapping = (arrayOfColumns) => {
    return arrayOfColumns.reduce((acc, col) => {
        const normed = normalizeColumn(col)
        return {
            ...acc,
            [normed]: col
        }
    }, {})
}

// const normalize = () => {
//     const cols = Object.keys(sample)
//     const normed = createColumnMapping(cols)
//     console.log({ normed })
// }

const createColumnMappingSeedData = async () => {
    const arrayOfColumns = Object.keys(sample)
    const seedData = arrayOfColumns.map(c => {
        const normed = normalizeColumn(c)
        return { column: normed, display: c }
    })
    const filePath = path.resolve(__dirname, 'data', 'columnSeedData.json')
    await fs.writeFile(filePath, JSON.stringify(seedData))
}
createColumnMappingSeedData()
// module.exports = createColumnMapping
// normalize()

// const createNormedSample = async () => {
//     const arrayOfColumns = Object.keys(sample)
//     const newSample = arrayOfColumns.reduce((acc, col) => {
//         const normed = normalizeColumn(col)
//         return {
//             ...acc,
//             [normed]: 'Sequelize.STRING(1234)'
//         }
//     }, {})
//     const writePath = path.resolve(__dirname, 'data', 'newSample.json')
//     await fs.writeFile(writePath, JSON.stringify(newSample))
// }

// createNormedSample()
