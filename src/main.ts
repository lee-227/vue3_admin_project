import { createApp } from "vue";
import App from "./App.vue";
import { setupMock } from "./setup/mock";
import { setupRouter } from "./router";
import { setupStore } from "./store";

const app = createApp(App);

//设置模拟数据
process.env.VUE_APP_USE_MOCK && setupMock();
setupRouter(app);
setupStore(app);
app.mount("#app");
