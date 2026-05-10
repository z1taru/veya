<!-- components/ui/VInput.vue -->
<template>
  <div class="vinput-wrap">
    <label v-if="label" class="vinput-label">{{ label }}</label>
    <input
      v-bind="$attrs"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="vinput"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" class="vinput-error">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: [String, Number], default: "" },
  label: { type: String, default: "" },
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "" },
  error: { type: String, default: "" },
});
defineEmits(["update:modelValue"]);
</script>

<style scoped>
.vinput-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.vinput-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
}
.vinput {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.7rem 1rem;
  color: var(--text);
  font-size: 0.9rem;
  outline: none;
  width: 100%;
  transition: border-color 0.2s;
}
.vinput:focus {
  border-color: var(--green-border);
}
.vinput::placeholder {
  color: var(--text-dim);
}
.vinput-error {
  font-size: 0.75rem;
  color: var(--red);
}
</style>
