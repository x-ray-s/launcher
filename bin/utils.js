import _ from 'lodash'
import { exec as _exec } from 'node:child_process'
import { copyFile, readFile, stat, writeFile } from 'node:fs/promises'
import util from 'node:util'
import path from 'path'
import { fileURLToPath } from 'url'

const exec = util.promisify(_exec)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ensure = async (file) => (await stat(file)).isFile()

const copy = async (source) => {
    if (await ensure(source)) {
        const name = path.basename(source)
        await copyFile(source, resolveCwd(name))
    }
}

const copyFromTemplate = async (file) => {
    return copy(resolveDir(`../templates/${file}`))
}

const resolveCwd = _.partial(path.resolve, process.cwd())

const resolveDir = _.partial(path.resolve, __dirname)

const run = async (command) => {
    const { stdout, stderr } = await exec(command)
    if (stderr) {
        console.error(stderr)
    }
    if (stdout) {
        console.info(stdout)
    }
}

const removeLF = (content) => content.replace(/\n\s+\n/gm, '\n')

const render = async (file, options) => {
    const src = resolveDir(`../templates/__${file}__`)
    const target = resolveCwd(file)
    const content = await readFile(src)
    const source = _.template(content)(options)
    await writeFile(target, removeLF(source))
}

export { copy, copyFromTemplate, ensure, render, resolveCwd, resolveDir, run }
