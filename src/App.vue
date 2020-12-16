<template>
  <div id="nav"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { login } from "./api/sys/user";
export default defineComponent({
  setup() {
    onMounted(async () => {
      const data = await login();
      console.log(data);
    });
  }
});
</script>
