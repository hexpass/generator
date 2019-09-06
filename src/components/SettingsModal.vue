<template>
  <transition name="fade">
    <div class="modal is-active" v-if="active">
      <div class="modal-background" @click="closeModal" />
      <transition name="fadeLeft">
        <div class="modal-card full-screen">
          <header class="modal-card-head">
            <p class="modal-card-title">设置</p>
            <span class="delete" @click="closeModal" />
          </header>
          <section class="modal-card-body">
            <p>
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,
              fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
            </p>
          </section>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
@Component
export default class SettingsModal extends Vue {
  @Prop() private active!: boolean;
  @Prop() private fullScreen!: boolean;

  private closeModal() {
    window.history.back();
    window.history.replaceState(null, '', '/');
    this.$emit('update:active', false);
  }

  @Watch('fullScreen') Modal(isFullScreen: boolean): void {
    this.fullScreen = isFullScreen;
    console.log(this.fullScreen);
  }

  private keyPress(event: KeyboardEvent) {
    // Esc key
    if (this.active && event.keyCode == 27) {
      this.closeModal();
    }
  }

  created() {
    window.addEventListener('keyup', this.keyPress);
  }

  beforeDestroy() {
    window.removeEventListener('keyup', this.keyPress);
  }
}
</script>

<style scoped lang="scss">
.modal-card {
  width: 450px;
  max-height: 100%;
  margin: 0;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border-radius: 0;
  .modal-card-head,
  .modal-card-foot {
    border-radius: 0;
  }
}
@media screen and (max-width: 768px) {
  .full-screen {
    width: 100%;
  }
}
</style>
