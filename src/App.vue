<template>
  <div id="app">
    <router-view />
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
</style>
