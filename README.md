# Front End code style quick start

## Feature

- a preset `.gitignore` for the Front End.
- use `.editorconfig` for **end of line** and **indent**.
- use `.prettierrc.js` for fomarting.
- use `.eslintrc.js` for catching bugs.
- `eslint-config-prettier` to disable all formatting-related ESLint rules.
- (Optional) `eslint-plugin-prettier`, run `prettier` rule as individual ESLint issues. [Notes](https://prettier.io/docs/en/integrating-with-linters.html)

## Purpose

reduce the time that spend on initial project and share the same config in multiple project.

## Includes

- ts support - `tsconfig.json`
- compiler path - `tsconfig.paths.json`
- browser list - `.browserlistrc` share config for front-end tools.
- babel config - `.babelrc`
- postcss - `postcss.config.js`
- tailwindcss - `tailwind.config.js`
- commit lint - `` husky commitlint lintstaged

## Dependencies

```

npm install --save-dev typescript @typescript-eslint/parser
npm i --save-dev @typescript-eslint/eslint-plugin eslint-import-resolver-typescript
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
