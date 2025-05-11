<template>
  <div class="blackout" v-show="isShown">
    <div class="task-form">
      <p class="heading">{{ labelText }}</p>
      <div>
        <p class="input-label">Имя</p>
        <Input v-model="formValue.name" />
      </div>
      <StatusSwitcher @switch="formValue.status = $event" :status="formValue.status" />
      <div class="buttons">
        <Button
          color="blue"
          :disabled="isConfirmButtonDisabled"
          text="Подтвердить"
          @click="confirm"
        />
        <Button color="red" text="Закрыть" @click="$emit('close-form')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import Button from '~/components/ui/Button.vue';
import Input from '../ui/Input.vue';
import StatusSwitcher from '~/components/ui/StatusSwitcher.vue';
import { TTask } from '~/types';

export default Vue.extend({
  name: 'TaskForm',
  components: { Button, Input, StatusSwitcher },
  props: {
    task: {
      type: (Object as PropType<TTask>) || null,
      default: null,
    },
    isShown: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      formValue: {
        name: '',
        status: '',
      },
      labelText: '',
    };
  },

  watch: {
    isShown: {
      handler() {
        if (this.isShown && this.task) {
          this.formValue = { name: this.task.name, status: this.task.status };
          this.labelText = 'Редактирование задачи';
        } else {
          this.labelText = 'Создание новой задачи';
          this.formValue = { name: '', status: 'active' };
        }
      },
      immediate: true,
    },
  },

  computed: {
    isCreateMode() {
      if (!this.task) return true;
      return false;
    },
    isConfirmButtonDisabled() {
      return !this.formValue.name.trim();
    },
  },
  methods: {
    confirm() {
      if (this.isCreateMode) {
        this.$store.commit('createTask', this.formValue);
      } else {
        this.$store.commit('upadateTask', {
          id: this.task.id,
          ...this.formValue,
        });
      }
      this.$emit('close-form');
    },
  },
});
</script>

<style scoped lang="scss">
.blackout {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.175);
  display: flex;
  justify-content: center;
  align-items: center;
}
.task-form {
  background-color: #a2b8eb;
  box-sizing: border-box;
  border-style: solid;
  border-color: white;
  display: flex;
  flex-direction: column;
  user-select: none;
}
.heading {
  font-family: '18vag';
  color: white;
  align-self: center;
}
.input-label {
  font-family: '18vag';
  color: white;
}
.buttons {
  display: flex;
  justify-content: space-between;
}

@media #{$desktop-breakpoint} {
  .task-form {
    width: get-desktop-size(800);
    border-radius: get-desktop-size(40);
    border-width: get-desktop-size(10);
    padding: get-desktop-size(30);
    gap: get-desktop-size(40);
  }
  .heading {
    font-size: get-desktop-size(40);
  }
  .input-label {
    font-size: get-desktop-size(30);
    line-height: get-desktop-size(35);
  }
}

@media #{$mobile-breakpoint} {
  .task-form {
    width: get-mobile-size(300);
    border-radius: get-mobile-size(20);
    border-width: get-mobile-size(5);
    padding: get-mobile-size(20);
    gap: get-mobile-size(10);
  }
  .heading {
    font-size: get-mobile-size(20);
  }
  .input-label {
    font-size: get-mobile-size(15);
    line-height: get-mobile-size(25);
  }
}
</style>
