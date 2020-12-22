<template>
  <ConfigProvider
    :locale="antConfigLocale"
    :transformCellText="transformCellText"
  >
    <router-view></router-view>
  </ConfigProvider>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ConfigProvider } from "ant-design-vue";
import { useLocal } from "./hooks/web/useLocal";
import { getConfigProvider, initAppConfigStore } from "./setup/App";
export default defineComponent({
  name: "App",
  components: { ConfigProvider },
  setup() {
    initAppConfigStore();
    const { antConfigLocale } = useLocal();
    const { transformCellText } = getConfigProvider();
    return {
      antConfigLocale,
      transformCellText
    };
  }
});
</script>
