import { resultError, resultSuccess } from "../_utils";

function createFakeUserList() {
  return [
    {
      userId: "1",
      username: "vben",
      realName: "Vben Admin",
      desc: "manager",
      password: "123456",
      token: "fakeToken1",
      role: {
        roleName: "Super Admin",
        value: "super"
      }
    },
    {
      userId: "2",
      username: "test",
      password: "123456",
      realName: "test user",
      desc: "tester",
      token: "fakeToken2",
      role: {
        roleName: "Tester",
        value: "test"
      }
    }
  ];
}
export default [
  {
    url: RegExp("/api/get1.*"),
    method: "post",
    response: ctx => {
      return resultSuccess(ctx);
    }
  },
  {
    url: "/api/login",
    method: "post",
    response: ({ body }) => {
      const { username, password } = body;
      const checkUser = createFakeUserList().find(
        item => item.username === username && password === item.password
      );
      if (!checkUser) {
        return resultError("Incorrect account or password！");
      }
      const {
        userId,
        username: _username,
        token,
        realName,
        desc,
        role
      } = checkUser;
      return resultSuccess({
        role,
        userId,
        username: _username,
        token,
        realName,
        desc
      });
    }
  }
];
