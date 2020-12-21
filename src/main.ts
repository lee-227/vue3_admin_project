import { createApp } from "vue";
import App from "./App.vue";
import { setupMock } from "./setup/mock";
import { setupRouter } from "./router";
import { setupStore } from "./store";
import { setupI18n } from "./setup/i18n";

const app = createApp(App);

//设置模拟数据
process.env.VUE_APP_USE_MOCK && setupMock();
setupRouter(app);
setupStore(app);
setupI18n(app);
app.mount("#app");
