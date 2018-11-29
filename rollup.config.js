import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
	{
    input: 'src/main.js',
    output: {
      file: pkg.browser,
      name: 'rapid',
      format: 'umd',
      exports: 'named'
    },
		plugins: [
      resolve(),
      eslint(),
			babel({
        exclude: ['node_modules/**']
			}),
      commonjs(),
      replace({
        exclude: 'node_modules/**',
        ENV: JSON.stringify(process.env.ENV || 'development')
      }),
      (process.env.ENV === 'production' && terser())
		]
	},
	{
		input: 'src/main.js',
    external: [],
    output: [
			{ file: pkg.module, format: 'es', exports: 'named' }
    ],
		plugins: [
      eslint(),
			babel({
				exclude: ['node_modules/**']
      }),
      replace({
        exclude: 'node_modules/**',
        ENV: JSON.stringify(process.env.ENV || 'development')
      }),
      (process.env.ENV === 'production' && terser())
		]
	},
	{
		input: 'src/main.js',
    external: [],
    output: [
      { file: pkg.main, format: 'cjs', exports: 'named' },
    ],
		plugins: [
      eslint(),
			babel({
				exclude: ['node_modules/**']
      }),
      replace({
        exclude: 'node_modules/**',
        ENV: JSON.stringify(process.env.ENV || 'development')
      }),
      (process.env.ENV === 'production' && terser())
		]
	}
];
