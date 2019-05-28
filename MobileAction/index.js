import Actions from './src/index';

/* istanbul ignore next */
Actions.install = function (Vue) {
  Vue.component(Actions.name, Actions);
};

export default Actions;