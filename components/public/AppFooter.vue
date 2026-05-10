<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <div class="logo">Veya<span>.</span></div>
        <p>Семейная AI-сеть</p>
      </div>
      <div class="footer-links">
        <NuxtLink to="/about">О проекте</NuxtLink>
        <NuxtLink to="/pricing">Тарифы</NuxtLink>
        <NuxtLink to="/waitlist">Waitlist</NuxtLink>
        <NuxtLink to="/login">Войти</NuxtLink>
      </div>
      <p class="footer-copy">© 2025 Veya</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding: 2.5rem 0;
  margin-top: 4rem;
}
.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.logo {
  font-family: "Syne", sans-serif;
  font-weight: 800;
  font-size: 1.2rem;
  color: var(--green);
}
.logo span {
  color: var(--text);
}
.footer-brand p {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}
.footer-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.footer-links a {
  font-size: 0.82rem;
  color: var(--text-muted);
  transition: color 0.2s;
}
.footer-links a:hover {
  color: var(--green);
}
.footer-copy {
  font-size: 0.78rem;
  color: var(--text-dim);
}
</style>
