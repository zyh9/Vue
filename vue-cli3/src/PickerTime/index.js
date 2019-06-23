import PickerTime from './src/index';

/* istanbul ignore next */
PickerTime.install = function (Vue) {
  Vue.component(PickerTime.name, PickerTime);
};

export default PickerTime;