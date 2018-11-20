import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/bundle.js',
    format: 'cjs',
    name: 'ObservePropsDecorator',
		sourcemap: true
	},
	plugins: [
		resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }), // tells Rollup how to find date-fns in node_modules
    commonjs({ // converts date-fns to ES modules
      include: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**'
    })
  ],
  external: ['react', 'react-dom', 'rxjs']
};