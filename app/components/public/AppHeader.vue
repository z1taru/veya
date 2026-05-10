<template>
  <header class="header" :class="{ scrolled }">
    <div class="container header-inner">
      <NuxtLink to="/" class="logo">Veya<span>.</span></NuxtLink>
      <nav class="nav hide-mobile">
        <NuxtLink to="/about">О проекте</NuxtLink>
        <NuxtLink to="/pricing">Тарифы</NuxtLink>
        <NuxtLink to="/waitlist">Waitlist</NuxtLink>
      </nav>
      <div class="header-actions">
        <NuxtLink to="/login" class="btn-ghost hide-mobile">Войти</NuxtLink>
        <NuxtLink to="/register" class="btn-cta">Начать</NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const scrolled = ref(false);
function onScroll() {
  scrolled.value = window.scrollY > 40;
}
onMounted(() => {
  window.addEventListener("scroll", onScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.25rem 0;
  transition: all 0.3s;
}
.header.scrolled {
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  padding: 0.9rem 0;
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  font-family: "Syne", sans-serif;
  font-weight: 800;
  font-size: 1.4rem;
  color: var(--green);
  letter-spacing: -0.02em;
}
.logo span {
  color: var(--text);
}
.nav {
  display: flex;
  gap: 2rem;
}
.nav a {
  font-size: 0.875rem;
  color: var(--text-muted);
  transition: color 0.2s;
}
.nav a:hover,
.nav a.router-link-active {
  color: var(--text);
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.btn-ghost {
  font-size: 0.875rem;
  color: var(--text-muted);
  padding: 0.5rem 1rem;
  border-radius: 100px;
  transition: color 0.2s;
}
.btn-ghost:hover {
  color: var(--text);
}
.btn-cta {
  background: var(--green);
  color: #000;
  font-family: "Syne", sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  padding: 0.55rem 1.25rem;
  border-radius: 100px;
  transition: opacity 0.2s;
}
.btn-cta:hover {
  opacity: 0.85;
}
</style>
