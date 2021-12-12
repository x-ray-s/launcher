# front end project quick start

## Purpose

reduce the time that spend on initial project and share the same config in multiple project.

## Includes

- git ignore - `.gitignore` copy from [Node.gitignore](https://github.com/github/gitignore/blob/main/Node.gitignore)
- file format - `.editorconfig`, like `end of line` and `indent`
- code formmater - `.prettierrc`
- linter - `.eslintrc.js` and `/eslint` fold
- `eslint-config-prettier` to disable all formatting-related ESLint rules. `eslint-plugin-prettier`, run `prettier` rule as individual ESLint issues.
- ts support - `tsconfig.json`
- compiler path - `tsconfig.paths.json`
- browser list - `.browserlistrc` share config for front-end tools.
- babel config - `.babelrc`
- postcss - `postcss.config.js`
- tailwindcss - `tailwind.config.js`
- commit lint - `` husky commitlint lintstaged

## Dependencies

```
npm install --save-dev eslint prettier
npm install --save-dev eslint-config-prettier
npm install --save-dev typescript @typescript-eslint/parser
npm i --save-dev @typescript-eslint/eslint-plugin
# eslint-config-standard manually install
npm install --save-dev eslint-config-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node
# react
npm install eslint-plugin-react eslint-plugin-react-hooks --save-dev
```

### References

- [handle line ending in Windows](https://docs.github.com/cn/get-started/getting-started-with-git/configuring-git-to-handle-line-endings)
- [EditorConfig properties supported in prettier](https://prettier.io/docs/en/api.html#prettierresolveconfigfilepath--options)
- [ts compiler config](https://www.tslang.cn/docs/handbook/compiler-options.html)
- [ts module resolution](https://www.tslang.cn/docs/handbook/module-resolution.html)
- [tailwind installation](https://tailwindcss.com/docs/guides/create-react-app)
