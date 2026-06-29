<template>
  <view class="page">
    <view class="hero">
      <text class="headline">{{ stairStore.homeData?.userSummary.totalMeters ?? 0 }} 米</text>
      <text class="subhead">{{ stairStore.homeData?.userSummary.totalFloors ?? 0 }} 层累计爬楼</text>
    </view>

    <view class="section">
      <view class="section-header">
        <text class="section-title">勋章墙</text>
        <text class="section-desc">向上攀登，持续收集</text>
      </view>
      <medal-card
        v-for="medal in stairStore.homeData?.medalWall ?? []"
        :key="medal.medalId"
        :medal="medal"
        @click="openMedalDetail"
      />
    </view>

    <medal-detail-modal
      :visible="Boolean(selectedMedal)"
      :medal="selectedMedal ?? fallbackMedal"
      @close="selectedMedal = null"
    />
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchStairHome } from '../../api/stair';
import MedalCard from '../../components/medal-card.vue';
import MedalDetailModal from '../../components/medal-detail-modal.vue';
import { ensureLoggedIn } from '../../utils/auth';
import { useStairStore } from '../../store/stair';

const stairStore = useStairStore();
const selectedMedal = ref<any | null>(null);

const fallbackMedal = {
  name: '暂无勋章',
  description: '先完成一次记录吧',
  starLevel: 1 as const,
  unlockMeters: 0,
  unlocked: false,
};

function openMedalDetail(medal: any) {
  selectedMedal.value = medal;
}

onMounted(async () => {
  await ensureLoggedIn();
  const homeData = await fetchStairHome();
  stairStore.setHomeData(homeData);
});
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  padding: 32rpx;
}

.hero {
  padding: 40rpx 32rpx;
  border-radius: 36rpx;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.94), rgba(30, 64, 175, 0.86));
  color: #fff;
  margin-bottom: 28rpx;
}

.headline {
  display: block;
  font-size: 68rpx;
  font-weight: 900;
}

.subhead {
  display: block;
  margin-top: 12rpx;
  font-size: 28rpx;
  opacity: 0.88;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 34rpx;
  font-weight: 800;
}

.section-desc {
  font-size: 24rpx;
  color: #64748b;
}
</style>