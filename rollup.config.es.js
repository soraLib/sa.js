import resolve from 'rollup-plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './src/index.ts',
  output: {
    file: './sa.mjs',
    format: 'es',
    name: 'sa',
    globals: {
      'lodash-es': 'lodash-es'
    }
  },
  external: ['lodash-es'],
  plugins: [typescript(), resolve()]
};