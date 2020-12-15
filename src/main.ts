import { createApp } from "vue";
import App from "./App.vue";
import { setupMock } from "./setup/mock";

const app = createApp(App);
setupMock();
app.mount("#app");
