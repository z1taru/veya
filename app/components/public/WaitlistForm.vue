<template>
  <div class="wl-wrap">
    <div v-if="store.submitted" class="wl-success fade-up">
      <div class="wl-check">✓</div>
      <h3>Вы в списке!</h3>
      <p>Мы напишем вам, как только откроем ранний доступ.</p>
    </div>
    <form v-else class="wl-form" @submit.prevent="submit">
      <VInput v-model="form.name" label="Ваше имя" placeholder="Динара" />
      <VInput
        v-model="form.email"
        label="Email"
        type="email"
        placeholder="email@example.com"
      />
      <VSelect
        v-model="form.familySize"
        label="Размер семьи"
        :options="sizeOptions"
        placeholder="Выберите..."
      />
      <VSelect
        v-model="form.useCase"
        label="Главный сценарий"
        :options="caseOptions"
        placeholder="Выберите..."
      />
      <VButton :loading="loading" full type="submit"
        >Вступить в waitlist</VButton
      >
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useWaitlistStore } from "~/stores/waitlist";
import VInput from "~/components/ui/VInput.vue";
import VSelect from "~/components/ui/VSelect.vue";
import VButton from "~/components/ui/VButton.vue";

const store = useWaitlistStore();
const loading = ref(false);
const form = ref({ name: "", email: "", familySize: "", useCase: "" });

const sizeOptions = [
  { value: "2", label: "2 человека" },
  { value: "3-4", label: "3–4 человека" },
  { value: "5+", label: "5 и больше" },
];
const caseOptions = [
  { value: "tasks", label: "Семейные задачи" },
  { value: "shopping", label: "Список покупок" },
  { value: "elderly", label: "Забота о пожилых" },
  { value: "kids", label: "Дети и расписание" },
];

async function submit() {
  if (!form.value.name || !form.value.email) return;
  loading.value = true;
  await store.submitWaitlist(form.value);
  loading.value = false;
}
</script>

<style scoped>
.wl-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.wl-success {
  text-align: center;
  padding: 2rem;
}
.wl-check {
  width: 56px;
  height: 56px;
  background: rgba(60, 255, 138, 0.12);
  border: 1px solid var(--green-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: var(--green);
  margin: 0 auto 1rem;
}
.wl-success h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}
.wl-success p {
  color: var(--text-muted);
  font-size: 0.9rem;
}
</style>
