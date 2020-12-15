import Mock from "mockjs";
import userMock from "./sys/user";
Mock.setup({
  timeout: "200-1000"
});
userMock.forEach(({ url = "", method = "get", response }) => {
  Mock.mock(url, method, response);
});
