import Suspend from './src/index';

/* istanbul ignore next */
Suspend.install = function (Vue) {
  Vue.component(Suspend.name, Suspend);
};

export default Suspend;