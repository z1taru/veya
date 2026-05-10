<template>
  <div class="pricing-page">
    <div class="container">
      <div class="pricing-hero fade-up">
        <div class="section-label">Тарифы</div>
        <h1>Просто и честно</h1>
        <p>Начните бесплатно. Расширьте, когда нужно.</p>
      </div>

      <div class="plans-grid mt-4">
        <div
          v-for="plan in plans"
          :key="plan.id"
          :class="['plan-card', { 'plan-popular': plan.popular }]"
        >
          <div v-if="plan.popular" class="plan-badge">Популярный</div>
          <div class="plan-name">{{ plan.name }}</div>
          <div class="plan-price">
            <span class="plan-amount">{{ plan.price }}</span>
            <span class="plan-period" v-if="plan.price !== 'Бесплатно'">
              / мес</span
            >
          </div>
          <p class="plan-desc">{{ plan.desc }}</p>
          <ul class="plan-features">
            <li v-for="f in plan.features" :key="f">
              <span class="feat-check">✓</span> {{ f }}
            </li>
          </ul>
          <NuxtLink
            to="/waitlist"
            :class="[
              'plan-btn',
              plan.popular ? 'plan-btn--primary' : 'plan-btn--secondary',
            ]"
          >
            {{ plan.cta }}
          </NuxtLink>
        </div>
      </div>

      <!-- Compare table -->
      <div class="compare-section mt-4">
        <h2 class="compare-title">Сравнение тарифов</h2>
        <div class="compare-table mt-3">
          <div class="ct-head">
            <div>Функция</div>
            <div>Free</div>
            <div>Family</div>
            <div class="ct-plus">Family+</div>
          </div>
          <div v-for="row in compareRows" :key="row.label" class="ct-row">
            <div class="ct-label">{{ row.label }}</div>
            <div>{{ row.free }}</div>
            <div>{{ row.family }}</div>
            <div class="ct-plus">{{ row.plus }}</div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="pricing-cta mt-4">
        <p>
          Мы в раннем доступе — все тарифы временно бесплатны для участников
          waitlist.
        </p>
        <NuxtLink to="/waitlist" class="btn-cta-big"
          >Вступить в waitlist</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "default" });

const plans = [
  {
    id: "free",
    name: "Free",
    price: "Бесплатно",
    desc: "Для одного человека или небольшой семьи.",
    popular: false,
    cta: "Начать",
    features: [
      "До 3 участников",
      "До 20 задач",
      "Список покупок",
      "Базовые напоминания",
      "AI-помощник (5 команд/день)",
    ],
  },
  {
    id: "family",
    name: "Family",
    price: "990 ₸",
    desc: "Для активной семьи с общими задачами.",
    popular: true,
    cta: "Выбрать Family",
    features: [
      "До 6 участников",
      "Неограниченные задачи",
      "Список покупок",
      "Повторяющиеся напоминания",
      "AI-помощник (50 команд/день)",
      "История задач",
    ],
  },
  {
    id: "plus",
    name: "Family+",
    price: "1 990 ₸",
    desc: "Для больших семей с заботой о пожилых.",
    popular: false,
    cta: "Выбрать Family+",
    features: [
      "До 10 участников",
      "Всё из Family",
      "AI-помощник без лимита",
      "Модуль заботы о пожилых",
      "Пуш-уведомления",
      "Приоритетная поддержка",
    ],
  },
];

const compareRows = [
  { label: "Участники", free: "3", family: "6", plus: "10" },
  { label: "Задачи", free: "до 20", family: "∞", plus: "∞" },
  { label: "Список покупок", free: "✓", family: "✓", plus: "✓" },
  { label: "AI-команды/день", free: "5", family: "50", plus: "∞" },
  { label: "Напоминания", free: "базовые", family: "повтор.", plus: "повтор." },
  { label: "Забота о пожилых", free: "✕", family: "✕", plus: "✓" },
  { label: "История задач", free: "✕", family: "✓", plus: "✓" },
  { label: "Пуш-уведомления", free: "✕", family: "✕", plus: "✓" },
];
</script>

<style scoped>
.pricing-page {
  padding-top: 7rem;
  padding-bottom: 5rem;
}
.pricing-hero {
  text-align: center;
  margin-bottom: 1rem;
}
.pricing-hero h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 0.75rem;
}
.pricing-hero p {
  color: var(--text-muted);
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
@media (max-width: 768px) {
  .plans-grid {
    grid-template-columns: 1fr;
  }
}

.plan-card {
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
}
.plan-popular {
  border-color: var(--green-border);
  background: rgba(60, 255, 138, 0.03);
}
.plan-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--green);
  color: #000;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.25rem 1rem;
  border-radius: 100px;
  white-space: nowrap;
}
.plan-name {
  font-family: "Syne", sans-serif;
  font-weight: 700;
  font-size: 1rem;
}
.plan-price {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}
.plan-amount {
  font-size: 1.75rem;
  font-weight: 700;
  font-family: "Syne", sans-serif;
  color: var(--text);
}
.plan-period {
  font-size: 0.82rem;
  color: var(--text-muted);
}
.plan-desc {
  font-size: 0.82rem;
  color: var(--text-muted);
}
.plan-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  margin: 0.5rem 0;
}
.plan-features li {
  font-size: 0.85rem;
  display: flex;
  gap: 0.5rem;
}
.feat-check {
  color: var(--green);
  font-weight: 700;
}
.plan-btn {
  display: block;
  text-align: center;
  padding: 0.75rem;
  border-radius: 100px;
  font-family: "Syne", sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  transition: opacity 0.2s;
  margin-top: 0.5rem;
}
.plan-btn:hover {
  opacity: 0.85;
}
.plan-btn--primary {
  background: var(--green);
  color: #000;
}
.plan-btn--secondary {
  background: var(--bg-3);
  color: var(--text);
  border: 1px solid var(--border);
}

.compare-section {
  max-width: 800px;
  margin: 0 auto;
}
.compare-title {
  font-size: 1.5rem;
}
.compare-table {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.ct-head,
.ct-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  border-bottom: 1px solid var(--border);
}
.ct-head {
  background: var(--bg-2);
  font-size: 0.8rem;
  font-weight: 600;
}
.ct-head > *,
.ct-row > * {
  padding: 0.85rem 1rem;
}
.ct-plus {
  color: var(--green);
  font-weight: 600;
}
.ct-label {
  font-size: 0.85rem;
  color: var(--text-muted);
}
.ct-row {
  font-size: 0.85rem;
}
.ct-row:last-child {
  border-bottom: none;
}

.pricing-cta {
  text-align: center;
  padding: 3rem 0;
  border-top: 1px solid var(--border);
}
.pricing-cta p {
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
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
