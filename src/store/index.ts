import Vuex from 'vuex';
import Vue from 'vue';
import { ETaskStatus } from '~/types';
import { taskList } from './mockData';

type TUpdatedTaskParams = {
  id: number;
  name?: string;
  status: ETaskStatus;
};

Vue.use(Vuex);
export const store = new Vuex.Store({
  state() {
    return {
      taskList,
    };
  },

  getters: {
    getTaskList: (state) => state.taskList,
  },

  mutations: {
    createTask(state, { name, status }) {
      state.taskList.unshift({
        id: state.taskList.length,
        status,
        name,
        created_at: new Date().toLocaleDateString('ru-RU'),
      });
    },

    upadateTask(state, params: TUpdatedTaskParams) {
      const { id, ...updatedData } = params;
      state.taskList = state.taskList.map((task) => {
        if (task.id === id) {
          return { ...task, ...updatedData };
        }
        return task;
      });
    },

    removeTask(state, id) {
      state.taskList = state.taskList.filter((task) => task.id !== id);
    },
    removeDoneTasks(state) {
      state.taskList = state.taskList.filter((task) => task.status !== 'done');
    },
  },
});
