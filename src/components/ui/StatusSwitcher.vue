<template>
  <p class="status-switcher" :class="currentClass">
    статус:
    <span @click="$emit('switch', 'active')" class="active">в процессе</span>
    /
    <span @click="$emit('switch', 'done')" class="done">выполнено</span>
  </p>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { ETaskStatus } from '~/types';

export default Vue.extend({
  name: 'StatusSwitcher',
  props: {
    status: {
      type: String as PropType<ETaskStatus>,
      validator: (value: ETaskStatus) => {
        return Object.values(ETaskStatus).includes(value);
      },
      default: ETaskStatus.ACTIVE,
    },
  },
  computed: {
    currentClass() {
      return 'status-' + this.status;
    },
  },
});
</script>

<style scoped lang="scss">
.status-switcher {
  user-select: none;
  color: white;
}
.status-switcher span {
  cursor: pointer;
}
.status-active .active,
.status-done .done {
  color: red;
  text-decoration: underline;
  pointer-events: none;
  cursor: default;
}

@media #{$desktop-breakpoint} {
  .status-switcher {
    font-size: get-desktop-size(25);
  }
}

@media #{$mobile-breakpoint} {
  .status-switcher {
    font-size: get-mobile-size(12);
  }
}
</style>
