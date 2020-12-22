<template>
  <a-form :model="formData" ref="formRef" class="form-box" :rules="formRules">
    <a-form-item name="account">
      <a-input
        size="large"
        v-model:value="formData.account"
        placeholder="username: vben"
      />
    </a-form-item>
    <a-form-item name="password">
      <a-input
        size="large"
        v-model:value="formData.password"
        placeholder="password: 123456"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="submit">
        {{ t("sys.login.loginButton") }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, unref } from "vue";
import { useI18n } from "vue-i18n";
import { userStore } from "../../../store/user";
import { useMessage } from "../../../hooks/web/useMessage";

export default defineComponent({
  setup() {
    const { t } = useI18n();
    const { notification } = useMessage();
    const formRef = ref<any>(null);
    const formData = reactive({
      account: "vben",
      password: "123456"
    });
    const formRules = reactive({
      account: [
        {
          required: true,
          message: t("sys.login.accountPlaceholder"),
          trigger: "blur"
        }
      ],
      password: [
        {
          required: true,
          message: t("sys.login.passwordPlaceholder"),
          trigger: "blur"
        }
      ]
    });
    const submit = async () => {
      const form = unref(formRef);
      if (!form) return;
      const data = await form.validate();
      const userInfo = await userStore.login({
        username: data.account,
        password: data.password
      });
      if (userInfo) {
        notification.success({
          message: t("sys.login.loginSuccessTitle"),
          description: `${t("sys.login.loginSuccessDesc")}:${
            userInfo.realName
          }`,
          duration: 3
        });
      }
    };
    return {
      formData,
      formRef,
      t,
      submit,
      formRules
    };
  }
});
</script>

<style scoped lang="less">
.form-box {
  width: 200px;
}
</style>
