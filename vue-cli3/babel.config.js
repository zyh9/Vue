module.exports = {
  presets: [
    '@vue/app',
  ],
  //让babel和webpack一样严格区分commonJS文件和ES6文件
  //https://babeljs.io/docs/en/options#misc-options
  sourceType: 'unambiguous'
};
