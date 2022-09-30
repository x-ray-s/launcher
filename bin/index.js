#!/usr/bin/env node
import { Command } from 'commander'

import {
    defaultConfig,
    eslint,
    git,
    importSort,
    prettier,
    tsconfig,
} from './preset.js'

// const config = {
//     editorconfig: true,
//     prettier: true,
//     eslint: true,
//     sort: false,
//     git: false,
//     tsconfig: false,
// };
;(async function () {
    try {
        const program = new Command()
        program
            .option('--prettier')
            .option('--editorconfig')
            .option('--eslint')
            .option('--git')
            .option('--tsconfig')
            .option('--sort')

        program.parse(process.argv)
        const options = program.opts()
        if (options.prettier) {
            await prettier()
        } else if (options.editorconfig) {
            await defaultConfig()
        } else if (options.eslint) {
            await eslint()
        } else if (options.git) {
            await git()
        } else if (options.tsconfig) {
            await tsconfig()
        } else if (options.sort) {
            await importSort()
        } else {
            await defaultConfig()
            await prettier()
            await eslint()
        }
    } catch (e) {}
})()
