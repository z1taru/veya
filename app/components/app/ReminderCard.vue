<template>
  <div :class="['rc', { 'rc--off': !reminder.active }]">
    <div class="rc-icon">🔔</div>
    <div class="rc-info">
      <div class="rc-title">{{ reminder.title }}</div>
      <div class="rc-meta">
        <span v-if="reminder.time">🕐 {{ reminder.time }}</span>
        <span v-if="reminder.repeat" class="rc-repeat">{{ repeatLabel }}</span>
        <span v-if="assigneeName">👤 {{ assigneeName }}</span>
      </div>
    </div>
    <div class="rc-actions">
      <span
        :class="['rc-status', reminder.active ? 'status-on' : 'status-off']"
      >
        {{ reminder.active ? "Активно" : "Выключено" }}
      </span>
      <button class="rc-toggle" @click="$emit('toggle', reminder.id)">
        {{ reminder.active ? "Выкл." : "Вкл." }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useFamilyStore } from "~/stores/family";

const props = defineProps({ reminder: { type: Object, required: true } });
defineEmits(["toggle"]);

const family = useFamilyStore();

const assigneeName = computed(() => {
  const m = family.getMemberById(props.reminder.assigneeId);
  return m ? m.name : null;
});

const REPEAT_LABELS = {
  daily: "Каждый день",
  weekly: "Каждую неделю",
  monthly: "Каждый месяц",
};
const repeatLabel = computed(() => REPEAT_LABELS[props.reminder.repeat] || "");
</script>

<style scoped>
.rc {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition:
    opacity 0.2s,
    border-color 0.2s;
}
.rc:hover {
  border-color: var(--border-md);
}
.rc--off {
  opacity: 0.5;
}
.rc-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
}
.rc-info {
  flex: 1;
  min-width: 0;
}
.rc-title {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.3rem;
}
.rc-meta {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  font-size: 0.75rem;
  color: var(--text-muted);
}
.rc-repeat {
  background: rgba(60, 255, 138, 0.08);
  color: var(--green);
  padding: 0.1rem 0.5rem;
  border-radius: 100px;
  font-size: 0.68rem;
  font-weight: 600;
}
.rc-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
  flex-shrink: 0;
}
.rc-status {
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 100px;
}
.status-on {
  background: rgba(60, 255, 138, 0.12);
  color: var(--green);
  border: 1px solid var(--green-border);
}
.status-off {
  background: var(--bg-3);
  color: var(--text-dim);
  border: 1px solid var(--border);
}
.rc-toggle {
  background: none;
  border: 1px solid var(--border);
  border-radius: 100px;
  font-size: 0.72rem;
  color: var(--text-muted);
  padding: 0.2rem 0.7rem;
  cursor: pointer;
  transition: all 0.2s;
}
.rc-toggle:hover {
  border-color: var(--green-border);
  color: var(--green);
}
</style>
