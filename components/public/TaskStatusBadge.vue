<template>
  <span :class="['status-badge', `status-${status}`]">{{
    labels[status] || status
  }}</span>
</template>

<script setup>
defineProps({ status: { type: String, default: "pending" } });
const labels = {
  pending: "Ожидает",
  accepted: "Принята",
  done: "Выполнена",
  declined: "Отклонена",
  later: "Позже",
};
</script>

<style scoped>
.status-badge {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
  white-space: nowrap;
}
.status-pending {
  background: rgba(255, 200, 50, 0.1);
  color: var(--yellow);
  border: 1px solid rgba(255, 200, 50, 0.25);
}
.status-accepted {
  background: rgba(92, 168, 255, 0.1);
  color: var(--blue);
  border: 1px solid rgba(92, 168, 255, 0.25);
}
.status-done {
  background: rgba(60, 255, 138, 0.12);
  color: var(--green);
  border: 1px solid var(--green-border);
}
.status-declined {
  background: rgba(255, 92, 92, 0.1);
  color: var(--red);
  border: 1px solid rgba(255, 92, 92, 0.25);
}
.status-later {
  background: var(--bg-3);
  color: var(--text-muted);
  border: 1px solid var(--border);
}
</style>
