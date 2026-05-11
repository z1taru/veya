<template>
  <div class="task-detail">
    <button class="back-btn" @click="$router.push('/app/tasks')">
      ← Назад
    </button>

    <p v-if="tasks.loading" class="text-muted text-sm">Загружаем задачу...</p>
    <p v-if="tasks.error" class="page-error">{{ tasks.error }}</p>

    <div v-if="!tasks.loading && task" class="fade-up">
      <div class="td-header">
        <div class="td-title-row">
          <TaskStatusBadge :status="task.status" />
          <span :class="['priority-badge', `priority-${task.priority}`]">{{
            priorityLabel
          }}</span>
        </div>
        <h1 class="td-title">{{ task.title }}</h1>
        <p v-if="task.description" class="td-desc">{{ task.description }}</p>
      </div>

      <div class="td-meta-grid mt-3">
        <div class="td-meta-item" v-if="assignee">
          <span class="meta-label">Кому</span>
          <div class="meta-member">
            <div class="m-avatar">
              {{ getInitials(assigneeName) }}
            </div>
            {{ assigneeName }}
          </div>
        </div>
        <div class="td-meta-item" v-if="creator">
          <span class="meta-label">Создал(а)</span>
          <div class="meta-member">
            <div class="m-avatar">
              {{ getInitials(creatorName) }}
            </div>
            {{ creatorName }}
          </div>
        </div>
        <div class="td-meta-item" v-if="task.dueDate">
          <span class="meta-label">Дата</span>
          <span class="meta-val"
            >{{ formatDate(task.dueDate) }}
            {{ task.dueTime ? "в " + task.dueTime : "" }}</span
          >
        </div>
        <div class="td-meta-item" v-if="task.repeat">
          <span class="meta-label">Повтор</span>
          <span class="meta-val">{{ repeatLabel }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div
        v-if="task.status !== 'done' && task.status !== 'declined'"
        class="td-actions mt-3"
      >
        <VButton variant="secondary" size="sm" @click="setStatus('accepted')"
          >Принять</VButton
        >
        <VButton size="sm" @click="setStatus('done')">✓ Выполнено</VButton>
        <VButton variant="outline" size="sm" @click="setStatus('later')"
          >Позже</VButton
        >
        <VButton variant="danger" size="sm" @click="setStatus('declined')"
          >Отклонить</VButton
        >
      </div>
      <div v-else class="td-done-note mt-3">
        Задача {{ task.status === "done" ? "выполнена" : "отклонена" }}.
        <button class="reopen-link" @click="setStatus('pending')">
          Вернуть в ожидание
        </button>
      </div>

      <!-- History -->
      <div class="td-history mt-4">
        <h3 class="history-title">История</h3>
        <div class="history-list mt-2">
          <div v-for="(h, i) in taskHistory" :key="i" class="history-item">
            <div class="history-dot" />
            <div>
              <span class="history-action">{{ h.action }}</span>
              <span class="history-date"> · {{ h.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <EmptyState
      v-else-if="!tasks.loading"
      icon="🔍"
      title="Задача не найдена"
      subtitle="Она могла быть удалена"
    >
      <NuxtLink to="/app/tasks" class="back-link mt-2"
        >← Вернуться к задачам</NuxtLink
      >
    </EmptyState>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useTasksStore } from "~/stores/tasks";
import { useFamilyStore } from "~/stores/family";
import {
  getInitials,
  getMemberDisplayName,
} from "~/utils/displayNames";
import TaskStatusBadge from "~/components/public/TaskStatusBadge.vue";
import EmptyState from "~/components/public/EmptyState.vue";
import VButton from "~/components/ui/VButton.vue";

definePageMeta({ layout: "app", middleware: "auth" });

const route = useRoute();
const tasks = useTasksStore();
const family = useFamilyStore();

const task = computed(() => tasks.getTaskById(route.params.id));
const taskHistory = computed(() => tasks.history.length ? tasks.history : task.value?.history || []);
const assignee = computed(() =>
  task.value ? family.getMemberById(task.value.assigneeId) : null,
);
const creator = computed(() =>
  task.value ? family.getMemberById(task.value.creatorId) : null,
);
const assigneeName = computed(() => getMemberDisplayName(assignee.value));
const creatorName = computed(() => getMemberDisplayName(creator.value));

const PRIORITY_LABELS = {
  high: "🔴 Высокий",
  medium: "🟡 Средний",
  low: "🔵 Низкий",
};
const REPEAT_LABELS = {
  daily: "Каждый день",
  weekly: "Каждую неделю",
  monthly: "Каждый месяц",
};

const priorityLabel = computed(
  () => PRIORITY_LABELS[task.value?.priority] || "",
);
const repeatLabel = computed(() => REPEAT_LABELS[task.value?.repeat] || "");

onMounted(async () => {
  try {
    await Promise.all([
      tasks.fetchTask(route.params.id),
      tasks.fetchTaskHistory(route.params.id),
      family.fetchCurrentFamily(),
    ]);
  } catch (_) {}
});

function setStatus(status) {
  tasks.updateTaskStatus(task.value.id, status).catch(() => {});
}

function formatDate(d) {
  if (!d) return "";
  return new Date(d + "T00:00:00").toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
}
</script>

<style scoped>
.task-detail {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 700px;
}
.back-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.85rem;
  padding: 0;
  font-family: inherit;
  transition: color 0.2s;
}
.back-btn:hover {
  color: var(--text);
}

.td-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.td-title-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.priority-badge {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
}
.priority-high {
  background: rgba(255, 92, 92, 0.1);
  color: var(--red);
  border: 1px solid rgba(255, 92, 92, 0.25);
}
.priority-medium {
  background: rgba(255, 200, 50, 0.1);
  color: var(--yellow);
  border: 1px solid rgba(255, 200, 50, 0.25);
}
.priority-low {
  background: rgba(92, 168, 255, 0.1);
  color: var(--blue);
  border: 1px solid rgba(92, 168, 255, 0.25);
}
.td-title {
  font-size: 1.5rem;
}
.td-desc {
  color: var(--text-muted);
  line-height: 1.6;
  font-size: 0.9rem;
}

.td-meta-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
@media (max-width: 480px) {
  .td-meta-grid {
    grid-template-columns: 1fr;
  }
}
.td-meta-item {
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 0.9rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.meta-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-dim);
}
.meta-val {
  font-size: 0.9rem;
  font-weight: 500;
}
.meta-member {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}
.m-avatar {
  width: 26px;
  height: 26px;
  background: var(--green-dark);
  color: var(--green);
  border-radius: 50%;
  font-size: 0.62rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.td-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.td-done-note {
  font-size: 0.85rem;
  color: var(--text-muted);
}
.reopen-link {
  background: none;
  border: none;
  color: var(--green);
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
  padding: 0;
  margin-left: 0.5rem;
}

.history-title {
  font-size: 1rem;
  font-weight: 600;
}
.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.history-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}
.history-dot {
  width: 8px;
  height: 8px;
  background: var(--bg-3);
  border: 1px solid var(--border-md);
  border-radius: 50%;
  margin-top: 0.35rem;
  flex-shrink: 0;
}
.history-action {
  font-size: 0.85rem;
}
.history-date {
  font-size: 0.75rem;
  color: var(--text-muted);
}
.back-link {
  color: var(--green);
  font-size: 0.85rem;
  display: inline-block;
}
.page-error {
  font-size: 0.82rem;
  color: var(--red);
}
</style>
