<template>
  <div id="jsi-flying-fish-container" class="container"></div>
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
.container {
  width: 100%;
  position: fixed;
  z-index: 8;
  bottom: -4px;
  left: 0;
}
</style>