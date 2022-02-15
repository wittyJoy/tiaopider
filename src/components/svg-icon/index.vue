<template>
  <svg class="svg" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    // class: {
    //   type: String,
    //   default: '',
    // },
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`;
    },
    // svgClass() {
    //   if (this.class) {
    //     return `svg ${this.class}`;
    //   } else {
    //     return 'svg';
    //   }
    // },
  },
};
</script>

<style scoped>
.svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
