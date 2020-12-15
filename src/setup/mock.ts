export function setupMock() {
  process.env.VUE_APP_USE_MOCK && require("../../mock");
}
