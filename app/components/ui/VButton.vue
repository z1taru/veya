<template>
  <button
    :class="[
      'vbtn',
      `vbtn--${variant}`,
      `vbtn--${size}`,
      { 'vbtn--loading': loading, 'vbtn--full': full },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="spinner"></span>
    <slot v-else />
  </button>
</template>

<script setup>
defineProps({
  variant: { type: String, default: "primary" },
  size: { type: String, default: "md" },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  full: { type: Boolean, default: false },
});
defineEmits(["click"]);
</script>

<style scoped>
.vbtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  font-family: "Syne", sans-serif;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition:
    opacity 0.2s,
    transform 0.15s,
    background 0.2s;
  white-space: nowrap;
}
.vbtn:hover:not(:disabled) {
  opacity: 0.85;
}
.vbtn:active:not(:disabled) {
  transform: scale(0.97);
}
.vbtn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.vbtn--full {
  width: 100%;
}

/* sizes */
.vbtn--sm {
  font-size: 0.78rem;
  padding: 0.45rem 1rem;
}
.vbtn--md {
  font-size: 0.9rem;
  padding: 0.7rem 1.5rem;
}
.vbtn--lg {
  font-size: 1rem;
  padding: 0.9rem 2rem;
}

/* variants */
.vbtn--primary {
  background: var(--green);
  color: #000;
}
.vbtn--secondary {
  background: var(--bg-3);
  color: var(--text);
  border: 1px solid var(--border);
}
.vbtn--outline {
  background: transparent;
  color: var(--text-muted);
  border: 1px solid var(--border);
}
.vbtn--outline:hover:not(:disabled) {
  border-color: var(--green-border);
  color: var(--green);
  opacity: 1;
}
.vbtn--danger {
  background: rgba(255, 92, 92, 0.12);
  color: var(--red);
  border: 1px solid rgba(255, 92, 92, 0.25);
}
.vbtn--ghost {
  background: transparent;
  color: var(--text-muted);
  border: none;
  border-radius: var(--radius-sm);
}
.vbtn--ghost:hover:not(:disabled) {
  background: var(--bg-3);
  color: var(--text);
  opacity: 1;
}

.vbtn--loading {
  opacity: 0.7;
  cursor: wait;
}
</style>
