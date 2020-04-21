import ScrollView from './src/index';

/* istanbul ignore next */
ScrollView.install = function (Vue) {
  Vue.component(ScrollView.name, ScrollView);
};

export default ScrollView;