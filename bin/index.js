#!/usr/bin/env node

import { stat, copyFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const files = ['.editorconfig', '.prettierrc', '.eslintrc.js']

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

async function render(filename) {}

;(async function () {
    const iteration = files.map((file) => {
        return copy(file)
    })
    await Promise.all(iteration)
    console.log('copy finished')
    console.log('all be done')
})()
