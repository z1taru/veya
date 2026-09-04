<template>
  <div class="landing">

    <!-- ═══ Hero ═════════════════════════════════════════════ -->
    <section class="hero">
      <div class="hero-ambient" />
      <div class="container hero-inner">

        <div class="hero-content">
          <div class="section-label hero-tag">
            <Sparkles :size="11" />
            Семейная AI-сеть
          </div>
          <h1>
            Дом, который<br />
            <span class="gradient-text">помнит всё</span>
          </h1>
          <p class="hero-sub">
            Veya помогает семье координировать дела, покупки, расписание и
            заботу о близких — одним словом или командой.
          </p>
          <div class="hero-actions">
            <NuxtLink to="/waitlist" class="btn-primary">Вступить в waitlist</NuxtLink>
            <NuxtLink to="/about" class="btn-ghost">
              Узнать больше <ArrowRight :size="14" />
            </NuxtLink>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-n">3 сек</span>
              <span class="stat-l">создать задачу</span>
            </div>
            <div class="stat-sep" />
            <div class="stat">
              <span class="stat-n stat-n--amber">AI</span>
              <span class="stat-l">без кликов</span>
            </div>
            <div class="stat-sep" />
            <div class="stat">
              <span class="stat-n stat-n--rose">∞</span>
              <span class="stat-l">напоминаний</span>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hv-card hv-card--main">
            <div class="hv-header">
              <div class="hv-mac-dots">
                <span class="mac-dot red" />
                <span class="mac-dot yellow" />
                <span class="mac-dot green" />
              </div>
              <span class="hv-app-name">Veya</span>
            </div>
            <div class="hv-task">
              <div class="hv-task-row">
                <CheckCircle :size="15" class="icon-mint" />
                <span class="hv-task-text">Прийти и посидеть с детьми</span>
              </div>
              <div class="hv-task-meta">Алдияру · Сегодня 19:00</div>
            </div>
            <div class="hv-task hv-task--pending">
              <div class="hv-task-row">
                <Circle :size="15" class="icon-dim" />
                <span class="hv-task-text">Позвонить врачу</span>
              </div>
              <div class="hv-task-meta">Маме · Завтра 10:00</div>
            </div>
            <div class="hv-separator" />
            <div class="hv-ai-row">
              <div class="hv-ai-chip">
                <Sparkles :size="12" />
              </div>
              <p class="hv-ai-text">«Напомни бабушке о лекарстве в 20:00»</p>
              <span class="hv-done">Создано ✓</span>
            </div>
          </div>
          <div class="hv-mini-row">
            <div class="hv-card hv-card--mini">
              <ShoppingCart :size="15" class="icon-amber" />
              <div>
                <div class="hv-mini-title">Покупки</div>
                <div class="hv-mini-sub">4 позиции · 1 ✓</div>
              </div>
            </div>
            <div class="hv-card hv-card--mini">
              <Bell :size="15" class="icon-rose" />
              <div>
                <div class="hv-mini-title">Напоминания</div>
                <div class="hv-mini-sub">3 активных</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ═══ Problem ══════════════════════════════════════════ -->
    <section class="section section-alt" ref="probEl">
      <div class="container fade-section" :class="{ 'is-visible': probVisible }">
        <div class="section-label">Проблема</div>
        <h2>Важное теряется в потоке</h2>
        <div class="cards-3 mt-3">
          <div v-for="p in problems" :key="p.title" class="item-card">
            <div class="card-icon" :class="p.color">
              <component :is="p.icon" :size="18" />
            </div>
            <h4>{{ p.title }}</h4>
            <p>{{ p.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Steps ════════════════════════════════════════════ -->
    <section class="section" ref="stepsEl">
      <div class="container fade-section" :class="{ 'is-visible': stepsVisible }">
        <div class="section-label">Как это работает</div>
        <h2>Три шага — и дом организован</h2>
        <div class="steps-grid mt-3">
          <div v-for="(s, i) in steps" :key="s.title" class="step-card">
            <div class="step-top">
              <span class="step-num">{{ i + 1 }}</span>
              <component :is="s.icon" :size="20" class="step-icon" />
            </div>
            <h4>{{ s.title }}</h4>
            <p>{{ s.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Scenario ═════════════════════════════════════════ -->
    <section class="section">
      <div class="container">
        <div class="scenario-card">
          <div class="section-label">Главный сценарий</div>
          <h2>«Напомни Алдияру прийти в 19:00»</h2>
          <p class="scenario-desc">
            Вы пишете или говорите — Veya понимает, создаёт задачу, назначает
            участника и отправляет уведомление. Без лишних кликов.
          </p>
          <div class="flow mt-3">
            <template v-for="(f, i) in flow" :key="f">
              <span class="flow-chip">{{ f }}</span>
              <ArrowRight v-if="i < flow.length - 1" :size="13" class="flow-sep" />
            </template>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Features ═════════════════════════════════════════ -->
    <section class="section section-alt" ref="featEl">
      <div class="container fade-section" :class="{ 'is-visible': featVisible }">
        <div class="section-label">Возможности</div>
        <h2>Всё для семьи в одном месте</h2>
        <div class="cards-3 mt-3">
          <div v-for="f in features" :key="f.title" class="feat-card">
            <div class="card-icon violet">
              <component :is="f.icon" :size="18" />
            </div>
            <h4>{{ f.title }}</h4>
            <p>{{ f.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Comparison ═══════════════════════════════════════ -->
    <section class="section">
      <div class="container">
        <div class="section-label">Сравнение</div>
        <h2>Veya против обычных приложений</h2>
        <div class="compare mt-3">
          <div class="cmp-head">
            <div />
            <div>Telegram / заметки</div>
            <div class="cmp-veya">Veya</div>
          </div>
          <div v-for="row in compareRows" :key="row.label" class="cmp-row">
            <div class="cmp-label">{{ row.label }}</div>
            <div class="cmp-no"><X :size="13" /></div>
            <div class="cmp-yes"><Check :size="13" /></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Pricing ══════════════════════════════════════════ -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-label">Тарифы</div>
        <h2>Начните бесплатно</h2>
        <div class="plans mt-3">
          <div class="plan-card">
            <div class="plan-name">Free</div>
            <div class="plan-price">Бесплатно</div>
            <div class="plan-hint">До 3 участников, 20 задач</div>
          </div>
          <div class="plan-card plan-popular">
            <div class="plan-badge">Популярный</div>
            <div class="plan-name">Family</div>
            <div class="plan-price">990 ₸<span>/мес</span></div>
            <div class="plan-hint">До 6 участников, всё включено</div>
          </div>
          <div class="plan-card">
            <div class="plan-name">Family+</div>
            <div class="plan-price">1 990 ₸<span>/мес</span></div>
            <div class="plan-hint">До 10 участников, забота о пожилых</div>
          </div>
        </div>
        <div class="text-center mt-3">
          <NuxtLink to="/pricing" class="link-more">Подробнее о тарифах →</NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══ CTA ══════════════════════════════════════════════ -->
    <section class="section cta-section">
      <div class="cta-ambient" />
      <div class="container">
        <div class="cta-block">
          <h2>Будьте первыми</h2>
          <p>Вступите в waitlist и получите ранний доступ к Veya бесплатно.</p>
          <WaitlistForm />
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import {
  Sparkles, ArrowRight, CheckCircle, Circle,
  ShoppingCart, Bell, MessageCircle, Brain,
  HeartHandshake, UserPlus, MessageSquare,
  BellRing, CheckSquare, Pill, Users, X, Check,
} from '@lucide/vue'
import WaitlistForm from '~/components/public/WaitlistForm.vue'

definePageMeta({ layout: 'default' })

// ── scroll reveal ──────────────────────────────────────────
const probEl = ref(null)
const stepsEl = ref(null)
const featEl = ref(null)
const probVisible = ref(false)
const stepsVisible = ref(false)
const featVisible = ref(false)

useIntersectionObserver(probEl, ([e]) => { if (e.isIntersecting) probVisible.value = true }, { threshold: 0.1 })
useIntersectionObserver(stepsEl, ([e]) => { if (e.isIntersecting) stepsVisible.value = true }, { threshold: 0.1 })
useIntersectionObserver(featEl, ([e]) => { if (e.isIntersecting) featVisible.value = true }, { threshold: 0.1 })

// ── data ───────────────────────────────────────────────────
const problems = [
  { icon: MessageCircle,  color: 'blue',   title: 'Сообщения теряются',    text: 'Важные просьбы тонут в чатах семьи.' },
  { icon: Brain,          color: 'purple', title: 'Всё в голове одного',   text: 'Один человек помнит за всех — это изматывает.' },
  { icon: HeartHandshake, color: 'rose',   title: 'Пожилые родственники',  text: 'Сложно контролировать лекарства и визиты.' },
]

const steps = [
  { icon: UserPlus,      title: 'Создайте семейную сеть',     text: 'Добавьте близких — каждый видит общие задачи и покупки.' },
  { icon: MessageSquare, title: 'Пишите своими словами',      text: 'AI-помощник поймёт команду и создаст задачу автоматически.' },
  { icon: BellRing,      title: 'Семья получает уведомления', text: 'Нужный человек видит свою задачу и может ответить.' },
]

const flow = ['Вы пишете команду', 'AI разбирает', 'Создаётся задача', 'Уведомление участнику', 'Готово ✓']

const features = [
  { icon: CheckSquare,  title: 'Задачи',          text: 'Назначайте дела любому участнику семьи.' },
  { icon: ShoppingCart, title: 'Покупки',          text: 'Один список для всех — отмечайте в магазине.' },
  { icon: Bell,         title: 'Напоминания',      text: 'Повторяющиеся и разовые, с назначением.' },
  { icon: Sparkles,     title: 'AI-помощник',      text: 'Команды своими словами — Veya поймёт.' },
  { icon: Users,        title: 'Семья',            text: 'До 10 человек в одном пространстве.' },
  { icon: Pill,         title: 'Забота о близких', text: 'Напоминания о лекарствах и визитах врача.' },
]

const compareRows = [
  { label: 'Для всей семьи' },
  { label: 'Назначение задач' },
  { label: 'AI-парсер команд' },
  { label: 'Семейный список покупок' },
  { label: 'Статусы и история' },
]
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════
   Hero
═══════════════════════════════════════════════════════════ */
.hero {
  padding: 9rem 0 5rem;
  position: relative;
  overflow: hidden;
}
.hero-ambient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 65% -5%, rgba(123, 97, 255, 0.18) 0%, transparent 52%),
    radial-gradient(ellipse at 15% 85%, rgba(255, 169, 64, 0.07) 0%, transparent 45%),
    radial-gradient(ellipse at 90% 70%, rgba(255, 107, 157, 0.05) 0%, transparent 35%);
}
.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
}
.hero-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
}
h1 {
  font-size: clamp(2.6rem, 5vw, 4.25rem);
  line-height: 1.04;
}
.gradient-text {
  background: linear-gradient(120deg, #7B61FF 0%, #FFA940 65%, #FF6B9D 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub {
  font-size: 1.05rem;
  color: var(--text-muted);
  max-width: 460px;
  line-height: 1.75;
}
.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}
.btn-primary {
  background: linear-gradient(135deg, #7B61FF 0%, #9B7BFF 100%);
  color: #fff;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.875rem 2rem;
  border-radius: 100px;
  box-shadow: 0 4px 20px rgba(123, 97, 255, 0.3);
  transition: box-shadow 0.25s, transform 0.15s;
}
.btn-primary:hover {
  box-shadow: 0 8px 32px rgba(123, 97, 255, 0.45);
  transform: translateY(-2px);
}
.btn-primary:active {
  transform: translateY(0);
}
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
  font-size: 0.9rem;
  padding: 0.875rem 1.5rem;
  border-radius: 100px;
  border: 1px solid var(--border-md);
  transition: all 0.2s;
}
.btn-ghost:hover {
  border-color: var(--violet-border);
  color: var(--text);
  background: var(--violet-dark);
}
.hero-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-top: 0.25rem;
}
.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.stat-n {
  font-size: 1.1rem;
  font-weight: 800;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--violet);
}
.stat-n--amber { color: var(--amber); }
.stat-n--rose  { color: var(--rose); }
.stat-l {
  font-size: 0.68rem;
  color: var(--text-dim);
  letter-spacing: 0.03em;
}
.stat-sep {
  width: 1px;
  height: 28px;
  background: var(--border-md);
}

/* ── Hero visual ─────────────────────────────────────── */
.hero-visual {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.hv-card {
  background: var(--bg-2);
  border: 1px solid var(--border-md);
  border-radius: var(--radius-xl);
  padding: 1.25rem;
}
.hv-card--main {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-color: var(--violet-border);
  box-shadow:
    0 0 0 1px rgba(123, 97, 255, 0.06),
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(123, 97, 255, 0.08);
}
.hv-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 0.1rem;
}
.hv-mac-dots { display: flex; gap: 5px; }
.mac-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.mac-dot.red    { background: #ff5f57; }
.mac-dot.yellow { background: #febc2e; }
.mac-dot.green  { background: #28c840; }
.hv-app-name {
  margin-left: 4px;
  font-size: 0.72rem;
  font-weight: 700;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--text-muted);
}
.hv-task {
  background: var(--bg-3);
  border-radius: var(--radius-md);
  padding: 0.7rem 0.85rem;
}
.hv-task--pending { opacity: 0.45; }
.hv-task-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 3px;
}
.hv-task-text {
  font-size: 0.875rem;
  font-weight: 500;
}
.hv-task-meta {
  font-size: 0.68rem;
  color: var(--text-muted);
  padding-left: 23px;
}
.hv-separator {
  height: 1px;
  background: var(--border);
}
.hv-ai-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.hv-ai-chip {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  background: var(--violet-dark);
  border: 1px solid var(--violet-border);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--violet);
}
.hv-ai-text {
  flex: 1;
  font-size: 0.77rem;
  color: var(--text-muted);
  font-style: italic;
}
.hv-done {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--mint);
  white-space: nowrap;
}
.hv-mini-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}
.hv-card--mini {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  transition: border-color 0.2s;
}
.hv-card--mini:hover {
  border-color: var(--violet-border);
}
.hv-mini-title {
  font-size: 0.8rem;
  font-weight: 600;
}
.hv-mini-sub {
  font-size: 0.68rem;
  color: var(--text-muted);
  margin-top: 2px;
}
.icon-mint   { color: var(--mint); }
.icon-amber  { color: var(--amber); }
.icon-rose   { color: var(--rose); }
.icon-dim    { color: var(--text-dim); }

/* ═══════════════════════════════════════════════════════════
   Shared
═══════════════════════════════════════════════════════════ */
.section {
  padding: 5.5rem 0;
}
.section h2 {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  margin-top: 0.5rem;
}
.section-alt {
  background: var(--bg-1);
}
.fade-section {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.fade-section.is-visible {
  opacity: 1;
  transform: none;
}
.cards-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.card-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.35rem;
}
.card-icon.violet { background: var(--violet-dark);            color: var(--violet); border: 1px solid var(--violet-border); }
.card-icon.blue   { background: rgba(92,168,255,0.1);          color: #5CA8FF;       border: 1px solid rgba(92,168,255,0.22); }
.card-icon.purple { background: rgba(155,123,255,0.1);         color: #9B7BFF;       border: 1px solid rgba(155,123,255,0.22); }
.card-icon.rose   { background: var(--rose-glow);              color: var(--rose);   border: 1px solid var(--rose-border); }
.card-icon.amber  { background: var(--amber-dark);             color: var(--amber);  border: 1px solid var(--amber-border); }

/* ═══════════════════════════════════════════════════════════
   Problem cards
═══════════════════════════════════════════════════════════ */
.item-card {
  background: var(--bg-0);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  transition: border-color 0.2s, transform 0.2s;
}
.item-card:hover {
  border-color: var(--violet-border);
  transform: translateY(-2px);
}
.item-card h4 { font-size: 1rem; }
.item-card p  { font-size: 0.85rem; color: var(--text-muted); line-height: 1.65; }

/* ═══════════════════════════════════════════════════════════
   Steps
═══════════════════════════════════════════════════════════ */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.step-card {
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: border-color 0.2s, transform 0.2s;
}
.step-card:hover {
  border-color: var(--violet-border);
  transform: translateY(-2px);
}
.step-top {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.step-num {
  width: 32px;
  height: 32px;
  background: var(--violet-dark);
  border: 1px solid var(--violet-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  font-weight: 800;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--violet);
  flex-shrink: 0;
}
.step-icon { color: var(--violet); }
.step-card h4 { font-size: 1rem; }
.step-card p  { font-size: 0.85rem; color: var(--text-muted); line-height: 1.65; }

/* ═══════════════════════════════════════════════════════════
   Scenario
═══════════════════════════════════════════════════════════ */
.scenario-card {
  background: var(--bg-1);
  border: 1px solid var(--violet-border);
  border-radius: var(--radius-xl);
  padding: 3rem;
  position: relative;
  overflow: hidden;
}
.scenario-card::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 320px;
  height: 320px;
  background: radial-gradient(ellipse, rgba(255, 169, 64, 0.07) 0%, transparent 70%);
  pointer-events: none;
}
.scenario-card::after {
  content: '';
  position: absolute;
  bottom: -60px;
  left: -60px;
  width: 240px;
  height: 240px;
  background: radial-gradient(ellipse, rgba(123, 97, 255, 0.08) 0%, transparent 70%);
  pointer-events: none;
}
.scenario-card h2 {
  font-size: clamp(1.25rem, 3vw, 2rem);
  margin: 0.5rem 0 0.75rem;
}
.scenario-desc {
  color: var(--text-muted);
  max-width: 520px;
  line-height: 1.7;
}
.flow {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  position: relative;
  z-index: 1;
}
.flow-chip {
  background: var(--bg-3);
  border: 1px solid var(--border-md);
  border-radius: 100px;
  padding: 0.35rem 0.95rem;
  font-size: 0.78rem;
  transition: border-color 0.2s, color 0.2s;
}
.flow-chip:last-child {
  border-color: var(--violet-border);
  color: var(--violet);
  background: var(--violet-dark);
}
.flow-sep { color: var(--text-dim); }

/* ═══════════════════════════════════════════════════════════
   Features
═══════════════════════════════════════════════════════════ */
.feat-card {
  background: var(--bg-0);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s;
}
.feat-card:hover {
  border-color: var(--violet-border);
  box-shadow: 0 0 28px rgba(123, 97, 255, 0.08);
  transform: translateY(-2px);
}
.feat-card h4 { font-size: 1rem; }
.feat-card p  { font-size: 0.85rem; color: var(--text-muted); line-height: 1.65; }

/* ═══════════════════════════════════════════════════════════
   Comparison
═══════════════════════════════════════════════════════════ */
.compare {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  max-width: 680px;
}
.cmp-head,
.cmp-row {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
}
.cmp-head {
  background: var(--bg-2);
  font-size: 0.78rem;
  font-weight: 600;
}
.cmp-head > *,
.cmp-row > * {
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid var(--border);
}
.cmp-veya    { color: var(--violet); font-weight: 700; }
.cmp-label   { font-size: 0.85rem; color: var(--text-muted); }
.cmp-no      { display: flex; align-items: center; color: var(--text-dim); }
.cmp-yes     { display: flex; align-items: center; color: var(--violet); font-weight: 600; }
.cmp-row:last-child > * { border-bottom: none; }
.cmp-row:hover { background: var(--violet-dark); }

/* ═══════════════════════════════════════════════════════════
   Pricing
═══════════════════════════════════════════════════════════ */
.plans {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 700px;
}
.plan-card {
  background: var(--bg-0);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  position: relative;
  transition: border-color 0.2s, transform 0.2s;
}
.plan-card:hover {
  border-color: var(--violet-border);
  transform: translateY(-2px);
}
.plan-popular {
  border-color: var(--violet-border);
  background: var(--violet-dark);
  box-shadow: 0 0 32px rgba(123, 97, 255, 0.1);
}
.plan-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #7B61FF, #9B7BFF);
  color: #fff;
  font-size: 0.62rem;
  font-weight: 700;
  padding: 0.2rem 0.8rem;
  border-radius: 100px;
  white-space: nowrap;
  letter-spacing: 0.04em;
}
.plan-name  { font-size: 0.82rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.35rem; }
.plan-price { font-size: 1.3rem; font-weight: 800; font-family: 'Plus Jakarta Sans', sans-serif; }
.plan-price span { font-size: 0.78rem; color: var(--text-muted); font-family: 'Inter', sans-serif; font-weight: 300; }
.plan-hint  { font-size: 0.7rem; color: var(--text-dim); margin-top: 0.35rem; line-height: 1.5; }
.link-more  { font-size: 0.85rem; color: var(--violet); transition: opacity 0.2s; }
.link-more:hover { opacity: 0.75; }

/* ═══════════════════════════════════════════════════════════
   CTA
═══════════════════════════════════════════════════════════ */
.cta-section {
  background: var(--bg-1);
  position: relative;
  overflow: hidden;
}
.cta-ambient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 50% 50%, rgba(123, 97, 255, 0.12) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 20%, rgba(255, 169, 64, 0.05) 0%, transparent 40%);
  pointer-events: none;
}
.cta-block {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
}
.cta-block h2 { font-size: clamp(1.75rem, 4vw, 2.6rem); }
.cta-block > p { color: var(--text-muted); }

/* ═══════════════════════════════════════════════════════════
   Utils / Responsive
═══════════════════════════════════════════════════════════ */
.text-center { text-align: center; }
.mt-3 { margin-top: 1.5rem; }

@media (max-width: 768px) {
  .hero-inner   { grid-template-columns: 1fr; gap: 2.5rem; }
  .hero-visual  { display: none; }
  .cards-3      { grid-template-columns: 1fr; }
  .steps-grid   { grid-template-columns: 1fr; }
  .plans        { grid-template-columns: 1fr; }
}
</style>
