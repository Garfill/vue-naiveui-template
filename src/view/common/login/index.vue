<script lang="ts" setup name="Login">
  import { FormInst } from 'naive-ui';
  import { setToken } from '@/utils/token';
  const message = useMessage();
  const router = useRouter();

  const loading = ref(false);
  const form = ref({
    user: 'admin',
    password: '123456',
  });
  const rules = {
    user: {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    password: {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  };
  const formRef = ref<FormInst | null>(null);

  function setLoading(status: boolean) {
    loading.value = status || false;
  }

  async function handleValidate() {
    const [err] = await resolve(formRef.value?.validate());
    if (err) {
      return message.error('请填写账号密码');
    }
    setLoading(true);
    setToken('vue_naive_token');
    setTimeout(() => {
      setLoading(false);
      router.push('/');
    }, 1000);
  }
</script>

<template>
  <div
    v-gradient
    class="login-container">
    <n-space
      vertical
      class="abs-all-center form-container shadow">
      <div class="text-center form-title">
        Vue3 NaiveUI Template
      </div>
      <n-form
        ref="formRef"
        :model="form"
        :rules="rules">
        <n-form-item
          label="用户名"
          path="user">
          <n-input
            v-model:value="form.user"
            placeholder="用户名"></n-input>
        </n-form-item>
        <n-form-item
          label="密码"
          path="password">
          <n-input
            v-model:value="form.password"
            show-password-on="click"
            type="password"
            placeholder="密码"></n-input>
        </n-form-item>
        <n-form-item>
          <n-button
            type="success"
            class="w100p"
            :loading="loading"
            @click="handleValidate">
            登录
          </n-button>
        </n-form-item>
      </n-form>
    </n-space>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  background: rgba(0, 0, 0, .1);
  .form-container {
    width: 50%;
    max-width: 550px;
    padding: 20px;
    border-radius: 10px;
    background: #fff;
    .form-title {
      margin: 20px 0;
      font-size: 30px;
    }
  }
}
</style>