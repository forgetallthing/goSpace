<template>
  <view class="page">
    <view class="card">
      <text class="title">登录状态</text>
      <text class="status">{{ authStore.userProfile ? '已登录' : '未登录' }}</text>
    </view>

    <view class="card">
      <text class="title">个人信息</text>
      <text class="line">昵称：{{ profileText.nickname }}</text>
      <text class="line">头像：{{ profileText.avatarUrl }}</text>
      <text class="line">累计米数：{{ profileText.totalMeters }}</text>
      <text class="line">累计勋章：{{ profileText.medalCount }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { fetchUserProfile } from '../../api/user';
import { useAuthStore } from '../../store/auth';
import { ensureLoggedIn } from '../../utils/auth';

const authStore = useAuthStore();

const profileText = computed(() => {
  const profile = authStore.userProfile as any;
  return {
    nickname: profile?.nickname ?? '-',
    avatarUrl: profile?.avatarUrl ?? '-',
    totalMeters: profile?.stairSummary?.totalMeters ?? 0,
    medalCount: profile?.medalCount ?? 0,
  };
});

onMounted(async () => {
  await ensureLoggedIn();
  const result = await fetchUserProfile();
  authStore.setProfile(result);
});
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  padding: 32rpx;
}

.card {
  padding: 28rpx;
  border-radius: 28rpx;
  background: #fff;
  box-shadow: 0 16rpx 40rpx rgba(15, 23, 42, 0.06);
  margin-bottom: 24rpx;
}

.title {
  display: block;
  font-size: 32rpx;
  font-weight: 800;
  margin-bottom: 18rpx;
}

.status,
.line {
  display: block;
  font-size: 26rpx;
  color: #334155;
  margin-bottom: 10rpx;
}
</style>