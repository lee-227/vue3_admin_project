import { createApp } from "vue";
import App from "./App.vue";
import { setupMock } from "./setup/mock";

const app = createApp(App);

//设置模拟数据
process.env.VUE_APP_USE_MOCK && setupMock();

app.mount("#app");
