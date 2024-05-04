// @ts-check

import themes from 'daisyui/src/theming/themes';
import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            maxWidth: {
                '8xl': '90rem',
            },
        },
    },
    daisyui: {
        themes: [
            {
                light: {
                    ...themes['light'],
                    primary: '#14b8a6', // teal-500
                    secondary: '#a514b8',

                    '--rounded-btn': '0.75rem',
                    '--btn-text-case': 'capitalize',
                    'primary-content': '#1f2937',
                },
            },
            {
                dark: {
                    ...themes['dark'],
                    primary: '#14b8a6',
                    secondary: '#a514b8',

                    '--rounded-btn': '0.75rem',
                    '--btn-text-case': 'capitalize',
                },
            },
        ],
    },
    plugins: [require('daisyui')],
};

export default config;
