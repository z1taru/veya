<template>
  <div class="dashboard">
    <!-- Greeting -->
    <div class="dash-greeting fade-up">
      <h1>Привет, {{ userName }} 👋</h1>
      <p class="text-muted">{{ todayLabel }}</p>
    </div>

    <p v-if="pageLoading" class="text-muted text-sm">Загружаем данные...</p>
    <p v-if="pageError" class="page-error">{{ pageError }}</p>

    <!-- Stats -->
    <div class="stat-grid fade-up">
      <div class="stat-card">
        <div class="stat-icon">✅</div>
        <div class="stat-val">{{ activeTasks }}</div>
        <div class="stat-label">Активных задач</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🏆</div>
        <div class="stat-val">{{ doneTodayCount }}</div>
        <div class="stat-label">Выполнено сегодня</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">👨‍👩‍👧</div>
        <div class="stat-val">{{ membersCount }}</div>
        <div class="stat-label">Участников семьи</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🛒</div>
        <div class="stat-val">{{ shoppingRemaining }}</div>
        <div class="stat-label">Товаров в покупках</div>
      </div>
    </div>

    <div class="dash-cols">
      <!-- Left col -->
      <div class="dash-main">
        <!-- Today tasks -->
        <section class="dash-section">
          <div class="section-head">
            <h3>Сегодня</h3>
            <NuxtLink to="/app/tasks" class="link-more">Все задачи →</NuxtLink>
          </div>
          <div v-if="todayTasks.length" class="tasks-list">
            <TaskCard
              v-for="task in todayTasks.slice(0, 5)"
              :key="task.id"
              :task="task"
              @click="goTask"
            />
          </div>
          <EmptyState
            v-else
            icon="📅"
            title="Сегодня задач нет"
            subtitle="Создайте первую задачу"
          />
        </section>

        <!-- AI box -->
        <section class="dash-section">
          <div class="section-head">
            <h3>✨ AI-помощник</h3>
          </div>
          <VCard>
            <AiCommandBox />
          </VCard>
        </section>
      </div>

      <!-- Right col -->
      <div class="dash-side">
        <!-- Quick actions -->
        <section class="dash-section">
          <h3>Быстрые действия</h3>
          <div class="quick-actions mt-2">
            <button class="qa-btn" @click="showModal = true">
              <span>✅</span> Новая задача
            </button>
            <NuxtLink to="/app/shopping" class="qa-btn">
              <span>🛒</span> Покупки
            </NuxtLink>
            <NuxtLink to="/app/reminders" class="qa-btn">
              <span>🔔</span> Напоминания
            </NuxtLink>
            <NuxtLink to="/app/family" class="qa-btn">
              <span>👨‍👩‍👧</span> Семья
            </NuxtLink>
          </div>
        </section>

        <!-- Family members -->
        <section class="dash-section">
          <div class="section-head">
            <h3>Семья</h3>
            <NuxtLink to="/app/family" class="link-more">Все →</NuxtLink>
          </div>
          <div class="members-list mt-2">
            <div
              v-for="m in members.slice(0, 4)"
              :key="m.id"
              class="member-row"
            >
              <div class="member-avatar">
                {{ getInitials(memberName(m)) }}
              </div>
              <div>
                <div class="member-name">{{ memberName(m) }}</div>
                <div class="member-tasks">
                  {{ memberTaskCount(m.id) }} задач
                </div>
              </div>
              <div class="member-dot" />
            </div>
          </div>
        </section>

        <!-- Shopping preview -->
        <section class="dash-section">
          <div class="section-head">
            <h3>Покупки</h3>
            <NuxtLink to="/app/shopping" class="link-more">Открыть →</NuxtLink>
          </div>
          <VCard class="mt-2">
            <div class="shopping-progress">
              <div class="sp-bar">
                <div
                  class="sp-fill"
                  :style="{ width: shoppingProgress + '%' }"
                />
              </div>
              <div class="sp-label">
                {{ shoppingDone }} из {{ shoppingTotal }}
              </div>
            </div>
            <div class="shopping-preview-list mt-2">
              <div
                v-for="item in shoppingItems.slice(0, 4)"
                :key="item.id"
                :class="['sp-item', { 'sp-done': item.done }]"
              >
                <span class="sp-check">{{ item.done ? "✓" : "○" }}</span>
                {{ item.name }}
              </div>
            </div>
          </VCard>
        </section>
      </div>
    </div>

    <CreateTaskModal v-model="showModal" @created="() => {}" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { useTasksStore } from "~/stores/tasks";
import { useFamilyStore } from "~/stores/family";
import { useShoppingStore } from "~/stores/shopping";
import {
  getInitials,
  getMemberDisplayName,
  getUserDisplayName,
} from "~/utils/displayNames";
import TaskCard from "~/components/public/TaskCard.vue";
import EmptyState from "~/components/public/EmptyState.vue";
import AiCommandBox from "~/components/app/AiCommandBox.vue";
import CreateTaskModal from "~/components/app/CreateTaskModal.vue";
import VCard from "~/components/ui/VCard.vue";

definePageMeta({ layout: "app", middleware: "auth" });

const router = useRouter();
const auth = useAuthStore();
const tasksStore = useTasksStore();
const familyStore = useFamilyStore();
const shoppingStore = useShoppingStore();

const showModal = ref(false);
const pageLoading = ref(false);
const pageError = ref("");

onMounted(async () => {
  pageLoading.value = true;
  pageError.value = "";
  const results = await Promise.allSettled([
    auth.fetchMe(),
    familyStore.fetchCurrentFamily(),
    tasksStore.fetchTasks(),
    shoppingStore.fetchItems(),
  ]);
  pageLoading.value = false;
  const failed = results.find((result) => result.status === "rejected");
  if (failed) pageError.value = "Не удалось загрузить часть данных";
});

const userName = computed(() => getUserDisplayName(auth.user));
const memberName = (member) => getMemberDisplayName(member);

const todayLabel = computed(() => {
  return new Date().toLocaleDateString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
});

const todayStr = new Date().toISOString().split("T")[0];
const todayTasks = computed(() =>
  tasksStore.tasks.filter((t) => t.dueDate === todayStr && t.status !== "done"),
);
const activeTasks = computed(
  () =>
    tasksStore.tasks.filter((t) => !["done", "declined"].includes(t.status))
      .length,
);
const doneTodayCount = computed(
  () =>
    tasksStore.tasks.filter(
      (t) => t.status === "done" && t.dueDate === todayStr,
    ).length,
);
const members = computed(() => familyStore.members);
const membersCount = computed(() => familyStore.members.length);

const shoppingRemaining = computed(() => shoppingStore.remaining);
const shoppingDone = computed(() => shoppingStore.done);
const shoppingTotal = computed(() => shoppingStore.total);
const shoppingProgress = computed(() => shoppingStore.progress);
const shoppingItems = computed(() => shoppingStore.items);

function memberTaskCount(id) {
  return tasksStore.tasks.filter(
    (t) => t.assigneeId === id && t.status !== "done",
  ).length;
}

function goTask(task) {
  router.push(`/app/tasks/${task.id}`);
}
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.dash-greeting h1 {
  font-size: 1.75rem;
  margin-bottom: 0.25rem;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
@media (max-width: 768px) {
  .stat-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
.stat-card {
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.stat-icon {
  font-size: 1.3rem;
}
.stat-val {
  font-size: 2rem;
  font-weight: 700;
  font-family: "Syne", sans-serif;
  line-height: 1;
}
.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.dash-cols {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2rem;
  align-items: flex-start;
}
@media (max-width: 900px) {
  .dash-cols {
    grid-template-columns: 1fr;
  }
}

.dash-main,
.dash-side {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dash-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.section-head h3 {
  font-size: 1rem;
  font-weight: 600;
}
.link-more {
  font-size: 0.8rem;
  color: var(--text-muted);
  transition: color 0.2s;
}
.link-more:hover {
  color: var(--green);
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.page-error {
  font-size: 0.82rem;
  color: var(--red);
}

.quick-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}
.qa-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 0.82rem;
  color: var(--text-muted);
  cursor: pointer;
  font-family: inherit;
  text-decoration: none;
  transition: all 0.2s;
}
.qa-btn:hover {
  border-color: var(--border-md);
  color: var(--text);
}

.members-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.member-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--border);
}
.member-row:last-child {
  border-bottom: none;
}
.member-avatar {
  width: 32px;
  height: 32px;
  background: var(--green-dark);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--green);
  flex-shrink: 0;
}
.member-name {
  font-size: 0.85rem;
  font-weight: 500;
}
.member-tasks {
  font-size: 0.72rem;
  color: var(--text-muted);
}
.member-dot {
  width: 7px;
  height: 7px;
  background: var(--green);
  border-radius: 50%;
  margin-left: auto;
}

.shopping-progress {
}
.sp-bar {
  height: 4px;
  background: var(--bg-3);
  border-radius: 2px;
  overflow: hidden;
}
.sp-fill {
  height: 100%;
  background: var(--green);
  border-radius: 2px;
  transition: width 0.3s;
}
.sp-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.4rem;
}
.shopping-preview-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.sp-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
}
.sp-done {
  opacity: 0.4;
  text-decoration: line-through;
}
.sp-check {
  color: var(--green);
  font-size: 0.75rem;
  width: 14px;
}
</style>
