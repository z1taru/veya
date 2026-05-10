<template>
  <div class="vtextarea-wrap">
    <label v-if="label" class="vtextarea-label">{{ label }}</label>
    <textarea
      v-bind="$attrs"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      class="vtextarea"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: "" },
  label: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  rows: { type: Number, default: 3 },
});
defineEmits(["update:modelValue"]);
</script>

<style scoped>
.vtextarea-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.vtextarea-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
}
.vtextarea {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.7rem 1rem;
  color: var(--text);
  font-size: 0.9rem;
  outline: none;
  width: 100%;
  resize: vertical;
  transition: border-color 0.2s;
  font-family: inherit;
}
.vtextarea:focus {
  border-color: var(--green-border);
}
.vtextarea::placeholder {
  color: var(--text-dim);
}
</style>
