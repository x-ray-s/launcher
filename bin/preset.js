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
    await run(install('prettier -D'))
}

export const eslint = async () => {
    await copyFromTemplate('.eslintrc')
    await run(install('eslint -D'))
    await run(install('eslint-config-prettier -D'))
    await run(
        install(
            'eslint-config-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-n -D'
        )
    )
}

export const importSort = async () => {
    await run(install('eslint-plugin-simple-import-sort -D'))
}

export const preinstall = async () => {
    if (!(await ensure('package.json'))) {
        await run('npm init -y')
    }
}

export const tsconfig = async () => {
    await run(install('typescript @tsconfig/node16 -D'))
}

const install = (args) => {
    const type = process.env.PACKAGE_MANAGER
    let v = 'npm i'
    if (type === 'pnpm') {
        v = 'pnpm i'
    } else if (type === 'yarn') {
        v = 'yarn add'
    }
    return v + ' ' + args
}

export const test = () => {
    console.log(process.env.PACKAGE_MANAGER)
}
