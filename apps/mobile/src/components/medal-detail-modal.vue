<template>
  <view v-if="visible" class="modal-mask" @click.self="$emit('close')">
    <view class="modal-panel">
      <image v-if="medal.backgroundImage" class="modal-bg" :src="medal.backgroundImage" mode="aspectFill" />
      <view class="modal-content">
        <text class="title">{{ medal.name }}</text>
        <text class="subtitle">{{ medal.starLevel }} 星 · {{ medal.unlockMeters }} 米解锁</text>
        <text class="description">{{ medal.description }}</text>
        <text class="status">{{ medal.unlocked ? '已解锁' : '未解锁' }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean;
  medal: {
    name: string;
    description: string;
    starLevel: 1 | 2 | 3;
    unlockMeters: number;
    unlocked: boolean;
    backgroundImage?: string;
  };
}>();

defineEmits<{
  (event: 'close'): void;
}>();
</script>

<style scoped lang="scss">
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.56);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
}

.modal-panel {
  width: 680rpx;
  overflow: hidden;
  border-radius: 32rpx;
  background: #fff;
}

.modal-bg {
  width: 100%;
  height: 320rpx;
}

.modal-content {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.title {
  font-size: 36rpx;
  font-weight: 800;
}

.subtitle,
.description,
.status {
  font-size: 26rpx;
  color: #475569;
}
</style>