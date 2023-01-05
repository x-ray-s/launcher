import enquirer from 'enquirer'

import { copyFromTemplate, ensure, run } from './utils.js'

export const git = async () => {
    await copyFromTemplate('.gitignore')
    await run('git init')
}

export const defaultConfig = async () => {
    await copyFromTemplate('.editorconfig')
}

export const prettier = async () => {
    await copyFromTemplate('.prettierrc')
    await run(await install('prettier -D'))
}

export const eslint = async () => {
    await copyFromTemplate('.eslintrc')
    await run(await install('eslint -D'))
    await run(await install('eslint-config-prettier -D'))
    await run(
        await install(
            'eslint-config-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-n -D'
        )
    )
}

export const importSort = async () => {
    await run(await install('eslint-plugin-simple-import-sort -D'))
}

export const preinstall = async () => {
    if (!(await ensure('package.json'))) {
        await run('npm init -y')
    }
}

export const tsconfig = async () => {
    await copyFromTemplate('tsconfig.json')
    await run(await install('typescript @tsconfig/node16 @types/node -D'))
}

const install = async (args) => {
    let type = process.env.PACKAGE_MANAGER
    if (!process.env.PACKAGE_MANAGER) {
        const prompt = new enquirer.Select({
            name: 'package',
            message: 'Pick a package manager',
            choices: ['npm', 'pnpm', 'yarn'],
        })

        const answer = await prompt.run()
        if (answer !== 'npm') {
            type = answer
        }
        process.env.PACKAGE_MANAGER = answer
    }
    let v = 'npm i'
    if (type === 'pnpm') {
        v = 'pnpm i'
    } else if (type === 'yarn') {
        v = 'yarn add'
    }
    return v + ' ' + args
}
