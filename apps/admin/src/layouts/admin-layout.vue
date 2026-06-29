<template>
  <el-container class="admin-shell">
    <aside class="sidebar glass-card">
      <div class="brand">
        <div class="brand-mark">G</div>
        <div>
          <p class="brand-title">GoSpace Admin</p>
          <p class="brand-subtitle">可视化管理后台</p>
        </div>
      </div>

      <el-menu :default-active="route.path" router class="menu" background-color="transparent" text-color="#1f2933" active-text-color="#0f766e">
        <el-menu-item index="/dashboard">统计主页</el-menu-item>
        <el-menu-item index="/medals">勋章配置</el-menu-item>
        <el-menu-item index="/users">小程序用户</el-menu-item>
      </el-menu>

      <div class="sidebar-footer">
        <div>
          <p>管理员</p>
          <strong>{{ auth.username || 'su' }}</strong>
        </div>
        <el-button type="primary" plain size="small" @click="handleLogout">退出登录</el-button>
      </div>
    </aside>

    <el-container class="content-wrap">
      <header class="page-header glass-card">
        <div>
          <h1>{{ pageTitle }}</h1>
          <p>后台无需注册，管理员账号固定为 su / su。</p>
        </div>
      </header>

      <main class="content-panel glass-card">
        <router-view />
      </main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAdminAuthStore } from '../stores/auth';

const route = useRoute();
const router = useRouter();
const auth = useAdminAuthStore();

const pageTitle = computed(() => {
  if (route.path.includes('medals')) return '勋章配置';
  if (route.path.includes('users')) return '小程序用户信息';
  return '统计主页';
});

function handleLogout() {
  auth.logout();
  router.push('/login');
}
</script>

<style scoped>
.admin-shell {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  gap: 20px;
}

.sidebar {
  width: 270px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.brand {
  display: flex;
  gap: 14px;
  align-items: center;
}

.brand-mark {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 700;
  background: linear-gradient(135deg, var(--admin-primary), var(--admin-accent));
}

.brand-title,
.brand-subtitle,
.sidebar-footer p,
.page-header p {
  margin: 0;
}

.brand-title {
  font-size: 18px;
  font-weight: 700;
}

.brand-subtitle,
.page-header p,
.sidebar-footer p {
  color: var(--admin-subtle);
}

.menu {
  border-right: none;
  margin-top: 18px;
  background: transparent;
}

.sidebar-footer {
  padding-top: 18px;
  border-top: 1px solid var(--admin-border);
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.content-wrap {
  gap: 16px;
  min-width: 0;
}

.page-header {
  padding: 22px 26px;
}

.page-header h1 {
  margin: 0 0 8px;
  font-size: 28px;
}

.content-panel {
  flex: 1;
  padding: 24px;
}

@media (max-width: 960px) {
  .admin-shell {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }
}
</style>