<template>
  <div class="acb">
    <div class="acb-header">
      <span class="acb-label">✨ AI-помощник</span>
      <span class="acb-note">mock-парсер</span>
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

    <!-- Preview -->
    <div v-if="result" class="acb-preview fade-in">
      <div class="acb-preview-header">
        <span class="preview-type">{{ typeLabel }}</span>
        <span class="preview-summary">{{ result.summary }}</span>
      </div>

      <div v-if="result.type === 'shopping'" class="preview-items">
        <span v-for="item in result.items" :key="item" class="preview-chip">{{
          item
        }}</span>
      </div>
      <div v-else class="preview-task">
        <div v-if="result.assignee" class="pt-row">
          <span class="pt-label">Кому:</span> {{ result.assignee.name }}
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
import { ref } from "vue";
import { useAiParser } from "~/composables/useAiParser";
import { useTasksStore } from "~/stores/tasks";
import { useShoppingStore } from "~/stores/shopping";
import { useAuthStore } from "~/stores/auth";
import VButton from "~/components/ui/VButton.vue";

const { parse: parseCmd } = useAiParser();
const tasks = useTasksStore();
const shopping = useShoppingStore();
const auth = useAuthStore();

const command = ref("");
const result = ref(null);
const loading = ref(false);
const done = ref(false);
const doneMsg = ref("");

const examples = [
  "Напомни Алдияру прийти в 19:00",
  "Добавь молоко и хлеб в покупки",
  "Каждую пятницу напомни оплатить коммуналку",
  "Напомни бабушке о лекарстве каждый день в 20:00",
];

const TYPE_LABELS = { shopping: "🛒 Покупки", task: "✅ Задача" };
const typeLabel = () => TYPE_LABELS[result.value?.type] || "Команда";

function repeatLabel(r) {
  return (
    { daily: "Каждый день", weekly: "Каждую неделю", monthly: "Каждый месяц" }[
      r
    ] || r
  );
}

async function parse() {
  if (!command.value.trim()) return;
  loading.value = true;
  done.value = false;
  await new Promise((r) => setTimeout(r, 400));
  result.value = parseCmd(command.value);
  loading.value = false;
}

function confirm() {
  if (!result.value) return;
  if (result.value.type === "shopping") {
    shopping.addItems(result.value.items, auth.user?.id || "u1");
    doneMsg.value = `Добавлено в покупки: ${result.value.items.join(", ")}`;
  } else {
    tasks.createTask({
      title: result.value.title,
      assigneeId: result.value.assignee?.id || null,
      dueDate: result.value.dueDate,
      dueTime: result.value.dueTime,
      repeat: result.value.repeat,
      priority: result.value.priority,
      creatorId: auth.user?.id || "u1",
    });
    doneMsg.value = `Задача создана: «${result.value.title}»`;
  }
  result.value = null;
  command.value = "";
  done.value = true;
  setTimeout(() => (done.value = false), 4000);
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
</style>
