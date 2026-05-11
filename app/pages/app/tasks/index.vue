<template>
  <div class="tasks-page">
    <div class="page-head">
      <div>
        <h2>Задачи</h2>
        <p class="text-muted text-sm">{{ filteredTasks.length }} задач</p>
      </div>
      <VButton @click="showModal = true">+ Новая задача</VButton>
    </div>

    <VTabs v-model="filter" :tabs="tabs" />

    <p v-if="tasks.loading" class="text-muted text-sm">Загружаем задачи...</p>
    <p v-if="tasks.error" class="page-error">{{ tasks.error }}</p>

    <div v-if="!tasks.loading && filteredTasks.length" class="tasks-list fade-in">
      <TaskCard
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @click="goTask"
      />
    </div>
    <EmptyState
      v-else-if="!tasks.loading"
      icon="✅"
      title="Задач нет"
      subtitle="Создайте первую задачу для семьи"
    />

    <CreateTaskModal v-model="showModal" @created="() => {}" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTasksStore } from "~/stores/tasks";
import { useAuthStore } from "~/stores/auth";
import TaskCard from "~/components/public/TaskCard.vue";
import EmptyState from "~/components/public/EmptyState.vue";
import CreateTaskModal from "~/components/app/CreateTaskModal.vue";
import VButton from "~/components/ui/VButton.vue";
import VTabs from "~/components/ui/VTabs.vue";

definePageMeta({ layout: "app", middleware: "auth" });

const router = useRouter();
const tasks = useTasksStore();
const auth = useAuthStore();

const showModal = ref(false);
const filter = ref("all");

onMounted(() => {
  tasks.fetchTasks().catch(() => {});
});

const tabs = computed(() => [
  { value: "all", label: "Все", count: tasks.tasks.length },
  {
    value: "mine",
    label: "Мои",
    count: tasks.tasks.filter((t) => t.assigneeId === auth.user?.id).length,
  },
  {
    value: "created",
    label: "Назначил(а) я",
    count: tasks.tasks.filter((t) => t.creatorId === auth.user?.id).length,
  },
  {
    value: "done",
    label: "Выполненные",
    count: tasks.tasks.filter((t) => t.status === "done").length,
  },
]);

const filteredTasks = computed(() =>
  tasks.filteredTasks(filter.value, auth.user?.id),
);

function goTask(task) {
  router.push(`/app/tasks/${task.id}`);
}
</script>

<style scoped>
.tasks-page {
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
.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.page-error {
  font-size: 0.82rem;
  color: var(--red);
}
</style>
