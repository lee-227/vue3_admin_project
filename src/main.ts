import { createApp } from "vue";
import App from "./App.vue";
import { setupMock } from "./setup/mock";
import router, { setupRouter } from "./router";
import { setupStore } from "./store";
import { setupI18n } from "./setup/i18n";
import { setupAntd } from "./setup/antd";
import { setApp } from "./setup/App";

const app = createApp(App);

//设置模拟数据
process.env.VUE_APP_USE_MOCK && setupMock();
setupAntd(app);
setupI18n(app);
setupRouter(app);
setupStore(app);
router.isReady().then(() => {
  app.mount("#app");
});
setApp(app);
