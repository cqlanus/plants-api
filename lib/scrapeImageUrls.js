const jsdom = require("jsdom")
const { JSDOM } = jsdom
const fetch = require('node-fetch')
const base = 'https://plants.sc.egov.usda.gov'

const request = async (path) => {
  const resp = await fetch(path)
  const text = await resp.text()
  return text
}

const scrapeImageUrls = async symbol => {
  const url = `${base}/core/profile?symbol=${symbol}`
  const html = await request(url)
  const dom = new JSDOM(html)
  const { document } = dom.window
  const nodes = [...document.querySelectorAll('#slider1_container img')]
  const imageUrls = nodes
    .map(i => `${base}${i.src}`)
    .filter(s => s.toLowerCase().includes('standard'))
  return imageUrls
}

module.exports = scrapeImageUrls

// const main = () => {
//   const [symbol] = process.argv.slice(2)
//   scrapeImageUrls(symbol)
// }
// main()
