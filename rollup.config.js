
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import {terser}  from 'rollup-plugin-terser'
const { preserveShebangs } = require('rollup-plugin-preserve-shebangs');
const pkg = require('./package.json');

export default {
  input: ['./src/bin/index.js','./src/bin/template.js','./src/loader.js'], // 入口文件
  // 指出应将哪些模块视为外部模块，如 Peer dependencies 中的依赖
  output:  {
    format: 'cjs',
    name: pkg.name,
    dir: 'dist', // 动态导入时会分包成多文件
  },
  plugins: [
    // 使得 rollup 支持 commonjs 规范，识别 commonjs 规范的依赖
    preserveShebangs(),
    commonjs(),
    json(),
    process.env.NODE_ENV === 'production'? terser():null, // 压缩js
  ],

};