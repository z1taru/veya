<template>
  <div class="auth-wrap">
    <div class="auth-card fade-up">
      <NuxtLink to="/" class="auth-logo">Veya<span>.</span></NuxtLink>
      <h1>Создать аккаунт</h1>
      <p class="auth-sub">Начните организовывать семейную жизнь</p>

      <form class="auth-form" @submit.prevent="submit">
        <VInput
          v-model="form.fullName"
          label="Ваше имя"
          placeholder="Динара Сейткали"
        />
        <VInput
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="email@example.com"
        />
        <VInput
          v-model="form.password"
          label="Пароль"
          type="password"
          placeholder="Минимум 6 символов"
        />
        <VInput
          v-model="form.familyName"
          label="Название семьи"
          placeholder="Семья Сейткали"
        />

        <p v-if="error" class="auth-error">{{ error }}</p>

        <VButton :loading="loading" full type="submit">Создать аккаунт</VButton>
      </form>

      <p class="auth-hint">
        Уже есть аккаунт? <NuxtLink to="/login">Войти</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import VInput from "~/components/ui/VInput.vue";
import VButton from "~/components/ui/VButton.vue";

definePageMeta({ layout: "default" });

const router = useRouter();
const auth = useAuthStore();

const form = ref({ fullName: "", email: "", password: "", familyName: "" });
const error = ref("");
const loading = ref(false);

async function submit() {
  error.value = "";
  const fullName = form.value.fullName.trim();
  const email = form.value.email.trim();
  const password = form.value.password;
  const familyName = form.value.familyName.trim();

  if (!fullName) {
    error.value = "Введите имя";
    return;
  }
  if (!email) {
    error.value = "Введите email";
    return;
  }
  if (!password) {
    error.value = "Введите пароль";
    return;
  }
  if (!familyName) {
    error.value = "Введите название семьи";
    return;
  }

  loading.value = true;
  const res = await auth.register({
    fullName,
    email,
    password,
    familyName,
  });
  if (res.ok) {
    router.push("/onboarding");
  } else {
    error.value = res.error;
  }
  loading.value = false;
}
</script>

<style scoped>
.auth-wrap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}
.auth-card {
  width: 100%;
  max-width: 420px;
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.auth-logo {
  font-family: "Syne", sans-serif;
  font-weight: 800;
  font-size: 1.4rem;
  color: var(--green);
  margin-bottom: 0.5rem;
  display: inline-block;
}
.auth-logo span {
  color: var(--text);
}
h1 {
  font-size: 1.5rem;
}
.auth-sub {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0.5rem 0;
}
.auth-error {
  font-size: 0.82rem;
  color: var(--red);
  background: rgba(255, 92, 92, 0.08);
  border: 1px solid rgba(255, 92, 92, 0.2);
  border-radius: var(--radius-sm);
  padding: 0.6rem 0.9rem;
}
.auth-hint {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-top: 0.5rem;
  text-align: center;
}
.auth-hint a {
  color: var(--green);
}
</style>
