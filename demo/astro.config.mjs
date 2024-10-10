// @ts-check
import { defineConfig } from 'astro/config';
import path from "node:path"

// https://astro.build/config
export default defineConfig({
    vite: {
        resolve: {
            // alias: {
            //     'searchable-select': path.resolve('./node_modules/@salvadorsru/searchable-select/dist')
            // }
        }
    }
});
