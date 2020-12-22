import { resultError, resultSuccess, getParams } from "../_utils";

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
const fakeCodeList: any = {
  "1": ["1000", "3000", "5000"],

  "2": ["2000", "4000", "6000"]
};
export default [
  {
    url: "/api/login",
    method: "post",
    response: ({ body }) => {
      const { username, password } = JSON.parse(body);
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
  },
  {
    url: RegExp("/api/getUserInfoById" + ".*"),
    method: "get",
    response: ({ url }) => {
      const { userId } = getParams<{ userId: string }>(url);
      const checkUser = createFakeUserList().find(
        item => item.userId === userId
      );
      if (!checkUser) {
        return resultError(
          "The corresponding user information was not obtained!"
        );
      }
      return resultSuccess(checkUser);
    }
  },
  {
    url: "/api/getPermCodeByUserId",
    method: "get",
    response: ({ query }) => {
      const { userId } = query;
      if (!userId) {
        return resultError("userId is not null!");
      }
      const codeList = fakeCodeList[userId];

      return resultSuccess(codeList);
    }
  }
];
