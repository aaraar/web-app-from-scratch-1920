import typescript from "rollup-plugin-typescript";
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import scss from 'rollup-plugin-scss'
import serve from 'rollup-plugin-serve'

export default {
    input: 'src/app.ts',
    output: {
        file: 'docs/js/app.js',
        format: 'iife',
        name: 'bundle',
    },
    plugins: [
        resolve ( {
            main: true,
            browser: true
        } ),
        typescript ( { lib: [ "es5", "es6", "dom" ], target: "es5" } ),
        commonjs (),
        scss ( {
                output: 'docs/css/styles.css'
            }
        ),
        serve ( 'docs' )
    ]
}