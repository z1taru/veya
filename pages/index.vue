<template>
  <div class="landing">
    <!-- Hero -->
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-content fade-up">
          <div class="section-label">Семейная AI-сеть</div>
          <h1>Дом, который<br /><span class="text-green">помнит всё</span></h1>
          <p class="hero-sub">
            Veya помогает семье координировать дела, покупки, расписание и
            заботу о близких — одним словом или командой.
          </p>
          <div class="hero-actions">
            <NuxtLink to="/waitlist" class="btn-hero-primary"
              >Вступить в waitlist</NuxtLink
            >
            <NuxtLink to="/about" class="btn-hero-ghost"
              >Узнать больше</NuxtLink
            >
          </div>
          <p class="hero-note">Ранний доступ · Бесплатно</p>
        </div>

        <div class="hero-visual fade-in">
          <div class="hv-card">
            <div class="hv-row">
              <span class="hv-dot green" />
              <span class="hv-label">Алдияру · Сегодня в 19:00</span>
            </div>
            <p class="hv-title">Прийти и посидеть с детьми</p>
            <div class="hv-badge">✅ Принято</div>
          </div>
          <div class="hv-card hv-card--sm">
            <div class="hv-row">
              <span class="hv-dot yellow" />
              <span class="hv-label">Список покупок</span>
            </div>
            <p class="hv-title">Молоко, хлеб, яйца + 3</p>
          </div>
          <div class="hv-card hv-card--ai">
            <span class="ai-icon">✨</span>
            <p>«Напомни бабушке о лекарстве каждый день в 20:00»</p>
            <div class="hv-badge">Создано ✓</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Problem -->
    <section class="section section-problem">
      <div class="container">
        <div class="section-label">Проблема</div>
        <h2>Важное теряется в потоке</h2>
        <div class="grid-3 mt-3">
          <div v-for="p in problems" :key="p.title" class="problem-card">
            <div class="problem-icon">{{ p.icon }}</div>
            <h4>{{ p.title }}</h4>
            <p>{{ p.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="section">
      <div class="container">
        <div class="section-label">Как это работает</div>
        <h2>Три шага — и дом организован</h2>
        <div class="steps mt-3">
          <div v-for="(s, i) in steps" :key="s.title" class="step-item">
            <div class="step-num">{{ i + 1 }}</div>
            <div>
              <h4>{{ s.title }}</h4>
              <p>{{ s.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main scenario -->
    <section class="section section-scenario">
      <div class="container">
        <div class="scenario-card">
          <div class="section-label">Главный сценарий</div>
          <h2>«Напомни Алдияру прийти в 19:00»</h2>
          <p>
            Вы пишете или говорите — Veya понимает, создаёт задачу, назначает
            участника и отправляет уведомление. Без лишних кликов.
          </p>
          <div class="scenario-flow mt-3">
            <div v-for="(f, i) in flow" :key="f" class="flow-item">
              <span class="flow-step">{{ f }}</span>
              <span v-if="i < flow.length - 1" class="flow-arrow">→</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="section">
      <div class="container">
        <div class="section-label">Возможности</div>
        <h2>Всё для семьи в одном месте</h2>
        <div class="grid-3 mt-3">
          <div v-for="f in features" :key="f.title" class="feat-card">
            <div class="feat-icon">{{ f.icon }}</div>
            <h4>{{ f.title }}</h4>
            <p>{{ f.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison -->
    <section class="section">
      <div class="container">
        <div class="section-label">Сравнение</div>
        <h2>Veya против обычных приложений</h2>
        <div class="compare-table mt-3">
          <div class="ct-head">
            <div></div>
            <div>Telegram, заметки</div>
            <div class="ct-veya">Veya</div>
          </div>
          <div v-for="row in compareRows" :key="row.label" class="ct-row">
            <div class="ct-label">{{ row.label }}</div>
            <div class="ct-no">✕</div>
            <div class="ct-yes">✓</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing preview -->
    <section class="section">
      <div class="container">
        <div class="section-label">Тарифы</div>
        <h2>Начните бесплатно</h2>
        <div class="price-preview mt-3">
          <div class="pp-card">
            <div class="pp-name">Free</div>
            <div class="pp-price">Бесплатно</div>
            <div class="pp-hint">До 3 участников, 20 задач</div>
          </div>
          <div class="pp-card pp-popular">
            <div class="pp-badge">Популярный</div>
            <div class="pp-name">Family</div>
            <div class="pp-price">990 ₸ <span>/мес</span></div>
            <div class="pp-hint">До 6 участников, всё включено</div>
          </div>
          <div class="pp-card">
            <div class="pp-name">Family+</div>
            <div class="pp-price">1 990 ₸ <span>/мес</span></div>
            <div class="pp-hint">До 10 участников, забота о пожилых</div>
          </div>
        </div>
        <div class="text-center mt-3">
          <NuxtLink to="/pricing" class="link-more"
            >Подробнее о тарифах →</NuxtLink
          >
        </div>
      </div>
    </section>

    <!-- Waitlist CTA -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-block fade-up">
          <h2>Будьте первыми</h2>
          <p>Вступите в waitlist и получите ранний доступ к Veya бесплатно.</p>
          <WaitlistForm />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import WaitlistForm from "~/components/public/WaitlistForm.vue";
definePageMeta({ layout: "default" });

const problems = [
  {
    icon: "💬",
    title: "Сообщения теряются",
    text: "Важные просьбы тонут в чатах семьи.",
  },
  {
    icon: "🧠",
    title: "Всё в голове одного",
    text: "Один человек помнит за всех — это изматывает.",
  },
  {
    icon: "👴",
    title: "Пожилые родственники",
    text: "Сложно контролировать лекарства и визиты.",
  },
];

const steps = [
  {
    title: "Создайте семейную сеть",
    text: "Добавьте близких — каждый видит общие задачи и покупки.",
  },
  {
    title: "Пишите своими словами",
    text: "AI-помощник поймёт команду и создаст задачу автоматически.",
  },
  {
    title: "Семья получает уведомления",
    text: "Нужный человек видит свою задачу и может ответить.",
  },
];

const flow = [
  "Вы пишете команду",
  "AI разбирает",
  "Создаётся задача",
  "Уведомление участнику",
  "Готово ✓",
];

const features = [
  {
    icon: "✅",
    title: "Задачи",
    text: "Назначайте дела любому участнику семьи.",
  },
  {
    icon: "🛒",
    title: "Покупки",
    text: "Один список для всех — отмечайте в магазине.",
  },
  {
    icon: "🔔",
    title: "Напоминания",
    text: "Повторяющиеся и разовые, с назначением.",
  },
  {
    icon: "✨",
    title: "AI-помощник",
    text: "Команды своими словами — Veya поймёт.",
  },
  { icon: "👨‍👩‍👧", title: "Семья", text: "До 10 человек в одном пространстве." },
  {
    icon: "💊",
    title: "Забота о близких",
    text: "Напоминания о лекарствах и визитах врача.",
  },
];

const compareRows = [
  { label: "Для всей семьи" },
  { label: "Назначение задач" },
  { label: "AI-парсер команд" },
  { label: "Семейный список покупок" },
  { label: "Статусы и история" },
];
</script>

<style scoped>
/* Hero */
.hero {
  padding: 9rem 0 5rem;
  position: relative;
}
.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}
@media (max-width: 768px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .hero-visual {
    display: none;
  }
}
.hero-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.05;
}
.hero-sub {
  font-size: 1.05rem;
  color: var(--text-muted);
  max-width: 480px;
  line-height: 1.7;
}
.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.btn-hero-primary {
  background: var(--green);
  color: #000;
  font-family: "Syne", sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.85rem 2rem;
  border-radius: 100px;
  transition: opacity 0.2s;
}
.btn-hero-primary:hover {
  opacity: 0.85;
}
.btn-hero-ghost {
  background: var(--bg-2);
  color: var(--text-muted);
  font-size: 0.9rem;
  padding: 0.85rem 1.75rem;
  border-radius: 100px;
  border: 1px solid var(--border);
  transition: all 0.2s;
}
.btn-hero-ghost:hover {
  border-color: var(--border-md);
  color: var(--text);
}
.hero-note {
  font-size: 0.75rem;
  color: var(--text-dim);
}

/* Hero visual */
.hero-visual {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.hv-card {
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.hv-card--sm {
  opacity: 0.8;
}
.hv-card--ai {
  border-color: var(--green-border);
  background: rgba(60, 255, 138, 0.03);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
}
.hv-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.hv-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.hv-dot.green {
  background: var(--green);
}
.hv-dot.yellow {
  background: var(--yellow);
}
.hv-label {
  font-size: 0.72rem;
  color: var(--text-muted);
}
.hv-title {
  font-size: 0.9rem;
  font-weight: 500;
}
.hv-badge {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--green);
  background: rgba(60, 255, 138, 0.1);
  border: 1px solid var(--green-border);
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
  align-self: flex-start;
}
.ai-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}
.hv-card--ai p {
  font-size: 0.82rem;
  color: var(--text-muted);
  flex: 1;
  font-style: italic;
}

/* Sections */
.section {
  padding: 5rem 0;
}
.section h2 {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  margin-top: 0.5rem;
}
.section-problem {
  background: var(--bg-1);
}

.problem-card {
  background: var(--bg-0);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}
.problem-icon {
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
}
.problem-card h4 {
  margin-bottom: 0.4rem;
}
.problem-card p {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
}
.step-item {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
}
.step-num {
  width: 36px;
  height: 36px;
  background: var(--green-dark);
  border: 1px solid var(--green-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--green);
  flex-shrink: 0;
}
.step-item h4 {
  margin-bottom: 0.25rem;
}
.step-item p {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.section-scenario {
}
.scenario-card {
  background: var(--bg-1);
  border: 1px solid var(--green-border);
  border-radius: var(--radius-xl);
  padding: 3rem;
}
.scenario-card h2 {
  font-size: clamp(1.25rem, 3vw, 2rem);
  margin: 0.5rem 0 0.75rem;
}
.scenario-card p {
  color: var(--text-muted);
  max-width: 540px;
}
.scenario-flow {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}
.flow-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.flow-step {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 0.3rem 0.9rem;
  font-size: 0.78rem;
}
.flow-arrow {
  color: var(--text-dim);
}

.feat-card {
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  transition: border-color 0.2s;
}
.feat-card:hover {
  border-color: var(--border-md);
}
.feat-icon {
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
}
.feat-card h4 {
  margin-bottom: 0.4rem;
}
.feat-card p {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.compare-table {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  max-width: 700px;
}
.ct-head,
.ct-row {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
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
.ct-veya {
  color: var(--green);
  font-weight: 700;
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

/* Price preview */
.price-preview {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 700px;
}
@media (max-width: 768px) {
  .price-preview {
    grid-template-columns: 1fr;
  }
}
.pp-card {
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  position: relative;
}
.pp-popular {
  border-color: var(--green-border);
  background: rgba(60, 255, 138, 0.03);
}
.pp-badge {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--green);
  color: #000;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.2rem 0.75rem;
  border-radius: 100px;
  white-space: nowrap;
}
.pp-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 0.3rem;
}
.pp-price {
  font-size: 1.3rem;
  font-weight: 700;
  font-family: "Syne", sans-serif;
}
.pp-price span {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-family: "Inter", sans-serif;
  font-weight: 300;
}
.pp-hint {
  font-size: 0.72rem;
  color: var(--text-dim);
  margin-top: 0.3rem;
}
.link-more {
  font-size: 0.85rem;
  color: var(--green);
}
.text-center {
  text-align: center;
}

/* CTA */
.cta-section {
  background: var(--bg-1);
}
.cta-block {
  max-width: 520px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.cta-block h2 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
}
.cta-block p {
  color: var(--text-muted);
}
</style>
