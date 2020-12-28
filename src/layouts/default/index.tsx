import { defineComponent } from "vue";
import { Layout } from "ant-design-vue";
import LayoutHeader from "./header/LayoutHeader";
import LayoutSiderBar from "./sider";
import { registerGlobComp } from '@/components/registerGlobComp';
import "./index.less";
export default defineComponent({
  name: "DefaultLayout",
  setup() {
    registerGlobComp()
    return () => {
      return (
        <Layout class="default-layout">
          <LayoutHeader></LayoutHeader>
          <Layout>
            <LayoutSiderBar></LayoutSiderBar>
            <Layout class="default-layout__main">123</Layout>
          </Layout>
        </Layout>
      );
    };
  }
});
