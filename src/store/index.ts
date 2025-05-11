import Vuex from 'vuex';
import Vue from 'vue';
import { ETaskStatus } from '~/types';

type TUpdatedTaskParams = {
  id: number;
  name?: string;
  status: ETaskStatus;
};

Vue.use(Vuex);
export const store = new Vuex.Store({
  state() {
    return {
      taskList: [
        {
          id: 0,
          status: 'done',
          name: 'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddaddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
          created_at: new Date('August 19, 1975 23:15:30').toLocaleDateString('ru-RU'),
        },
        {
          id: 1,
          status: 'done',
          name: 'a',
          created_at: new Date('August 19, 1975 23:15:30').toLocaleDateString('ru-RU'),
        },
        {
          id: 2,
          status: 'active',
          name: 'a 1',
          created_at: new Date('August 19, 1975 23:15:30').toLocaleDateString('ru-RU'),
        },
        {
          id: 3,
          status: 'active',
          name: 'a4',
          created_at: new Date('August 19, 1975 23:15:30').toLocaleDateString('ru-RU'),
        },
        {
          id: 4,
          status: 'done',
          name: 'a4',
          created_at: new Date('August 19, 1975 23:15:30').toLocaleDateString('ru-RU'),
        },
        {
          id: 5,
          status: 'active',
          name: 'a5',
          created_at: new Date('August 19, 1975 23:15:30').toLocaleDateString('ru-RU'),
        },
        {
          id: 6,
          status: 'active',
          name: 'a6',
          created_at: new Date('August 19, 1975 23:15:30').toLocaleDateString('ru-RU'),
        },
      ],
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
