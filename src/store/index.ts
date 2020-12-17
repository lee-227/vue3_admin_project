import { createStore } from "vuex";
import { App } from "vue";

const store = createStore({
  strict: true
});
export function setupStore(app: App<Element>) {
  app.use(store);
}
export default store;
