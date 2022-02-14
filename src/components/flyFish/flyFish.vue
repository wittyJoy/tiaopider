<template>
  <div id="jsi-flying-fish-container" class="fish_container"></div>
</template>

<script>
import "./flyFish.js";
export default {
  name: "flyFish",
  props: [""],
  data() {
    return {};
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {},
};
</script>
<style scoped>
.fish_container {
  width: 100%;
  position: fixed;
  z-index: 10000;
  bottom: -4px;
  left: 0;
}
</style>