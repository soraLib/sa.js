import resolve from 'rollup-plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './src/index.ts',
  output: {
    file: './dist/sa.js',
    format: 'umd',
    name: 'sa'
  },
  plugins: [typescript(), resolve()]
};