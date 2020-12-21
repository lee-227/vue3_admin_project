const context = require.context("./lang", true, /\.ts$/);
const obj = {};
context.keys().forEach(request => {
  const arr = request.split("/");
  arr.shift();
  arr.reduce((obj: any, key: any) => {
    if (/\.ts$/.test(key)) {
      key = key.replace(/\.ts$/, "");
      obj[key] = context(request).default;
    } else {
      obj[key] = obj[key] || {};
    }
    return obj[key];
  }, obj);
});
export default obj;

export const localeList = [
  {
    text: "简体中文",
    event: "zh_CN"
  },
  {
    text: "English",
    event: "en"
  }
];
