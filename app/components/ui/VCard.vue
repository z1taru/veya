<template>
  <div :class="['vcard', { 'vcard--hover': hover, 'vcard--green': green }]">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  hover: { type: Boolean, default: false },
  green: { type: Boolean, default: false },
});
</script>

<style scoped>
.vcard {
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
}
.vcard--hover {
  transition:
    border-color 0.2s,
    transform 0.2s;
}
.vcard--hover:hover {
  border-color: var(--border-md);
  transform: translateY(-1px);
}
.vcard--green {
  border-color: var(--green-border);
  background: rgba(60, 255, 138, 0.03);
}
</style>
