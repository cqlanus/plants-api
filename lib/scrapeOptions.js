const fs = require('fs').promises
const path = require('path')
const jsdom = require("jsdom")
const { JSDOM } = jsdom
const fetch = require('node-fetch')
const url = 'https://plants.sc.egov.usda.gov/adv_search.html'
const normalizeColumn = require('./normalizedColumns')

const request = async (path) => {
    const resp = await fetch(path)
    const text = await resp.text()
    return text
}

const buildCriteria = (node) => {
    const nextChildren = [...node.children]
    const categoryCharEl = nextChildren.find(c => c.getAttribute('width') === '20%')
    if (!categoryCharEl) { return }
    const categoryCharLink = categoryCharEl.querySelector('a')
    if (!categoryCharLink) { return }
    const selectEl = nextChildren.find(c => c.getAttribute('width') === '40%').querySelector('select')
    if (!selectEl) { return }
    const display = categoryCharLink.textContent.replace(/ {2}/g, '').replace('\n', ' ')
    const categoryChar = {
        key: normalizeColumn(display),
        display,
        name: selectEl.getAttribute('name'),
        options: [...selectEl.querySelectorAll('option')].map(o => ({
            value: o.getAttribute('value'),
            display: o.textContent.trim().replace(/-/g, '')
        }))
    }
    return categoryChar
}

const buildCategory = (node) => {
    const regex = /[0-9]\. /
    const category = node.textContent.trim().replace(regex, '')
    let next = node.parentNode.nextElementSibling
    let isCategory = next.querySelector('td.hdrblkbold')
    let criteria = []
    while (!isCategory) {
        let catChar = buildCriteria(next)
        catChar && criteria.push(catChar)
        next = next.nextElementSibling
        if (!next) { break }
        isCategory = next.querySelector('td.hdrblkbold')
    }
    return { name: category, criteria, length: criteria.length }
}

const getCategories = (html) => {
    const dom = new JSDOM(html)
    const { document } = dom.window
    const cats = [...document.querySelectorAll('td.hdrblkbold')].map(buildCategory)
    return cats
}

const main = async () => {
    const html = await request(url)
    const categories = getCategories(html)
    const filePath = path.resolve(__dirname, 'data', 'plantCategoryOptions.json')
    await fs.writeFile(filePath, JSON.stringify(categories))

}

main()
