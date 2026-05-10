<template>
  <div class="auth-wrap">
    <div class="auth-card fade-up">
      <NuxtLink to="/" class="auth-logo">Veya<span>.</span></NuxtLink>
      <h1>Добро пожаловать</h1>
      <p class="auth-sub">Войдите в семейную сеть</p>

      <form class="auth-form" @submit.prevent="submit">
        <VInput
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="email@example.com"
          :error="errors.email"
        />
        <VInput
          v-model="form.password"
          label="Пароль"
          type="password"
          placeholder="Ваш пароль"
          :error="errors.password"
        />

        <p v-if="errors.general" class="auth-error">{{ errors.general }}</p>

        <VButton :loading="loading" full type="submit">Войти</VButton>
      </form>

      <p class="auth-hint">
        Нет аккаунта? <NuxtLink to="/register">Зарегистрироваться</NuxtLink>
      </p>
      <p class="auth-demo">
        Demo: <strong>demo@veya.app</strong> / <strong>demo123</strong>
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

const form = ref({ email: "", password: "" });
const errors = ref({ email: "", password: "", general: "" });
const loading = ref(false);

async function submit() {
  errors.value = { email: "", password: "", general: "" };
  if (!form.value.email) {
    errors.value.email = "Введите email";
    return;
  }
  if (!form.value.password) {
    errors.value.password = "Введите пароль";
    return;
  }

  loading.value = true;
  const res = await auth.login(form.value.email, form.value.password);
  loading.value = false;

  if (res.ok) {
    router.push("/app");
  } else {
    errors.value.general = res.error;
  }
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
  max-width: 400px;
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
.auth-demo {
  font-size: 0.75rem;
  color: var(--text-dim);
  text-align: center;
  border-top: 1px solid var(--border);
  padding-top: 1rem;
  margin-top: 0.5rem;
}
</style>
