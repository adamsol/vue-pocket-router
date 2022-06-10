
import { babel } from '@rollup/plugin-babel';
import vue from 'rollup-plugin-vue';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/vue-pocket-router.js',
        format: 'umd',
        name: 'VuePocketRouter',
        globals: {
            'url-pattern': 'UrlPattern',
            'vue': 'Vue',
        },
    },
    plugins: [
        babel({ babelHelpers: 'inline' }),
        vue(),
    ],
    external: [
        'url-pattern',
        'vue',
    ],
};
