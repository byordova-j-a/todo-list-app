<template>
  <div class="header">
    <div class="first-section">
      <div class="heading">Задачи</div>

      <Input v-model="inputValue" />
    </div>
    <div class="second-section">
      <div class="filter-bar">
        <div class="filter-bar-label">Отобразить:</div>
        <div class="filter-option" v-for="{ text, value } in filterOptionList" :key="value">
          <input :id="value" v-model="selectedFilter" type="radio" :value="value" />
          <label :for="value">{{ text }}</label>
        </div>
      </div>

      <div class="buttons">
        <Button color="blue" text="Добавить задачу" @click="createTask" />
        <Button color="red" text="Удалить выполненные" @click="removeDoneTasks" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { EFilterOption } from '~/types';

type TDataReturned = {
  selectedFilter: EFilterOption;
  inputValue: string;
  filterOptionList: { text: string; value: EFilterOption }[];
};

import Vue from 'vue';
import Button from '~/components/ui/Button.vue';
import { debounce } from 'lodash-es';
import Input from '~/components/ui/Input.vue';

export default Vue.extend({
  name: 'Header',
  components: {
    Button,
    Input,
  },
  data(): TDataReturned {
    return {
      selectedFilter: EFilterOption.ALL,
      inputValue: '',
      filterOptionList: [
        {
          text: 'все',
          value: EFilterOption.ALL,
        },
        {
          text: 'активные',
          value: EFilterOption.ACTIVE,
        },
        {
          text: 'выполненные',
          value: EFilterOption.DONE,
        },
      ],
    };
  },

  methods: {
    removeDoneTasks() {
      this.$store.commit('removeDoneTasks');
    },
    createTask() {
      this.$emit('open-modal');
    },
    updateFilterParams() {
      this.$emit('upadate-filter-params', { input: this.inputValue, filter: this.selectedFilter });
    },
  },

  watch: {
    inputValue: debounce(function () {
      this.updateFilterParams();
    }, 300),

    selectedFilter() {
      this.updateFilterParams();
    },
  },
});
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  background-color: #a2b8eb;
  box-sizing: border-box;
  color: white;
  display: flex;

  font-family: '18vag';
  border-bottom-style: solid;
  border-bottom-color: white;
}

.filter-bar {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .filter-option {
    &,
    & label {
      cursor: pointer;
    }

    & input {
      margin: 0;
      cursor: pointer;
      accent-color: #0075ff;
    }
  }
}

.first-section,
.second-section,
.buttons {
  display: flex;
}

@media #{$desktop-breakpoint} {
  .header {
    height: get-desktop-size(200);
    padding: get-desktop-size(20);
    font-size: get-desktop-size(30);
    gap: get-desktop-size(40);
    align-items: center;
    border-width: get-desktop-size(8);
  }

  .heading {
    font-size: get-desktop-size(60);
  }

  .filter-bar {
    width: get-desktop-size(260);

    .filter-bar-label {
      font-size: get-desktop-size(40);
      line-height: get-desktop-size(55);
    }

    .filter-option {
      font-size: get-desktop-size(30);

      input {
        height: get-desktop-size(20);
        width: get-desktop-size(40);
        padding-right: get-desktop-size(20);
      }
    }
  }

  .first-section {
    flex-grow: 1;
    gap: get-desktop-size(30);
  }

  .second-section,
  .buttons {
    gap: get-desktop-size(30);
  }

  .buttons {
    align-items: center;
  }
}

@media #{$mobile-breakpoint} {
  .header {
    height: get-mobile-size(180);
    padding: get-mobile-size(20);
    font-size: get-mobile-size(30);
    gap: get-mobile-size(20);
    flex-direction: column;
    border-width: get-mobile-size(4);
  }

  .heading {
    font-size: get-mobile-size(24);
  }

  .filter-bar {
    .filter-bar-label {
      font-size: get-mobile-size(20);
      line-height: get-mobile-size(25);
    }

    .filter-option {
      font-size: get-mobile-size(17);

      input {
        height: get-mobile-size(12);
        width: get-mobile-size(12);
      }
      label {
        padding-left: get-mobile-size(5);
      }
    }
  }

  .first-section {
    gap: get-mobile-size(10);
    align-items: center;
  }

  .second-section {
    justify-content: space-between;
  }

  .buttons {
    flex-direction: column;
    gap: get-mobile-size(10);
    align-items: end;
  }
}
</style>
