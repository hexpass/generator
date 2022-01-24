<template>
  <div class="icon">
    <svg viewBox="0 0 24 24" :fill="color">
      <path :d="path" />
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Icon extends Vue {
  @Prop() private path!: string;
  @Prop() private color!: string;
}
</script>

<style scoped>
</style>
