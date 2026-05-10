<template>
  <div class="vsel-wrap">
    <label v-if="label" class="vsel-label">{{ label }}</label>
    <select
      :value="modelValue"
      class="vsel"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: "" },
  label: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  options: { type: Array, default: () => [] },
});
defineEmits(["update:modelValue"]);
</script>

<style scoped>
.vsel-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.vsel-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
}
.vsel {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.7rem 1rem;
  color: var(--text);
  font-size: 0.9rem;
  outline: none;
  width: 100%;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%237a7a7a' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  transition: border-color 0.2s;
}
.vsel:focus {
  border-color: var(--green-border);
}
</style>
