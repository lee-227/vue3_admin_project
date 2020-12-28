<template>
  <ConfigProvider
    :locale="antConfigLocale"
    :transformCellText="transformCellText"
  >
    <AppProvider>
      <router-view></router-view>
    </AppProvider>
  </ConfigProvider>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ConfigProvider } from "ant-design-vue";
import { useLocale } from "./hooks/web/useLocale";
import { getConfigProvider, initAppConfigStore } from "./setup/App";
import { AppProvider } from "@/components/Application";
export default defineComponent({
  name: "App",
  components: { ConfigProvider, AppProvider },
  setup() {
    initAppConfigStore();
    const { antConfigLocale } = useLocale();
    const { transformCellText } = getConfigProvider();
    return {
      antConfigLocale,
      transformCellText
    };
  }
});
</script>
