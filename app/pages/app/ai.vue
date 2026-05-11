<template>
  <div class="ai-page">
    <!-- Header -->
    <div class="ai-header fade-up">
      <h2>✨ AI-помощник</h2>
      <p class="text-muted">
        Напишите команду своими словами — Veya поймёт и создаст задачу или
        добавит товар в покупки.
      </p>
    </div>

    <!-- Main command box -->
    <VCard class="ai-box-card">
      <AiCommandBox />
    </VCard>

    <!-- Examples -->
    <section class="examples-section">
      <h3>Примеры команд</h3>
      <div class="examples-grid mt-2">
        <div v-for="ex in examples" :key="ex.label" class="example-card">
          <div class="ex-icon">{{ ex.icon }}</div>
          <div class="ex-type">{{ ex.type }}</div>
          <p class="ex-text">«{{ ex.text }}»</p>
        </div>
      </div>
    </section>

    <!-- Recent actions -->
    <section v-if="recentTasks.length" class="recent-section">
      <h3>Последние созданные задачи</h3>
      <div class="recent-list mt-2">
        <div v-for="task in recentTasks" :key="task.id" class="recent-item">
          <span class="recent-icon">✅</span>
          <div class="recent-info">
            <span class="recent-title">{{ task.title }}</span>
            <span class="recent-date text-muted text-xs">{{
              task.createdAt
            }}</span>
          </div>
          <NuxtLink :to="`/app/tasks/${task.id}`" class="recent-link"
            >→</NuxtLink
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useTasksStore } from "~/stores/tasks";
import AiCommandBox from "~/components/app/AiCommandBox.vue";
import VCard from "~/components/ui/VCard.vue";

definePageMeta({ layout: "app", middleware: "auth" });

const tasks = useTasksStore();

const recentTasks = computed(() => tasks.tasks.slice(0, 5));

onMounted(() => {
  tasks.fetchTasks().catch(() => {});
});

const examples = [
  { icon: "🔔", type: "Задача", text: "Напомни Алдияру прийти в 19:00" },
  { icon: "🛒", type: "Покупки", text: "Добавь молоко и хлеб в покупки" },
  {
    icon: "🔁",
    type: "Повтор",
    text: "Каждую пятницу напомни оплатить коммуналку",
  },
  {
    icon: "💊",
    type: "Забота",
    text: "Напомни бабушке о лекарстве каждый день в 20:00",
  },
  { icon: "📋", type: "Задача", text: "Попроси маму записаться к врачу" },
  { icon: "🛍️", type: "Покупки", text: "Купи рис, гречку и яйца" },
];
</script>

<style scoped>
.ai-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 780px;
}

.ai-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.ai-header h2 {
  font-size: 1.5rem;
}
.ai-header p {
  font-size: 0.9rem;
  line-height: 1.6;
}

.ai-box-card {
  padding: 1.75rem;
}

.examples-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.examples-section h3 {
  font-size: 1rem;
  font-weight: 600;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}
@media (max-width: 768px) {
  .examples-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 480px) {
  .examples-grid {
    grid-template-columns: 1fr;
  }
}

.example-card {
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  transition: border-color 0.2s;
}
.example-card:hover {
  border-color: var(--border-md);
}
.ex-icon {
  font-size: 1.25rem;
}
.ex-type {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--green);
}
.ex-text {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-style: italic;
  line-height: 1.4;
}

.recent-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.recent-section h3 {
  font-size: 1rem;
  font-weight: 600;
}

.recent-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.recent-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}
.recent-icon {
  font-size: 1rem;
  flex-shrink: 0;
}
.recent-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.recent-title {
  font-size: 0.88rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.recent-link {
  color: var(--text-dim);
  font-size: 0.9rem;
  transition: color 0.2s;
  flex-shrink: 0;
}
.recent-link:hover {
  color: var(--green);
}
</style>
