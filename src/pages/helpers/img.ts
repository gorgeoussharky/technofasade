/* eslint-disable @typescript-eslint/no-var-requires */
import { parse } from 'path'

interface FileFormat {
    base?: string
    webp?: string
    avif?: string
}

const img = (
    src: object,
    block: { fn: (arg: { base: string; webp: string | undefined; avif: string | undefined }) => () => void }
) => {
    const srcName = src.toString()
    const { name, ext, dir } = parse(srcName)

    const file: FileFormat = {}

    if (!src) {
        return ''
    }

    // this is so idiotic
    switch (ext) {
        case '.jpg':
            file.base = require(`../../assets/img/${dir ? `${dir}/${name}` : `${name}`}.jpg`) as string
            file.webp = require(`../../assets/img/${dir ? `${dir}/${name}` : `${name}`}.jpg?as=webp`) as string
            file.avif = require(`../../assets/img/${dir ? `${dir}/${name}` : `${name}`}.jpg?as=avif`) as string
            break
        case '.png':
            file.base = require(`../../assets/img/${dir ? `${dir}/${name}` : `${name}`}.png`) as string
            file.webp = require(`../../assets/img/${dir ? `${dir}/${name}` : `${name}`}.png?as=webp`) as string
            file.avif = require(`../../assets/img/${dir ? `${dir}/${name}` : `${name}`}.png?as=avif`) as string
            break
        case '.svg':
            file.base = require(`../../assets/img/${dir ? `${dir}/${name}` : `${name}`}.svg`) as string
            break
        default:
            if (typeof src === 'string') {
                file.base = src
            }
            file.base = src.toString()
            
            break
    }

    const { base, webp, avif } = file

    return block.fn({ base, webp, avif })
}

export default img
