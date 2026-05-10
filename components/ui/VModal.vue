<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="vmodal-overlay"
        @click.self="$emit('update:modelValue', false)"
      >
        <div class="vmodal" :style="{ maxWidth: width }">
          <div class="vmodal-header">
            <h3 class="vmodal-title">{{ title }}</h3>
            <button
              class="vmodal-close"
              @click="$emit('update:modelValue', false)"
            >
              ✕
            </button>
          </div>
          <div class="vmodal-body"><slot /></div>
          <div v-if="$slots.footer" class="vmodal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: "" },
  width: { type: String, default: "520px" },
});
defineEmits(["update:modelValue"]);
</script>

<style scoped>
.vmodal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}
.vmodal {
  background: var(--bg-1);
  border: 1px solid var(--border-md);
  border-radius: var(--radius-xl);
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}
.vmodal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border);
}
.vmodal-title {
  font-size: 1.05rem;
  font-weight: 700;
}
.vmodal-close {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: var(--radius-sm);
  transition: color 0.2s;
}
.vmodal-close:hover {
  color: var(--text);
}
.vmodal-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.vmodal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.modal-enter-active,
.modal-leave-active {
  transition:
    opacity 0.25s,
    transform 0.25s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .vmodal,
.modal-leave-to .vmodal {
  transform: scale(0.96) translateY(8px);
}
</style>
