<template>
  <div id="nav"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import axios from "axios";
export default defineComponent({
  setup() {
    onMounted(() => {
      axios
        .request({
          url: "/api/get",
          method: "get"
        })
        .then(data => {
          console.log(data);
        });
    });
  }
});
</script>
