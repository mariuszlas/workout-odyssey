// @ts-check

/** @type {import("prettier").Config} */
module.exports = {
    arrowParens: 'avoid',
    bracketSameLine: false,
    bracketSpacing: true,
    printWidth: 80,
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'es5',
    useTabs: false,
    plugins: ['prettier-plugin-tailwindcss'],
    tailwindFunctions: ['cn'],
};
