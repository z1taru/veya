<template>
  <div class="about-page">
    <div class="container">
      <!-- Hero -->
      <section class="about-hero fade-up">
        <div class="section-label">О проекте</div>
        <h1>Что такое Veya?</h1>
        <p class="hero-sub">
          Veya — семейная AI-сеть, которая помогает дому помнить всё: дела,
          покупки, расписание, просьбы и заботу о близких.
        </p>
      </section>

      <!-- Problem -->
      <section class="about-section">
        <div class="section-label">Проблема</div>
        <h2>Семьи теряют важное в потоке</h2>
        <div class="grid-2 mt-3">
          <div v-for="p in problems" :key="p.title" class="prob-card">
            <div class="prob-icon">{{ p.icon }}</div>
            <h4>{{ p.title }}</h4>
            <p>{{ p.text }}</p>
          </div>
        </div>
      </section>

      <!-- Solution -->
      <section class="about-section">
        <div class="section-label">Решение</div>
        <h2>Veya держит дом в голове</h2>
        <p class="section-sub">
          Один общий пространство для задач, покупок, напоминаний и семейного
          расписания. Управляйте голосом или текстом — AI-помощник разберёт
          команду и распределит задачи.
        </p>
        <div class="grid-3 mt-3">
          <div v-for="f in features" :key="f.title" class="feat-card">
            <div class="feat-icon">{{ f.icon }}</div>
            <h4>{{ f.title }}</h4>
            <p>{{ f.text }}</p>
          </div>
        </div>
      </section>

      <!-- vs others -->
      <section class="about-section">
        <div class="section-label">Отличие</div>
        <h2>Не просто напоминалка</h2>
        <div class="compare-table mt-3">
          <div class="ct-head">
            <div></div>
            <div>Обычные приложения</div>
            <div class="ct-veya">Veya</div>
          </div>
          <div v-for="row in compareRows" :key="row.label" class="ct-row">
            <div class="ct-label">{{ row.label }}</div>
            <div class="ct-no">✕</div>
            <div class="ct-yes">✓</div>
          </div>
        </div>
      </section>

      <!-- Vision -->
      <section class="about-section vision-section">
        <div class="section-label">Vision</div>
        <h2>Семья как система</h2>
        <p>
          Мы верим, что технологии должны снижать когнитивную нагрузку на всю
          семью — не только на одного человека. Veya — это операционная система
          для дома.
        </p>
      </section>

      <!-- Roadmap -->
      <section class="about-section">
        <div class="section-label">Roadmap</div>
        <h2>Что впереди</h2>
        <div class="roadmap mt-3">
          <div v-for="item in roadmap" :key="item.q" class="rm-item">
            <div class="rm-q">{{ item.q }}</div>
            <div class="rm-text">{{ item.text }}</div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="about-cta">
        <h2>Попробуйте первыми</h2>
        <NuxtLink to="/waitlist" class="btn-cta-big"
          >Вступить в waitlist</NuxtLink
        >
      </section>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "default" });

const problems = [
  {
    icon: "💬",
    title: "Разговоры в мессенджерах",
    text: "Важные просьбы тонут в чатах и забываются.",
  },
  {
    icon: "🧠",
    title: "Всё в голове одного",
    text: "Мама или папа держат всё в уме — это выматывает.",
  },
  {
    icon: "🔔",
    title: "Напоминания не доходят",
    text: "Стикеры и голосовые сообщения теряются.",
  },
  {
    icon: "👴",
    title: "Пожилые родственники",
    text: "Сложно следить за лекарствами и визитами врача.",
  },
];

const features = [
  {
    icon: "✅",
    title: "Семейные задачи",
    text: "Назначайте дела любому члену семьи.",
  },
  {
    icon: "🛒",
    title: "Список покупок",
    text: "Один общий список для всей семьи.",
  },
  {
    icon: "🔔",
    title: "Напоминания",
    text: "Повторяющиеся и одноразовые, с назначением.",
  },
  {
    icon: "✨",
    title: "AI-помощник",
    text: "Пишите своими словами — AI разберёт и создаст задачу.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Семейная сеть",
    text: "До 10 участников в одном пространстве.",
  },
  { icon: "📱", title: "Везде", text: "Работает на телефоне и компьютере." },
];

const compareRows = [
  { label: "Для всей семьи, а не одного" },
  { label: "Назначение задач участникам" },
  { label: "AI-парсер команд" },
  { label: "Забота о пожилых" },
  { label: "Семейный список покупок" },
];

const roadmap = [
  { q: "Q1 2025", text: "Запуск waitlist и MVP: задачи, покупки, AI-парсер" },
  { q: "Q2 2025", text: "Мобильное приложение и пуш-уведомления" },
  { q: "Q3 2025", text: "Голосовые команды и интеграция с календарём" },
  { q: "Q4 2025", text: "Модуль заботы о пожилых, напоминания о лекарствах" },
];
</script>

<style scoped>
.about-page {
  padding-top: 7rem;
  padding-bottom: 5rem;
}
.about-hero {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 5rem;
}
.about-hero h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 1.25rem;
}
.hero-sub {
  font-size: 1.1rem;
  color: var(--text-muted);
  line-height: 1.7;
}

.about-section {
  margin-bottom: 5rem;
}
.about-section h2 {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  margin-bottom: 0.5rem;
}
.section-sub {
  color: var(--text-muted);
  max-width: 600px;
  margin-top: 0.5rem;
}

.prob-card,
.feat-card {
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}
.prob-icon,
.feat-icon {
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
}
.prob-card h4,
.feat-card h4 {
  font-size: 1rem;
  margin-bottom: 0.4rem;
}
.prob-card p,
.feat-card p {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.compare-table {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.ct-head,
.ct-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid var(--border);
}
.ct-head {
  background: var(--bg-2);
  font-size: 0.8rem;
  font-weight: 600;
}
.ct-head > *,
.ct-row > * {
  padding: 0.85rem 1.25rem;
}
.ct-head div:nth-child(2) {
  color: var(--text-muted);
}
.ct-veya {
  color: var(--green);
}
.ct-label {
  font-size: 0.85rem;
  color: var(--text-muted);
}
.ct-no {
  color: var(--text-dim);
}
.ct-yes {
  color: var(--green);
  font-weight: 600;
}
.ct-row:last-child {
  border-bottom: none;
}

.vision-section {
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
}
.vision-section p {
  color: var(--text-muted);
  max-width: 580px;
  margin-top: 0.75rem;
  line-height: 1.7;
}

.roadmap {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.rm-item {
  display: flex;
  gap: 2rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--border);
  align-items: flex-start;
}
.rm-item:last-child {
  border-bottom: none;
}
.rm-q {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--green);
  min-width: 80px;
  padding-top: 0.15rem;
}
.rm-text {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.about-cta {
  text-align: center;
  padding: 4rem 0;
  border-top: 1px solid var(--border);
}
.about-cta h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}
.btn-cta-big {
  display: inline-block;
  background: var(--green);
  color: #000;
  font-family: "Syne", sans-serif;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.85rem 2.25rem;
  border-radius: 100px;
  transition: opacity 0.2s;
}
.btn-cta-big:hover {
  opacity: 0.85;
}
</style>
