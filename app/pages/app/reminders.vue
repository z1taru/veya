<template>
  <div class="reminders-page">
    <div class="page-head">
      <div>
        <h2>Напоминания</h2>
        <p class="text-muted text-sm">
          {{ filteredReminders.length }} напоминаний
        </p>
      </div>
      <NuxtLink to="/app/ai" class="ai-cta-btn"> ✨ Создать через AI </NuxtLink>
    </div>

    <VTabs v-model="filter" :tabs="tabs" />

    <p v-if="store.loading" class="text-muted text-sm">Загружаем напоминания...</p>
    <p v-if="store.error" class="page-error">{{ store.error }}</p>

    <div v-if="!store.loading && filteredReminders.length" class="reminders-list fade-in">
      <ReminderCard
        v-for="reminder in filteredReminders"
        :key="reminder.id"
        :reminder="reminder"
        @toggle="toggleReminder"
      />
    </div>
    <EmptyState
      v-else-if="!store.loading"
      icon="🔔"
      title="Напоминаний нет"
      subtitle="Создайте напоминание через AI-помощника"
    >
      <NuxtLink to="/app/ai" class="empty-cta">✨ Открыть AI-помощник</NuxtLink>
    </EmptyState>

    <!-- Повторяющиеся -->
    <section v-if="recurringReminders.length" class="recurring-section">
      <h3 class="section-title">🔁 Повторяющиеся</h3>
      <div class="reminders-list">
        <ReminderCard
          v-for="reminder in recurringReminders"
          :key="reminder.id + '_r'"
          :reminder="reminder"
          @toggle="toggleReminder"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useRemindersStore } from "~/stores/reminders";
import ReminderCard from "~/components/app/ReminderCard.vue";
import EmptyState from "~/components/public/EmptyState.vue";
import VTabs from "~/components/ui/VTabs.vue";

definePageMeta({ layout: "app", middleware: "auth" });

const auth = useAuthStore();
const store = useRemindersStore();

const filter = ref("all");
const reminders = computed(() => store.reminders);

onMounted(() => {
  store.fetchReminders().catch(() => {});
});

const tabs = computed(() => [
  { value: "all", label: "Все", count: reminders.value.length },
  {
    value: "personal",
    label: "Личные",
    count: reminders.value.filter((r) => r.assigneeId === auth.user?.id).length,
  },
  {
    value: "family",
    label: "Семейные",
    count: reminders.value.filter((r) => r.assigneeId !== auth.user?.id).length,
  },
  {
    value: "recurring",
    label: "Повтор",
    count: reminders.value.filter((r) => r.repeat).length,
  },
]);

const filteredReminders = computed(() => {
  switch (filter.value) {
    case "personal":
      return reminders.value.filter((r) => r.assigneeId === auth.user?.id);
    case "family":
      return reminders.value.filter((r) => r.assigneeId !== auth.user?.id);
    case "recurring":
      return reminders.value.filter((r) => r.repeat);
    default:
      return reminders.value;
  }
});

const recurringReminders = computed(() =>
  filter.value !== "recurring" ? reminders.value.filter((r) => r.repeat) : [],
);

function toggleReminder(id) {
  const r = reminders.value.find((r) => r.id === id);
  if (r) store.updateReminder(id, { active: !r.active }).catch(() => {});
}
</script>

<style scoped>
.reminders-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.page-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}
.page-head h2 {
  font-size: 1.5rem;
}

.ai-cta-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.25rem;
  background: rgba(60, 255, 138, 0.08);
  border: 1px solid var(--green-border);
  border-radius: 100px;
  font-size: 0.85rem;
  color: var(--green);
  font-weight: 600;
  transition: background 0.2s;
}
.ai-cta-btn:hover {
  background: rgba(60, 255, 138, 0.15);
}

.reminders-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.recurring-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.section-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-muted);
}

.empty-cta {
  display: inline-block;
  margin-top: 0.75rem;
  padding: 0.6rem 1.5rem;
  background: rgba(60, 255, 138, 0.08);
  border: 1px solid var(--green-border);
  border-radius: 100px;
  font-size: 0.85rem;
  color: var(--green);
  font-weight: 600;
  transition: background 0.2s;
}
.empty-cta:hover {
  background: rgba(60, 255, 138, 0.15);
}
.page-error {
  font-size: 0.82rem;
  color: var(--red);
}
</style>
