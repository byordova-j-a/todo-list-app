<template>
  <div class="input">
    <input :value="value" @input="input" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Input',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    input(event: Event) {
      this.$emit('input', (event.target as HTMLInputElement).value);
    },
  },
});
</script>

<style scoped lang="scss">
.input {
  width: 100%;
  background-color: white;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  display: flex;

  input {
    height: 100%;
    width: 100%;
    font-family: '18vag';
    padding: 0;
    border: 0;
    outline: none;
  }
}

@media #{$desktop-breakpoint} {
  .input {
    height: get-desktop-size(60);
    border-radius: get-desktop-size(20);
    padding: get-desktop-size(10) get-desktop-size(20);

    input {
      font-size: get-desktop-size(30);
    }
  }
}

@media #{$mobile-breakpoint} {
  .input {
    height: get-mobile-size(30);
    border-radius: get-mobile-size(20);
    padding: get-mobile-size(0) get-mobile-size(10);

    input {
      font-size: get-mobile-size(16);
    }
  }
}
</style>
