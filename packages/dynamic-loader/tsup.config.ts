import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    webpack: 'src/webpack.type.ts',
  },
  treeshake: true,
  format: ['cjs', 'esm', 'iife'],
  dts: true,
  minify: true,
  sourcemap: true,
  globalName: 'DynamicLoader',
})
