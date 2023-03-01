import { resolve, extname } from 'path'
import { readdirSync } from 'fs'

import HTMLWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackInjectPreload from '@principalstudio/html-webpack-inject-preload'

import environment from '../configuration/webpack.environment'
import data from '../src/pages/data/data.json'

export const fileNameGenerator = (filename: string) => {
    const relPath = filename.split(/[\\/]/)
    relPath.splice(0, 1)
    relPath.splice(-1, 1)
    if (process.env.no_hash === 'true') {
        return `${relPath.join('/')}/[name][ext][query]`
    }
    return `${relPath.join('/')}/[name].[hash][ext][query]`
}


export const pages = () => {
    const allPages = [] as (HTMLWebpackPlugin | HtmlWebpackInjectPreload)[]

    const additionalPages = readdirSync(resolve(__dirname, environment.paths.source, 'pages')).filter(
        file => extname(file).toLowerCase() === '.html' && file.toLowerCase() !== 'index.html'
    )

    const pagesList = additionalPages.map(page => `<li><a target="_blank" href='${page}'>${page}</a></li>`)

    const indexTemplate = `
    <!DOCTYPE html>
    <html lang="ru">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>
            Список страниц
        </title>
    </head>

    <body>
        <h1>Список страниц</h1>
        <ul>${pagesList.join('<hr>')}</ul>
    </body>
    </html>
`

    const index = new HTMLWebpackPlugin({
        inject: true,
        hash: false,
        filename: 'index.html',
        templateContent: indexTemplate,
        favicon: resolve(environment.paths.source, 'assets/img', 'favicon.ico'),
        minify: {
            collapseWhitespace: false,
            keepClosingSlash: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
        }
    })

    allPages.push(index)

    additionalPages.forEach((template) => {
        allPages.push(
            new HTMLWebpackPlugin({
                inject: true,
                hash: false,
                filename: template,
                template: resolve(environment.paths.source, 'pages', template),
                favicon: resolve(environment.paths.source, 'assets/img', 'favicon.ico'),
                templateParameters: {
                    data: data as object
                },
                minify: {
                    collapseWhitespace: false,
                    keepClosingSlash: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true
                }
            })
        )
        allPages.push(
            new HtmlWebpackInjectPreload({
                files: [
                    {
                        match: /.*\.woff2$/,
                        attributes: { as: 'font', type: 'font/woff2', crossorigin: true }
                    }
                ]
            })
        )
    })

    return allPages
}
