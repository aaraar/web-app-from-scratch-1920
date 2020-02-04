import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import scss from 'rollup-plugin-scss'

export default {
    input: 'src/app.js',
    output: {
        file: 'docs/js/app.js',
        format: 'iife',
        name: 'bundle',
    },
    plugins: [
        resolve({
            main: true,
            browser: true
        }),
        commonjs(),
        scss({
            output: 'docs/css/styles.css'}
        ) // will output compiled styles to bundle.css
    ]
}