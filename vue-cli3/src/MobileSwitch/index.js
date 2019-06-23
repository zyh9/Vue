import Switchs from './src/index';

/* istanbul ignore next */
Switchs.install = function (Vue) {
  Vue.component(Switchs.name, Switchs);
};

export default Switchs;