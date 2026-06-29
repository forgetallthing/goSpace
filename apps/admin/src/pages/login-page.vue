<template>
  <div class="login-page">
    <section class="login-hero glass-card">
      <p class="eyebrow">GoSpace Admin</p>
      <h1>爬楼激励可视化后台</h1>
      <p>登录后管理统计概览、勋章配置和小程序用户信息。</p>
      <ul>
        <li>固定管理员账号 su / su</li>
        <li>独立后台 JWT 登录态</li>
        <li>无注册入口</li>
      </ul>
    </section>

    <section class="login-form glass-card">
      <h2>管理员登录</h2>
      <p>请输入预置账号登录。</p>

      <el-form :model="form" label-position="top" @submit.prevent>
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="username" placeholder="su" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" autocomplete="current-password" placeholder="su" show-password />
        </el-form-item>

        <el-button type="primary" class="login-btn" :loading="loading" @click="handleLogin">登录后台</el-button>
      </el-form>

      <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminAuthStore } from '../stores/auth';

const router = useRouter();
const auth = useAdminAuthStore();
const loading = ref(false);
const errorMessage = ref('');
const form = reactive({ username: 'su', password: 'su' });

async function handleLogin() {
  loading.value = true;
  errorMessage.value = '';

  try {
    await auth.login(form.username, form.password);
    router.push('/dashboard');
  } catch (error) {
    errorMessage.value = '登录失败，请确认用户名和密码均为 su。';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.25fr 0.9fr;
  gap: 24px;
  padding: 32px;
  align-items: stretch;
}

.login-hero,
.login-form {
  padding: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-hero {
  color: #0f172a;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0.58)),
    radial-gradient(circle at top right, rgba(15, 118, 110, 0.2), transparent 30%),
    radial-gradient(circle at bottom left, rgba(217, 119, 6, 0.16), transparent 32%);
}

.eyebrow {
  margin: 0 0 12px;
  color: var(--admin-primary);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.login-hero h1 {
  margin: 0;
  font-size: 52px;
  line-height: 1.05;
}

.login-hero p,
.login-hero li,
.login-form p {
  color: var(--admin-subtle);
}

.login-hero ul {
  margin: 24px 0 0;
  padding-left: 18px;
}

.login-form h2 {
  margin: 0;
  font-size: 30px;
}

.login-btn {
  width: 100%;
  margin-top: 10px;
}

.error-text {
  margin-top: 14px;
  color: #b91c1c;
}

@media (max-width: 960px) {
  .login-page {
    grid-template-columns: 1fr;
  }

  .login-hero h1 {
    font-size: 38px;
  }
}
</style>