<template>
  <VModal v-model="open" title="Новая задача" width="540px">
    <VInput
      v-model="form.title"
      label="Название"
      placeholder="Что нужно сделать?"
    />
    <VTextarea
      v-model="form.description"
      label="Описание"
      placeholder="Подробнее..."
      :rows="3"
    />

    <div class="row-2">
      <div class="vsel-wrap">
        <label class="vsel-label">Назначить</label>
        <select v-model="form.assigneeId" class="vsel">
          <option value="">Не назначено</option>
          <option v-for="m in members" :key="m.id" :value="m.id">
            {{ m.name }}
          </option>
        </select>
      </div>
      <VSelect
        v-model="form.priority"
        label="Приоритет"
        :options="priorityOpts"
      />
    </div>

    <div class="row-2">
      <VInput v-model="form.dueDate" label="Дата" type="date" />
      <VInput v-model="form.dueTime" label="Время" type="time" />
    </div>

    <VSelect v-model="form.repeat" label="Повтор" :options="repeatOpts" />

    <template #footer>
      <VButton variant="outline" @click="open = false">Отмена</VButton>
      <VButton :disabled="!form.title.trim()" @click="submit"
        >Создать задачу</VButton
      >
    </template>
  </VModal>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useTasksStore } from "~/stores/tasks";
import { useFamilyStore } from "~/stores/family";
import { useAuthStore } from "~/stores/auth";
import VModal from "~/components/ui/VModal.vue";
import VInput from "~/components/ui/VInput.vue";
import VTextarea from "~/components/ui/VTextarea.vue";
import VSelect from "~/components/ui/VSelect.vue";
import VButton from "~/components/ui/VButton.vue";

const props = defineProps({ modelValue: { type: Boolean, default: false } });
const emit = defineEmits(["update:modelValue", "created"]);

const open = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

const tasks = useTasksStore();
const family = useFamilyStore();
const auth = useAuthStore();

const members = computed(() => family.members);

const blank = () => ({
  title: "",
  description: "",
  assigneeId: "",
  priority: "medium",
  dueDate: "",
  dueTime: "",
  repeat: "",
});
const form = ref(blank());

watch(open, (v) => {
  if (v) form.value = blank();
});

const priorityOpts = [
  { value: "high", label: "🔴 Высокий" },
  { value: "medium", label: "🟡 Средний" },
  { value: "low", label: "🔵 Низкий" },
];
const repeatOpts = [
  { value: "", label: "Без повтора" },
  { value: "daily", label: "Каждый день" },
  { value: "weekly", label: "Каждую неделю" },
  { value: "monthly", label: "Каждый месяц" },
];

function submit() {
  if (!form.value.title.trim()) return;
  tasks.createTask({
    ...form.value,
    assigneeId: form.value.assigneeId || null,
    repeat: form.value.repeat || null,
    creatorId: auth.user?.id || "u1",
  });
  emit("created");
  open.value = false;
}
</script>

<style scoped>
.row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.vsel-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.vsel-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
}
.vsel {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.7rem 1rem;
  color: var(--text);
  font-size: 0.9rem;
  outline: none;
  width: 100%;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%237a7a7a' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  transition: border-color 0.2s;
}
.vsel:focus {
  border-color: var(--green-border);
}
@media (max-width: 480px) {
  .row-2 {
    grid-template-columns: 1fr;
  }
}
</style>
