<template>
  <div id="app">
    <router-view class="app-page" />
    <fly-fish />
  </div>
</template>

<script>
import flyFish from '@/components/flyFish/flyFish.vue';
export default {
  components: {
    flyFish,
  },
};
</script>

<style lang="scss">
@import './assets/css/common.scss';
@import './assets/css/variables.scss';
.app-page {
  padding-bottom: 75px;
}
</style>
