<template>
  <view class="medal-card" :class="{ unlocked: medal.unlocked }" @click="$emit('click', medal)">
    <image v-if="medal.iconImage" class="medal-icon" :src="medal.iconImage" mode="aspectFit" />
    <view v-else class="medal-icon medal-icon-placeholder">{{ medal.starLevel }}★</view>
    <view class="medal-meta">
      <text class="medal-name">{{ medal.name }}</text>
      <text class="medal-desc">{{ medal.description }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  medal: {
    name: string;
    description: string;
    starLevel: 1 | 2 | 3;
    unlocked: boolean;
    iconImage?: string;
  };
}>();

defineEmits<{
  (event: 'click', medal: unknown): void;
}>();
</script>

<style scoped lang="scss">
.medal-card {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 24rpx;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 16rpx 40rpx rgba(15, 23, 42, 0.08);
  margin-bottom: 20rpx;
}

.medal-card.unlocked {
  background: linear-gradient(135deg, rgba(255, 244, 214, 0.98), rgba(255, 255, 255, 0.92));
}

.medal-icon {
  width: 92rpx;
  height: 92rpx;
  border-radius: 50%;
  background: #fff;
  flex: 0 0 92rpx;
}

.medal-icon-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f59e0b;
  font-weight: 700;
}

.medal-meta {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.medal-name {
  font-size: 30rpx;
  font-weight: 700;
}

.medal-desc {
  font-size: 24rpx;
  color: #64748b;
}
</style>