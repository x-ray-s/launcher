#!/usr/bin/env node
import { exec } from 'child_process'
import { Command } from 'commander'
import enquirer from 'enquirer'
import { stat, copyFile, readFile, writeFile } from 'fs/promises'
import _ from 'lodash'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const files = ['.editorconfig', '.prettierrc', '.gitignore', '.eslintrc.js']

async function copy(filename) {
    const src = path.resolve(__dirname, `../${filename}`)
    const state = await stat(src).catch((e) => {
        return null
    })
    if (state) {
        const target = path.resolve(process.cwd(), `./${filename}`)
        await copyFile(src, target)
        return true
    }
    return false
}

function removeLF(content) {
    return content.replace(/\n\s+\n/gm, '\n')
}

async function render(filename, options = {}) {
    const src = path.resolve(__dirname, `../${filename}`)
    const state = await stat(src).catch((e) => {
        return null
    })
    if (state) {
        const target = path.resolve(
            process.cwd(),
            `./${filename.replace(/^__|__$/g, '')}`
        )
        const content = await readFile(src)
        const source = _.template(content)(options)
        await writeFile(target, removeLF(source))
        return true
    }
    return false
}
const run = (command) => {
    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(stdout)
        console.error(stderr)
    })
}
;(async function () {
    const program = new Command()
    program.option('-c --confirm')

    program.parse(process.argv)
    const options = program.opts()
    console.log(options)
    const iteration = files.map((file) => {
        return copy(file)
    })
    await Promise.all(iteration)
    console.log('copy finished')
    console.log('all be done')
    if (options.confirm) {
        try {
            const response = await enquirer.prompt([
                {
                    type: 'confirm',
                    name: 'ts',
                    message: 'Want to add tsconfig?',
                },
                {
                    type: 'confirm',
                    name: 'jest',
                    message: 'Want to add jest',
                },
            ])
            if (response.ts) {
                run('yarn add typescript @tsconfig/node16 -D')

                await render('__tsconfig.json__', {
                    test: response.jest,
                })
            }
            if (response.jest) {
                run('yarn add jest ts-jest @types/jest -D')
                await copy('jest.config.js')
                if (response.ts) {
                    await copy('tsconfig.build.json')
                }
            }
        } catch (e) {}
    }
})()
