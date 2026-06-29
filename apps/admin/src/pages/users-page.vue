<template>
  <div class="page-stack">
    <div class="toolbar">
      <el-input v-model="keyword" placeholder="按昵称、openid 或 unionid 搜索" clearable @keyup.enter="loadData" />
      <el-button type="primary" @click="loadData">查询</el-button>
    </div>

    <el-table :data="rows" border v-loading="loading">
      <el-table-column prop="nickname" label="昵称" />
      <el-table-column prop="openid" label="OpenID" width="240" />
      <el-table-column prop="status" label="状态" width="100" />
      <el-table-column prop="medalCount" label="已解锁勋章" width="120" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchAdminUsers } from '../api/users';

const keyword = ref('');
const loading = ref(false);
const rows = ref<Array<Record<string, unknown>>>([]);

async function loadData() {
  loading.value = true;
  try {
    const result = await fetchAdminUsers({ keyword: keyword.value, page: 1, pageSize: 20 });
    rows.value = result.list;
  } finally {
    loading.value = false;
  }
}

onMounted(loadData);
</script>

<style scoped>
.page-stack {
  display: grid;
  gap: 16px;
}

.toolbar {
  display: flex;
  gap: 12px;
}
</style>