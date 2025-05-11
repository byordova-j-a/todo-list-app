<template>
  <div @click="click" class="button" :class="buttonClass">{{ text }}</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { EColor } from '~/types';

export default Vue.extend({
  name: 'Button',
  props: {
    color: {
      type: String as PropType<EColor>,
      required: true,
      validator: (value: EColor) => {
        return Object.values(EColor).includes(value);
      },
    },
    text: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClass(): string {
      if (this.disabled) return 'button-disabled';
      return 'button-' + this.color;
    },
  },
  methods: {
    click() {
      if (this.disabled) return;
      this.$emit('click');
    },
  },
});
</script>

<style scoped lang="scss">
.button {
  color: white;
  width: min-content;
  height: min-content;
  text-align: center;
  cursor: pointer;
  user-select: none;
}

.button-red {
  background-color: red;
}

.button-blue {
  background-color: #0075ff;
}

.button-disabled {
  background-color: gray;
  cursor: default;
}

@media #{$desktop-breakpoint} {
  .button {
    font-size: get-desktop-size(30);
    padding: get-desktop-size(10);
    border-radius: get-desktop-size(20);
  }
}

@media #{$mobile-breakpoint} {
  .button {
    font-size: get-mobile-size(15);
    padding: get-mobile-size(5);
    border-radius: get-mobile-size(10);
  }
}
</style>
