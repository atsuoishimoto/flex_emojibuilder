import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import UniqueId from "vue-unique-id";

//https://stackoverflow.com/a/54731059

import Vue from "vue";
import App from "./App.vue";

Vue.use(UniqueId);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
