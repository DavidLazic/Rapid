import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
	// browser-friendly UMD build
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
			babel({
				exclude: ['node_modules/**']
			}),
			commonjs()
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// the `targets` option which can specify `dest` and `format`)
	{
		input: 'src/main.js',
    external: [],
    output: [
      { file: pkg.main, format: 'cjs', exports: 'named' },
			{ file: pkg.module, format: 'es', exports: 'named' }
    ],
		plugins: [
			babel({
				exclude: ['node_modules/**']
			})
		]
	}
];
