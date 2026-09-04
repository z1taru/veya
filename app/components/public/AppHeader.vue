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
  background: rgba(6, 6, 17, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  padding: 0.85rem 0;
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 800;
  font-size: 1.45rem;
  color: var(--violet);
  letter-spacing: -0.03em;
  transition: opacity 0.2s;
}
.logo:hover { opacity: 0.85; }
.logo span {
  color: var(--amber);
}
.nav {
  display: flex;
  gap: 2rem;
}
.nav a {
  font-size: 0.875rem;
  color: var(--text-muted);
  transition: color 0.2s;
  font-weight: 400;
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
  background: linear-gradient(135deg, #7B61FF 0%, #9B7BFF 100%);
  color: #fff;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  padding: 0.55rem 1.35rem;
  border-radius: 100px;
  box-shadow: 0 4px 16px rgba(123, 97, 255, 0.28);
  transition: box-shadow 0.2s, transform 0.15s;
}
.btn-cta:hover {
  box-shadow: 0 6px 24px rgba(123, 97, 255, 0.42);
  transform: translateY(-1px);
}
.btn-cta:active {
  transform: translateY(0);
}
</style>
