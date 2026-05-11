<template>
  <div
    class="task-card"
    :class="`priority-${task.priority}`"
    @click="$emit('click', task)"
  >
    <div class="task-top">
      <TaskStatusBadge :status="task.status" />
      <span class="task-time">{{ task.dueTime || "" }}</span>
    </div>
    <h4 class="task-title">{{ task.title }}</h4>
    <div class="task-meta">
      <span v-if="assignee" class="task-assignee">👤 {{ assigneeName }}</span>
      <span v-if="task.repeat" class="task-repeat">🔁 {{ repeatLabel }}</span>
      <span v-if="task.dueDate" class="task-date">{{
        formatDate(task.dueDate)
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useFamilyStore } from "~/stores/family";
import { getMemberDisplayName } from "~/utils/displayNames";
import TaskStatusBadge from "./TaskStatusBadge.vue";

const props = defineProps({ task: { type: Object, required: true } });
defineEmits(["click"]);

const family = useFamilyStore();
const assignee = computed(() => family.getMemberById(props.task.assigneeId));
const assigneeName = computed(() => getMemberDisplayName(assignee.value));
const repeatLabel = computed(
  () =>
    ({
      daily: "Каждый день",
      weekly: "Каждую неделю",
      monthly: "Каждый месяц",
    })[props.task.repeat] || "",
);

function formatDate(d) {
  if (!d) return "";
  const today = new Date().toISOString().split("T")[0];
  if (d === today) return "Сегодня";
  return new Date(d + "T00:00:00").toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
  });
}
</script>

<style scoped>
.task-card {
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1rem 1.1rem;
  cursor: pointer;
  transition:
    border-color 0.2s,
    transform 0.15s;
  position: relative;
  overflow: hidden;
}
.task-card::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  border-radius: 3px 0 0 3px;
}
.task-card.priority-high::before {
  background: var(--red);
}
.task-card.priority-medium::before {
  background: var(--yellow);
}
.task-card.priority-low::before {
  background: var(--blue);
}
.task-card:hover {
  border-color: var(--border-md);
  transform: translateY(-1px);
}
.task-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.task-time {
  font-size: 0.75rem;
  color: var(--text-muted);
}
.task-title {
  font-size: 0.9rem;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  margin-bottom: 0.6rem;
  line-height: 1.4;
}
.task-meta {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.task-meta span {
  font-size: 0.72rem;
  color: var(--text-muted);
}
</style>
