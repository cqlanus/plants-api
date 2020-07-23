const fs = require('fs').promises
const path = require('path')

const collectParagraphs = paraArray => {
    let recentTitle = null
    return paraArray.reduce((final, curr) => {
        const { title, text } = curr
        if (title) {
            recentTitle = title
            return {
                ...final,
                [title]: { title, paragraphs: [text] }
            }
        } else if (recentTitle) {
            const existing = final[recentTitle]
            if (existing) {
                const paragraphs = [...existing.paragraphs, curr.text]
                return {
                    ...final,
                    [recentTitle]: { ...existing, paragraphs }
                }
            }
        }
        const defacto = 'orphaned'
        recentTitle = defacto
        return {
            ...final,
            [defacto]: { paragraphs: [text] }
        }
    }, {})
}

const parseText = (text) => {
    const regex = /^[\w( ?)]+: /
    const match = text.match(regex)
    if (match) {
        const subtitle = match[0].trim().replace(':', '')
        const index = text.indexOf(match[0]) + match[0].length
        const stuff = text.slice(index)
        return {
            subtitle,
            text: stuff
        }
    }
    return { text }
}

const parsePdf = async () => {
    const ignoreTitles = ['plant guide']
    const text = await fs.readFile(path.resolve(__dirname, 'data', 'sampleText.txt'), { encoding: 'utf-8' })
    const split = text.trim().split('\n \n')
    console.log({ split })
    const parsed = split.map(para => {
        const regex = /^[\w( ?)]+\n/
        const contributedBy = /(Contributed by:).*\n/
        para = para.replace(contributedBy, '')
        const match = para.match(/^(\w* ){1,4}\n/)
        const match2 = para.match(/\n\f[\w ]+\n/)
        const finalMatch = match || match2
        if (finalMatch) {
            const index = para.indexOf(finalMatch[0]) + finalMatch[0].length
            const text = para.slice(index).replace(/\n/g, '')
            const title = finalMatch[0].trim()
            if (title) {
                const shouldIgnore = ignoreTitles.includes(title.toLowerCase())
                return shouldIgnore ? { text: parseText(text) } : { title, text: parseText(text) }
            }
        }
        return { text: parseText(para.replace(/\n/g, '')) }
    })
    const collected = collectParagraphs(parsed)
    console.log({ collected })
    const filePath = path.resolve(__dirname, 'data', 'sampleParsedPdf.json')
    await fs.writeFile(filePath, JSON.stringify(collected))
}

parsePdf()
