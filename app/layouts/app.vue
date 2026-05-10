<template>
  <div class="layout-app">
    <AppSidebar />
    <div class="layout-main">
      <AppTopbar />
      <main class="layout-content">
        <slot />
      </main>
    </div>
    <!-- Mobile nav -->
    <nav class="mobile-nav hide-desktop">
      <NuxtLink to="/app" class="mnav-item" exact-active-class="active">
        <span class="mnav-icon">🏠</span>
        <span>Главная</span>
      </NuxtLink>
      <NuxtLink to="/app/tasks" class="mnav-item" active-class="active">
        <span class="mnav-icon">✅</span>
        <span>Задачи</span>
      </NuxtLink>
      <NuxtLink to="/app/shopping" class="mnav-item" active-class="active">
        <span class="mnav-icon">🛒</span>
        <span>Покупки</span>
      </NuxtLink>
      <NuxtLink to="/app/ai" class="mnav-item" active-class="active">
        <span class="mnav-icon">✨</span>
        <span>AI</span>
      </NuxtLink>
      <NuxtLink to="/app/settings" class="mnav-item" active-class="active">
        <span class="mnav-icon">⚙️</span>
        <span>Настройки</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
import AppSidebar from "~/components/app/AppSidebar.vue";
import AppTopbar from "~/components/app/AppTopbar.vue";
</script>

<style scoped>
.layout-app {
  display: flex;
  min-height: 100vh;
  background: var(--bg-0);
}
.layout-main {
  flex: 1;
  margin-left: var(--sidebar-w);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.layout-content {
  flex: 1;
  padding: 2rem;
  max-width: 1100px;
  width: 100%;
}

.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-1);
  border-top: 1px solid var(--border);
  display: flex;
  z-index: 200;
}
.mnav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 0.6rem 0.25rem;
  font-size: 0.6rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}
.mnav-item.active {
  color: var(--green);
}
.mnav-icon {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .layout-main {
    margin-left: 0;
    padding-bottom: 60px;
  }
  .layout-content {
    padding: 1rem;
  }
}
</style>
