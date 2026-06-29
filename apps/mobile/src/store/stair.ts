import { defineStore } from 'pinia';
import type { StairHomeData } from '@gospace/shared';

interface StairState {
  homeData: StairHomeData | null;
  loading: boolean;
}

export const useStairStore = defineStore('stair', {
  state: (): StairState => ({
    homeData: null,
    loading: false,
  }),
  actions: {
    setHomeData(homeData: StairHomeData) {
      this.homeData = homeData;
    },
  },
});