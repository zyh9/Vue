import LoadingComponent from './Loading.vue'
const loading = {
	install: function(Vue) {
    Vue.component('loading', LoadingComponent)
  }
}
export default loading;