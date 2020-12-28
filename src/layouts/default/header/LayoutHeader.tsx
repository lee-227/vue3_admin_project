import { defineComponent } from "vue";
import { Layout } from "ant-design-vue";
import "./index.less";
export default defineComponent({
  setup() {
    return () => {
      return (
        <Layout.Header class={["layout-header", "flex p-0 px-4 "]}>
          header
        </Layout.Header>
      );
    };
  }
});
