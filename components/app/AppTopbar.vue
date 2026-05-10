<template>
  <header class="topbar">
    <div class="topbar-title">
      <h2>{{ title }}</h2>
      <span v-if="subtitle" class="topbar-sub">{{ subtitle }}</span>
    </div>
    <div class="topbar-right">
      <NuxtLink to="/app/ai" class="ai-btn" title="AI-помощник">
        <span>✨</span> AI
      </NuxtLink>
      <NuxtLink to="/app/settings" class="avatar-btn">
        {{ initials }}
      </NuxtLink>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();
const route = useRoute();

const initials = computed(() =>
  auth.user ? auth.user.name.slice(0, 2).toUpperCase() : "?",
);

const TITLES = {
  "/app": { title: "Обзор", subtitle: null },
  "/app/tasks": { title: "Задачи", subtitle: null },
  "/app/shopping": { title: "Список покупок", subtitle: null },
  "/app/reminders": { title: "Напоминания", subtitle: null },
  "/app/family": { title: "Семья", subtitle: null },
  "/app/ai": { title: "AI-помощник", subtitle: "Напишите своими словами" },
  "/app/settings": { title: "Настройки", subtitle: null },
};

const title = computed(() => TITLES[route.path]?.title || "Veya");
const subtitle = computed(() => TITLES[route.path]?.subtitle || null);
</script>

<style scoped>
.topbar {
  height: var(--topbar-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  border-bottom: 1px solid var(--border);
  background: var(--bg-0);
  position: sticky;
  top: 0;
  z-index: 40;
}
.topbar-title {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}
.topbar-title h2 {
  font-size: 1.05rem;
  font-weight: 700;
}
.topbar-sub {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: "Inter", sans-serif;
  font-weight: 300;
}
.topbar-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ai-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.9rem;
  background: rgba(60, 255, 138, 0.08);
  border: 1px solid var(--green-border);
  border-radius: 100px;
  font-size: 0.78rem;
  color: var(--green);
  font-weight: 600;
  transition: background 0.2s;
}
.ai-btn:hover {
  background: rgba(60, 255, 138, 0.15);
}
.avatar-btn {
  width: 32px;
  height: 32px;
  background: var(--green-dark);
  color: var(--green);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
}
.avatar-btn:hover {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .topbar {
    padding: 0 1rem;
  }
}
</style>
