#!/usr/bin/env node
import { Command } from 'commander'
import enquirer from 'enquirer'

import { defaultConfig, eslint, git, prettier } from './preset.js'

// const config = {
//     editorconfig: true,
//     prettier: true,
//     eslint: true,
//     sort: false,
//     git: false,
//     tsconfig: false,
// };
;(async function () {
    if (!process.env.PACKAGE_MANAGER) {
        const prompt = new enquirer.Select({
            name: 'package',
            message: 'Pick a package manager',
            choices: ['npm', 'pnpm', 'yarn'],
        })

        const answer = await prompt.run()
        if (answer !== 'npm') {
            process.env.PACKAGE_MANAGER = answer
        }
    }

    const program = new Command()
    program
        .option('--prettier')
        .option('--editorconfig')
        .option('--eslint')
        .option('--git')

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
    } else {
        await defaultConfig()
        await prettier()
        await eslint()
    }
})()
