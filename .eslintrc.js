module.exports = {
    extends: [
        'next/core-web-vitals',
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: true,
    },
    plugins: ['@typescript-eslint', 'simple-import-sort'],
    rules: {
        'linebreak-style': ['error', 'unix'],
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        quotes: ['error', 'single', { avoidEscape: true }],
        'react/display-name': 'off',
        'react/jsx-filename-extension': [
            'warn',
            { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        ],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        semi: ['error', 'always'],
        '@typescript-eslint/no-explicit-any': [
            'warn',
            { ignoreRestArgs: true },
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-floating-promises': 'warn',
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    // `react` related packages come first
                    ['^react', '^@?\\w'],
                    // Internal packages
                    ['^(@|components)(/.*|$)'],
                    // Side effect imports
                    ['^\\u0000'],
                    // Parent imports. Put `..` last
                    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                    // Other relative imports. Put same-folder imports and `.` last
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                    // Style imports
                    ['^.+\\.?(css)$'],
                ],
            },
        ],
        'simple-import-sort/exports': 'error',
    },
};
