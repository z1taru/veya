<template>
  <div class="vtabs">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      :class="['vtab', { active: modelValue === tab.value }]"
      @click="$emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
      <span v-if="tab.count != null" class="vtab-count">{{ tab.count }}</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: "" },
  tabs: { type: Array, default: () => [] },
});
defineEmits(["update:modelValue"]);
</script>

<style scoped>
.vtabs {
  display: flex;
  gap: 0.25rem;
  background: var(--bg-2);
  border-radius: var(--radius-md);
  padding: 0.25rem;
  overflow-x: auto;
}
.vtab {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.vtab:hover {
  color: var(--text);
}
.vtab.active {
  background: var(--bg-3);
  color: var(--text);
}
.vtab-count {
  background: var(--bg-4);
  color: var(--text-muted);
  font-size: 0.65rem;
  padding: 0.1rem 0.4rem;
  border-radius: 100px;
}
.vtab.active .vtab-count {
  background: var(--green-dark);
  color: var(--green);
}
</style>
