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
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 700;
  letter-spacing: 0.01em;
  transition:
    box-shadow 0.2s,
    transform 0.15s,
    opacity 0.2s,
    background 0.2s;
  white-space: nowrap;
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
  padding: 0.72rem 1.5rem;
}
.vbtn--lg {
  font-size: 1rem;
  padding: 0.9rem 2rem;
}

/* variants */
.vbtn--primary {
  background: linear-gradient(135deg, #7B61FF 0%, #9B7BFF 100%);
  color: #fff;
  box-shadow: 0 4px 18px rgba(123, 97, 255, 0.28);
}
.vbtn--primary:hover:not(:disabled) {
  box-shadow: 0 6px 26px rgba(123, 97, 255, 0.42);
  transform: translateY(-1px);
}
.vbtn--secondary {
  background: var(--bg-3);
  color: var(--text);
  border: 1px solid var(--border);
}
.vbtn--secondary:hover:not(:disabled) {
  border-color: var(--violet-border);
  background: var(--bg-4);
}
.vbtn--outline {
  background: transparent;
  color: var(--text-muted);
  border: 1px solid var(--border);
}
.vbtn--outline:hover:not(:disabled) {
  border-color: var(--violet-border);
  color: var(--violet);
  background: var(--violet-dark);
}
.vbtn--danger {
  background: rgba(255, 107, 157, 0.1);
  color: var(--rose);
  border: 1px solid var(--rose-border);
}
.vbtn--danger:hover:not(:disabled) {
  background: rgba(255, 107, 157, 0.16);
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
}

.vbtn--loading {
  opacity: 0.7;
  cursor: wait;
}
</style>
