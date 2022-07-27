
import { babel } from '@rollup/plugin-babel';
import vue from 'rollup-plugin-vue';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/vue-pocket-router.cjs.js',
            format: 'cjs',
        },
        {
            file: 'dist/vue-pocket-router.esm.js',
            format: 'esm',
        },
        {
            file: 'dist/vue-pocket-router.global.js',
            format: 'iife',
            name: 'VuePocketRouter',
            globals: {
                'url-pattern': 'UrlPattern',
                'vue': 'Vue',
            },
        },
    ],
    plugins: [
        babel({ babelHelpers: 'inline' }),
        vue(),
    ],
    external: [
        'url-pattern',
        'vue',
    ],
};
