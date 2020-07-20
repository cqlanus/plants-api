'use strict';
const parse = require('../lib/parsePlants')

const asyncMap = (values, callback) => {
  return values.reduce(
    (promise, value) => promise.then(() => callback(value)),
    Promise.resolve(),
  )
}

module.exports = {
  up: async (queryInterface, ) => {
    const insertBatch = async (batch) => {
      await queryInterface.bulkInsert('Plants', batch)
    }
    const data = await parse()
    const { length } = data

    const batches = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => {
      const start = (num - 1) / 10
      const end = num / 10
      const startIndex = Math.floor(length * start)
      const endIndex = Math.floor(length * end)
      console.log({ startIndex, endIndex })
      return data.slice(startIndex, endIndex)
    })

    await asyncMap(batches, insertBatch)

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, ) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Plants', null, {})
  }
};
