<template>
  <div id="app">
    <Header @upadate-filter-params="setFilterParams" @open-modal="openModal" />
    <div class="tasks-bar">
      <TaskList :input="input" :filter="filter" @open-modal="openModal" />
    </div>
    <TaskForm :is-shown="isTaskFormShown" :task="selectedTask" @close-form="closeForm" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '~/components/entities/Header.vue';
import TaskList from '~/components/entities/TaskList.vue';
import TaskForm from '~/components/entities/TaskForm.vue';
import { EFilterOption, TTask } from './types';

type TDataReturned = {
  input: string;
  filter: EFilterOption;
  isTaskFormShown: boolean;
  selectedTask: TTask | null;
};

export default Vue.extend({
  name: 'App',
  components: {
    Header,
    TaskList,
    TaskForm,
  },
  data(): TDataReturned {
    return {
      input: '',
      filter: EFilterOption.ALL,
      isTaskFormShown: false,
      selectedTask: null,
    };
  },
  methods: {
    setFilterParams({ input, filter }: { input: string; filter: string }) {
      this.input = input;
      this.filter = filter;
    },
    openModal(task?: TTask) {
      this.selectedTask = task || null;
      this.isTaskFormShown = true;
    },
    closeForm() {
      this.selectedTask = null;
      this.isTaskFormShown = false;
    },
  },
});
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
}

.tasks-bar {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
}

@media #{$desktop-breakpoint} {
  .tasks-bar {
    padding: 0 get-desktop-size(20);
  }
}

@media #{$mobile-breakpoint} {
  .tasks-bar {
    padding: 0 get-mobile-size(10);
  }
}
</style>
