import Options from './src/index';

/* istanbul ignore next */
Options.install = function (Vue) {
  Vue.component(Options.name, Options);
};

export default Options;