import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        coverage: { include: ['src/**/*.ts', 'src/**/*.tsx'] },
        include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    },
    resolve: {
        alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
    },
});
