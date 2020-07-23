const collectParagraphs = paraArray => {
    let recentTitle = null
    return paraArray.reduce((final, curr) => {
        const { title, text } = curr
        if (!text.text.trim()) { return final }
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

const serialReplacements = (word, replacements, replaceWith = '') => {
    const finalWord = replacements.reduce((final, rep) => {
        const replaced = final.replace(rep, replaceWith)
        return replaced
    }, word)
    return finalWord
}

const parsePdf = async (text) => {
    const split = text.trim().replace(/\\n/g, '\n').replace(/\n {1,2}\n/g, '\n\n').split('\n\n')
    const parsed = split.map(para => {
        const contributedBy = /(Contributed by:).*\n/
        const plantGuide = /plant guide/i
        const cultivarsTxt = /, improved,? and selected materials \(and \n?area \n?of origin\)/gi
        const replacements = [/^\n/, contributedBy, plantGuide, cultivarsTxt ]
        para = serialReplacements(para, replacements)
        const match = para.match(/^(\w* ){1,4}\n/)
        const match2 = para.match(/\n\f[\w ]+\n/)
        const finalMatch = match || match2
        if (finalMatch) {
            const index = para.indexOf(finalMatch[0]) + finalMatch[0].length
            const text = para.slice(index).replace(/\n/g, '')
            const title = finalMatch[0].trim()
            if (title && title.length > 2 && isNaN(+title)) {
                return { title, text: parseText(text) }
            }
        }
        return { text: parseText(para.replace(/\n/g, '')) }
    })
    const collected = collectParagraphs(parsed)
    return collected
}

module.exports = parsePdf
