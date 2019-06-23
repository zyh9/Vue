import Modal from './src/index';

/* istanbul ignore next */
Modal.install = function (Vue) {
  Vue.component(Modal.name, Modal);
};

export default Modal;