import { merge } from 'webpack-merge'
import { resolve } from 'path'
import type { Configuration } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin'
import { EsbuildPlugin } from 'esbuild-loader'

import baseConfig from '../webpack.config'

const config: Configuration = merge(baseConfig, {
    mode: 'production',
    output: {
        publicPath: process.env.wp_theme ? `/wp-content/themes/${process.env.wp_theme}/` : undefined,
    },
    /* Manage source maps generation process. Refer to https://webpack.js.org/configuration/devtool/#production */
    devtool: false,
    module: {
        rules: [
            // Styles
            {
                test: /\.((c|sa|sc)ss)$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
                exclude: resolve(__dirname, "node_modules"),
            }
        ]
    },
    /* Optimization configuration */
    optimization: {
        minimize: true,
        minimizer: [
            new EsbuildPlugin({
                target: 'es6',
                css: true
            }),
            new ImageMinimizerPlugin({
                test: /\.(jpe?g|png|gif)$/i,
                minimizer: {
                    implementation: ImageMinimizerPlugin.sharpMinify
                },
                generator: [
                    {
                        preset: 'webp',
                        implementation: ImageMinimizerPlugin.sharpGenerate,
                        options: {
                            encodeOptions: {
                                webp: {
                                    quality: 90
                                }
                            }
                        }
                    },
                    {
                        preset: 'avif',
                        implementation: ImageMinimizerPlugin.sharpGenerate,
                        options: {
                            encodeOptions: {
                                avif: {
                                    cqLevel: 33
                                }
                            }
                        }
                    }
                ]
            })
        ]
    },

    /* Performance treshold configuration values */
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },

    /* Additional plugins configuration */
    plugins: [
        new MiniCssExtractPlugin({
            filename: process.env.no_hash === 'true' ? 'assets/css/[name].css' : 'assets/css/[name].[fullhash].css'
        })
    ]
})

export default config
