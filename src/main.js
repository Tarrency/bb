import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import axios from "axios";
import VueAxios from 'vue-axios'
import moment from 'moment'
import qs from 'qs'
import Chat from 'jwchat';

require('./assets/mock.js')

Vue.use(Chat) // 测试界面的聊天窗口
Vue.use(VueAxios, axios)
    //Vue.prototype.$http = axios;
import "element-ui/lib/theme-chalk/index.css";

console.log(ElementUI);

Vue.config.productionTip = false;
Vue.use(ElementUI)
axios.defaults.baseURL = 'http://39.102.46.180:8081'; // 配置axios请求的地址
// axios.defaults.baseURL = 'http://localhost:8081'; // 配置axios请求的地址
//axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";//这是原有的配置，无法获取数据
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.crossDomain = true;
// axios.defaults.withCredentials = true;

//时间戳格式过滤器
Vue.filter('dateFormat',
    function(dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
        return moment(dateStr).format(pattern);
    })



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");