import resolve from 'rollup-plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './src/index.ts',
  output: {
    file: './sa.mjs',
    format: 'es',
    name: 'sa'
  },
  plugins: [typescript(), resolve()]
};