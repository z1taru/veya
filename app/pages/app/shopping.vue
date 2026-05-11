<template>
  <div class="shopping-page">
    <div class="page-head">
      <div>
        <h2>Список покупок</h2>
        <p class="text-muted text-sm">{{ store.remaining }} товаров осталось</p>
      </div>
    </div>

    <!-- Progress -->
    <VCard>
      <div class="sp-header">
        <span class="sp-title">Прогресс</span>
        <span class="sp-pct">{{ store.progress }}%</span>
      </div>
      <div class="sp-bar mt-1">
        <div class="sp-fill" :style="{ width: store.progress + '%' }" />
      </div>
      <div class="sp-counts text-sm text-muted mt-1">
        {{ store.done }} куплено · {{ store.remaining }} осталось ·
        {{ store.total }} всего
      </div>
    </VCard>

    <!-- Add item -->
    <VCard>
      <div class="add-form">
        <VInput
          v-model="newItem.name"
          placeholder="Название товара"
          @keydown.enter="addItem"
        />
        <VInput
          v-model="newItem.qty"
          placeholder="Кол-во (необяз.)"
          style="max-width: 140px"
        />
        <VSelect
          v-model="newItem.category"
          :options="catOpts"
          placeholder="Категория"
          style="max-width: 160px"
        />
        <VButton :disabled="!newItem.name.trim()" @click="addItem"
          >Добавить</VButton
        >
      </div>
    </VCard>

    <!-- Filter tabs -->
    <VTabs v-model="filter" :tabs="tabs" />

    <p v-if="store.loading" class="text-muted text-sm">Загружаем покупки...</p>
    <p v-if="store.error" class="page-error">{{ store.error }}</p>

    <!-- List -->
    <div v-if="!store.loading && filteredItems.length" class="items-list fade-in">
      <ShoppingItem
        v-for="item in filteredItems"
        :key="item.id"
        :item="item"
        @toggle="store.toggleItem"
        @delete="store.deleteItem"
      />
    </div>
    <EmptyState
      v-else-if="!store.loading"
      icon="🛒"
      title="Список пуст"
      subtitle="Добавьте первый товар"
    />

    <!-- Clear completed -->
    <div v-if="store.done > 0" class="clear-row">
      <VButton variant="outline" size="sm" @click="store.clearCompleted">
        Очистить купленные ({{ store.done }})
      </VButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useShoppingStore } from "~/stores/shopping";
import { useAuthStore } from "~/stores/auth";
import ShoppingItem from "~/components/app/ShoppingItem.vue";
import EmptyState from "~/components/public/EmptyState.vue";
import VCard from "~/components/ui/VCard.vue";
import VInput from "~/components/ui/VInput.vue";
import VSelect from "~/components/ui/VSelect.vue";
import VButton from "~/components/ui/VButton.vue";
import VTabs from "~/components/ui/VTabs.vue";

definePageMeta({ layout: "app", middleware: "auth" });

const store = useShoppingStore();
const auth = useAuthStore();
const filter = ref("active");

const newItem = ref({ name: "", qty: "", category: "" });

onMounted(() => {
  store.fetchItems().catch(() => {});
});

const catOpts = [
  { value: "Молочное", label: "Молочное" },
  { value: "Выпечка", label: "Выпечка" },
  { value: "Крупы", label: "Крупы" },
  { value: "Фрукты", label: "Фрукты" },
  { value: "Мясо/рыба", label: "Мясо/рыба" },
  { value: "Аптека", label: "Аптека" },
  { value: "Бытовое", label: "Бытовое" },
  { value: "Другое", label: "Другое" },
];

const tabs = computed(() => [
  { value: "active", label: "Осталось", count: store.remaining },
  { value: "done", label: "Куплено", count: store.done },
  { value: "all", label: "Все", count: store.total },
]);

const filteredItems = computed(() => {
  if (filter.value === "active") return store.items.filter((i) => !i.done);
  if (filter.value === "done") return store.items.filter((i) => i.done);
  return store.items;
});

async function addItem() {
  if (!newItem.value.name.trim()) return;
  await store.addItem({
    name: newItem.value.name.trim(),
    qty: newItem.value.qty.trim() || null,
    category: newItem.value.category || "Другое",
    addedBy: auth.user?.id || "u1",
  });
  newItem.value = { name: "", qty: "", category: "" };
}
</script>

<style scoped>
.shopping-page {
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
.sp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sp-title {
  font-size: 0.85rem;
  font-weight: 600;
}
.sp-pct {
  font-size: 0.85rem;
  color: var(--green);
  font-weight: 700;
}
.sp-bar {
  height: 6px;
  background: var(--bg-3);
  border-radius: 3px;
  overflow: hidden;
}
.sp-fill {
  height: 100%;
  background: var(--green);
  border-radius: 3px;
  transition: width 0.4s ease;
}
.sp-counts {
  margin-top: 0.4rem;
}
.add-form {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: flex-end;
}
.add-form > *:first-child {
  flex: 1;
  min-width: 160px;
}
.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.clear-row {
  display: flex;
  justify-content: flex-end;
}
.page-error {
  font-size: 0.82rem;
  color: var(--red);
}
</style>
