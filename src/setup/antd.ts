import { Form, Input, Row, Col, Spin, Button } from "ant-design-vue";
import { App } from "vue";
export function setupAntd(app: App<Element>) {
  app
    .use(Form)
    .use(Input)
    .use(Row)
    .use(Col)
    .use(Spin)
    .use(Button);
}
