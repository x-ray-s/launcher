#!/usr/bin/env node
import { exec } from 'child_process'
import { Command } from 'commander'
import enquirer from 'enquirer'
import { stat, copyFile } from 'fs/promises'
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
        const prompt = new enquirer.Confirm({
            name: 'question',
            message: 'Want to add tsconfig?',
        })

        prompt
            .run()
            .then((answer) => {
                console.log(answer)
                if (answer) {
                    exec(
                        'yarn add typescript @tsconfig/node16 -D',
                        (err, stdout, stderr) => {
                            if (err) {
                                console.error(err)
                                return
                            }
                            console.log(stdout)
                            console.error(stderr)
                        }
                    )
                }
            })
            .catch(console.error)
    }
})()
