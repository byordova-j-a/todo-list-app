<template>
  <div class="task-list">
    <div v-for="{ id, name, status, created_at } in showedTaskList" class="task-item" :key="id">
      <div class="task-header">
        <p class="name">{{ name }}</p>

        <div class="icons">
          <PencilOutlineIcon @click="$emit('open-modal', { id, name, status })" />
          <CloseIcon @click="remove(id)" />
        </div>
      </div>
      <p class="date">создано: {{ created_at }}</p>
      <StatusSwitcher :status="status" @switch="changeTaskStatus({ id, status: $event })" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import StatusSwitcher from '~/components/ui/StatusSwitcher.vue';
import PencilOutlineIcon from 'icons/PencilOutline.vue';
import CloseIcon from 'icons/Close.vue';
import { TExtendedTask, EFilterOption } from '~/types';

type TDataReturned = {
  showedTaskList: TExtendedTask[];
};

export default Vue.extend({
  name: 'TaskList',
  components: { StatusSwitcher, PencilOutlineIcon, CloseIcon },
  props: {
    input: {
      type: String,
      default: '',
    },
    filter: {
      type: String as PropType<EFilterOption>,
      validator: (value: EFilterOption) => {
        return Object.values(EFilterOption).includes(value);
      },
      default: EFilterOption.ALL,
    },
  },
  data(): TDataReturned {
    return {
      showedTaskList: [],
    };
  },
  computed: {
    taskList(): TExtendedTask[] {
      return this.$store.getters.getTaskList;
    },
    changeValues(): { input: string; filter: EFilterOption; taskList: TExtendedTask[] } {
      const { input, filter, taskList } = this;
      return {
        input,
        filter,
        taskList,
      };
    },
  },
  methods: {
    remove(id: number) {
      this.$store.commit('removeTask', id);
    },
    changeTaskStatus({ id, status }: { id: number; status: string }) {
      this.$store.commit('upadateTask', { id, status });
    },
  },
  watch: {
    changeValues: {
      handler() {
        const regexp = new RegExp(`^${this.input}.*`, 'i');
        this.showedTaskList = this.taskList.filter((task) => {
          if (!regexp.test(task.name)) return false;

          if (this.filter === 'all' || task.status === this.filter) return true;
          return false;
        });
      },
      deep: true,
      immediate: true,
    },
  },
});
</script>

<style scoped lang="scss">
.task-list {
  width: 100%;
  font-family: '18vag';
  display: flex;
  flex-direction: column;
}

.task-item {
  background-color: #a2b8eb;
  position: relative;
  color: white;
  display: flex;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: default;
  user-select: none;
}

.task-header {
  display: flex;
}

.name {
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;
}

.pencil-outline-icon :deep(svg),
.close-icon :deep(svg) {
  cursor: pointer;
}

.pencil-outline-icon :deep(svg) {
  color: #0075ff;
}

.close-icon :deep(svg) {
  color: red;
}

.icons {
  display: flex;
}

@media (hover: hover) {
  .icons {
    opacity: 0;
    transition-property: opacity;
    transition-duration: 0.2s;
  }

  .task-item:hover .icons {
    opacity: 1;
  }
}

@media #{$desktop-breakpoint} {
  .task-list {
    gap: get-desktop-size(40);
    padding: get-desktop-size(40) 0;
  }

  .task-item {
    height: get-desktop-size(190);
    border-radius: get-desktop-size(40);
    padding: get-desktop-size(25) get-desktop-size(40);
  }
  .task-header {
    font-size: get-desktop-size(40);
  }

  .icons {
    gap: get-desktop-size(20);
    transform: translateY(-8%);
  }

  .pencil-outline-icon :deep(svg),
  .close-icon :deep(svg) {
    height: get-desktop-size(40);
    width: get-desktop-size(40);
  }

  .date {
    font-size: get-desktop-size(25);
  }
}

@media #{$mobile-breakpoint} {
  .task-list {
    gap: get-mobile-size(20);
    padding: get-mobile-size(20) 0;
  }

  .task-item {
    height: get-mobile-size(90);
    border-radius: get-mobile-size(20);
    padding: get-mobile-size(15) get-mobile-size(10);
  }

  .task-header {
    font-size: get-mobile-size(17);
  }

  .icons {
    gap: get-mobile-size(10);
    transform: translateY(-18%);
  }

  .pencil-outline-icon :deep(svg),
  .close-icon :deep(svg) {
    height: get-mobile-size(20);
    width: get-mobile-size(20);
  }

  .date {
    font-size: get-mobile-size(12);
  }
}
</style>
