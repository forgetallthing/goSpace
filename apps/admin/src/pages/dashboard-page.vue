<template>
  <div class="dashboard-page">
    <div class="metric-grid">
      <article v-for="item in metrics" :key="item.label" class="metric-card">
        <span>{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
      </article>
    </div>

    <div class="two-column">
      <section class="section-card">
        <h3>最近新增用户</h3>
        <el-table :data="stats.recentUsers" border>
          <el-table-column prop="nickname" label="昵称" />
          <el-table-column prop="openid" label="OpenID" />
          <el-table-column prop="status" label="状态" />
        </el-table>
      </section>

      <section class="section-card">
        <h3>最近爬楼记录</h3>
        <el-table :data="stats.recentRecords" border>
          <el-table-column prop="meters" label="米数" />
          <el-table-column prop="floors" label="楼层" />
          <el-table-column prop="source" label="来源" />
        </el-table>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { fetchDashboardStats } from '../api/dashboard';

const stats = reactive({
  totalUsers: 0,
  activeUsers: 0,
  totalRecords: 0,
  medalConfigs: 0,
  enabledMedals: 0,
  unlockedMedals: 0,
  totalFloors: 0,
  totalMeters: 0,
  recentUsers: [] as Array<Record<string, unknown>>,
  recentRecords: [] as Array<Record<string, unknown>>,
});

const metrics = computed(() => [
  { label: '用户总数', value: stats.totalUsers },
  { label: '活跃用户', value: stats.activeUsers },
  { label: '累计记录', value: stats.totalRecords },
  { label: '累计楼层', value: stats.totalFloors },
  { label: '累计米数', value: stats.totalMeters },
  { label: '已解锁勋章', value: stats.unlockedMedals },
]);

onMounted(async () => {
  Object.assign(stats, await fetchDashboardStats());
});
</script>

<style scoped>
.dashboard-page {
  display: grid;
  gap: 20px;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 16px;
}

.metric-card,
.section-card {
  border: 1px solid var(--admin-border);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.78);
  padding: 18px;
}

.metric-card span {
  display: block;
  color: var(--admin-subtle);
  margin-bottom: 8px;
}

.metric-card strong {
  font-size: 30px;
}

.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.section-card h3 {
  margin: 0 0 16px;
}

@media (max-width: 1200px) {
  .metric-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .two-column {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .metric-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>