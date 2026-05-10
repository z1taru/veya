<template>
  <div class="empty">
    <div class="empty-icon">{{ icon }}</div>
    <h4>{{ title }}</h4>
    <p v-if="subtitle">{{ subtitle }}</p>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  icon: { type: String, default: "📭" },
  title: { type: String, default: "Ничего нет" },
  subtitle: { type: String, default: "" },
});
</script>

<style scoped>
.empty {
  text-align: center;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}
.empty h4 {
  font-size: 1rem;
  font-weight: 600;
}
.empty p {
  font-size: 0.85rem;
  color: var(--text-muted);
}
</style>

