<template>
  <span :class="['vbadge', `vbadge--${color}`]"><slot /></span>
</template>

<script setup>
defineProps({ color: { type: String, default: "gray" } });
</script>

<style scoped>
.vbadge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
  white-space: nowrap;
}
.vbadge--gray {
  background: var(--bg-3);
  color: var(--text-muted);
  border: 1px solid var(--border);
}
.vbadge--green {
  background: rgba(60, 255, 138, 0.12);
  color: var(--green);
  border: 1px solid var(--green-border);
}
.vbadge--yellow {
  background: rgba(255, 200, 50, 0.1);
  color: var(--yellow);
  border: 1px solid rgba(255, 200, 50, 0.25);
}
.vbadge--red {
  background: rgba(255, 92, 92, 0.1);
  color: var(--red);
  border: 1px solid rgba(255, 92, 92, 0.25);
}
.vbadge--blue {
  background: rgba(92, 168, 255, 0.1);
  color: var(--blue);
  border: 1px solid rgba(92, 168, 255, 0.25);
}
</style>
