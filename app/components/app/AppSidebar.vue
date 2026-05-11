<template>
  <aside class="sidebar hide-mobile">
    <div class="sidebar-logo">
      <NuxtLink to="/" class="logo">Veya<span>.</span></NuxtLink>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section-label">Главное</div>
      <NuxtLink to="/app" class="slink" exact-active-class="active">
        <span class="slink-icon">🏠</span> Обзор
      </NuxtLink>
      <NuxtLink to="/app/tasks" class="slink" active-class="active">
        <span class="slink-icon">✅</span> Задачи
        <span v-if="pendingCount" class="slink-badge">{{ pendingCount }}</span>
      </NuxtLink>
      <NuxtLink to="/app/shopping" class="slink" active-class="active">
        <span class="slink-icon">🛒</span> Покупки
        <span v-if="shoppingCount" class="slink-badge">{{
          shoppingCount
        }}</span>
      </NuxtLink>
      <NuxtLink to="/app/reminders" class="slink" active-class="active">
        <span class="slink-icon">🔔</span> Напоминания
      </NuxtLink>

      <div class="nav-section-label" style="margin-top: 1rem">Семья</div>
      <NuxtLink to="/app/family" class="slink" active-class="active">
        <span class="slink-icon">👨‍👩‍👧</span> Семья
      </NuxtLink>
      <NuxtLink to="/app/ai" class="slink" active-class="active">
        <span class="slink-icon">✨</span> AI-помощник
      </NuxtLink>
    </nav>

    <div class="sidebar-bottom">
      <NuxtLink to="/app/settings" class="slink" active-class="active">
        <span class="slink-icon">⚙️</span> Настройки
      </NuxtLink>
      <div v-if="user" class="sidebar-user">
        <div class="user-avatar">{{ initials }}</div>
        <div>
          <div class="user-name">{{ userName }}</div>
          <div class="user-role">{{ familyName }}</div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useFamilyStore } from "~/stores/family";
import { useTasksStore } from "~/stores/tasks";
import { useShoppingStore } from "~/stores/shopping";
import {
  getFamilyDisplayName,
  getInitials,
  getUserDisplayName,
} from "~/utils/displayNames";

const auth = useAuthStore();
const famStore = useFamilyStore();
const tasks = useTasksStore();
const shopping = useShoppingStore();

const user = computed(() => auth.user);
const family = computed(() => famStore.currentFamily);
const userName = computed(() => getUserDisplayName(user.value));
const familyName = computed(() => getFamilyDisplayName(family.value));
const pendingCount = computed(() => tasks.pending.length);
const shoppingCount = computed(() => shopping.remaining);
const initials = computed(() => getInitials(userName.value));
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: var(--sidebar-w);
  background: var(--bg-1);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  z-index: 50;
  padding: 1.25rem 0.75rem;
}
.sidebar-logo {
  padding: 0 0.5rem 1.5rem;
}
.logo {
  font-family: "Syne", sans-serif;
  font-weight: 800;
  font-size: 1.3rem;
  color: var(--green);
}
.logo span {
  color: var(--text);
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.nav-section-label {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
  padding: 0 0.5rem;
  margin-bottom: 0.25rem;
}
.slink {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.75rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: all 0.2s;
  position: relative;
}
.slink:hover {
  background: var(--bg-2);
  color: var(--text);
}
.slink.active {
  background: var(--bg-3);
  color: var(--text);
}
.slink-icon {
  font-size: 1rem;
}
.slink-badge {
  margin-left: auto;
  background: var(--green-dark);
  color: var(--green);
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.1rem 0.5rem;
  border-radius: 100px;
}
.sidebar-bottom {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}
.sidebar-user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
}
.user-avatar {
  width: 32px;
  height: 32px;
  background: var(--green-dark);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--green);
  flex-shrink: 0;
}
.user-name {
  font-size: 0.82rem;
  font-weight: 500;
}
.user-role {
  font-size: 0.7rem;
  color: var(--text-muted);
}
</style>
