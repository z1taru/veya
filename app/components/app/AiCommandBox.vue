<template>
  <div class="acb">
    <div class="acb-header">
      <span class="acb-label">✨ AI-помощник</span>
      <span class="acb-note">backend AI</span>
    </div>

    <textarea
      v-model="command"
      class="acb-input"
      placeholder="Напишите команду своими словами…"
      rows="3"
      @keydown.meta.enter="parse"
      @keydown.ctrl.enter="parse"
    />

    <div class="acb-examples">
      <button
        v-for="ex in examples"
        :key="ex"
        class="acb-ex"
        @click="command = ex"
      >
        {{ ex }}
      </button>
    </div>

    <VButton :disabled="!command.trim()" :loading="loading" full @click="parse">
      Разобрать команду
    </VButton>

    <div v-if="error" class="acb-error fade-in">{{ error }}</div>

    <!-- Preview -->
    <div v-if="result" class="acb-preview fade-in">
      <div class="acb-preview-header">
        <span class="preview-type">{{ typeLabel }}</span>
        <span class="preview-summary">{{ result.summary || result.title || command }}</span>
      </div>

      <div v-if="result.type === 'shopping'" class="preview-items">
        <span v-for="item in resultItems" :key="item" class="preview-chip">{{
          item
        }}</span>
      </div>
      <div v-else class="preview-task">
        <div v-if="result.assignee" class="pt-row">
          <span class="pt-label">Кому:</span> {{ assigneeName }}
        </div>
        <div v-if="result.dueDate" class="pt-row">
          <span class="pt-label">Дата:</span> {{ result.dueDate }}
          <span v-if="result.dueTime">в {{ result.dueTime }}</span>
        </div>
        <div v-if="result.repeat" class="pt-row">
          <span class="pt-label">Повтор:</span> {{ repeatLabel(result.repeat) }}
        </div>
      </div>

      <div class="acb-actions">
        <VButton variant="outline" size="sm" @click="result = null"
          >Отмена</VButton
        >
        <VButton size="sm" @click="confirm">
          {{
            result.type === "shopping" ? "Добавить в покупки" : "Создать задачу"
          }}
        </VButton>
      </div>
    </div>

    <div v-if="done" class="acb-done fade-in">✓ {{ doneMsg }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAiStore } from "~/stores/ai";
import { useTasksStore } from "~/stores/tasks";
import { useShoppingStore } from "~/stores/shopping";
import { getMemberDisplayName } from "~/utils/displayNames";
import VButton from "~/components/ui/VButton.vue";

const ai = useAiStore();
const tasks = useTasksStore();
const shopping = useShoppingStore();

const command = ref("");
const result = ref(null);
const done = ref(false);
const doneMsg = ref("");
const error = ref("");
const loading = computed(() => ai.loading);

const examples = [
  "Напомни Алдияру прийти в 19:00",
  "Добавь молоко и хлеб в покупки",
  "Каждую пятницу напомни оплатить коммуналку",
  "Напомни бабушке о лекарстве каждый день в 20:00",
];

const TYPE_LABELS = { shopping: "🛒 Покупки", task: "✅ Задача", reminder: "🔔 Напоминание" };
const typeLabel = computed(() => TYPE_LABELS[result.value?.type] || "Команда");
const resultItems = computed(() => result.value?.items || result.value?.shoppingItems || []);
const assigneeName = computed(() => getMemberDisplayName(result.value?.assignee));

function repeatLabel(r) {
  return (
    { daily: "Каждый день", weekly: "Каждую неделю", monthly: "Каждый месяц" }[
      r
    ] || r
  );
}

async function parse() {
  if (!command.value.trim()) return;
  error.value = "";
  done.value = false;
  try {
    result.value = await ai.parseCommand(command.value);
  } catch (_) {
    error.value = ai.error || "Не удалось разобрать команду";
  }
}

async function confirm() {
  if (!result.value) return;
  error.value = "";
  try {
    const created = await ai.createFromCommand(result.value.id);
    if (result.value.type === "shopping") {
      await shopping.fetchItems().catch(() => {});
      doneMsg.value = "Покупки обновлены";
    } else {
      await tasks.fetchTasks().catch(() => {});
      doneMsg.value = created?.title
        ? `Задача создана: «${created.title}»`
        : "Команда выполнена";
    }
    result.value = null;
    command.value = "";
    done.value = true;
    setTimeout(() => (done.value = false), 4000);
  } catch (_) {
    error.value = ai.error || "Не удалось выполнить команду";
  }
}
</script>

<style scoped>
.acb {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.acb-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.acb-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--green);
}
.acb-note {
  font-size: 0.7rem;
  color: var(--text-dim);
  background: var(--bg-3);
  padding: 0.15rem 0.6rem;
  border-radius: 100px;
}
.acb-input {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1rem;
  color: var(--text);
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  resize: vertical;
  width: 100%;
  transition: border-color 0.2s;
  line-height: 1.5;
}
.acb-input:focus {
  border-color: var(--green-border);
}
.acb-input::placeholder {
  color: var(--text-dim);
}

.acb-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.acb-ex {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: 100px;
  font-size: 0.72rem;
  color: var(--text-muted);
  padding: 0.3rem 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}
.acb-ex:hover {
  border-color: var(--green-border);
  color: var(--green);
}

.acb-preview {
  background: var(--bg-2);
  border: 1px solid var(--green-border);
  border-radius: var(--radius-md);
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.acb-preview-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.preview-type {
  font-size: 0.72rem;
  font-weight: 700;
  background: rgba(60, 255, 138, 0.12);
  color: var(--green);
  border: 1px solid var(--green-border);
  padding: 0.15rem 0.6rem;
  border-radius: 100px;
}
.preview-summary {
  font-size: 0.85rem;
  font-weight: 500;
}
.preview-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.preview-chip {
  background: var(--bg-3);
  border: 1px solid var(--border-md);
  border-radius: 100px;
  font-size: 0.78rem;
  padding: 0.2rem 0.7rem;
  color: var(--text);
}
.preview-task {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.pt-row {
  font-size: 0.82rem;
  color: var(--text-muted);
}
.pt-label {
  color: var(--text-dim);
  font-size: 0.75rem;
}
.acb-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}
.acb-done {
  background: rgba(60, 255, 138, 0.08);
  border: 1px solid var(--green-border);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  color: var(--green);
}
.acb-error {
  background: rgba(255, 92, 92, 0.08);
  border: 1px solid rgba(255, 92, 92, 0.2);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  color: var(--red);
}
</style>
