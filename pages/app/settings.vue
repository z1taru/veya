<template>
  <div class="settings-page">
    <!-- Profile -->
    <section class="settings-section">
      <h3>Профиль</h3>
      <VCard class="mt-2">
        <div class="profile-row">
          <div class="profile-avatar">{{ initials }}</div>
          <div class="profile-info">
            <div class="profile-name">{{ user?.name }}</div>
            <div class="profile-email text-muted text-sm">
              {{ user?.email }}
            </div>
          </div>
        </div>
        <div class="form-grid mt-3">
          <VInput
            v-model="profileForm.name"
            label="Имя"
            placeholder="Ваше имя"
          />
          <VInput
            v-model="profileForm.email"
            label="Email"
            type="email"
            placeholder="email@example.com"
          />
        </div>
        <VButton class="mt-2" variant="secondary" @click="saveProfile"
          >Сохранить профиль</VButton
        >
        <p v-if="profileSaved" class="save-msg fade-in">✓ Профиль обновлён</p>
      </VCard>
    </section>

    <!-- Notifications -->
    <section class="settings-section">
      <h3>Уведомления</h3>
      <VCard class="mt-2">
        <div class="toggle-list">
          <div class="toggle-row">
            <div>
              <div class="toggle-label">Новые задачи</div>
              <div class="toggle-hint text-muted text-sm">
                Когда вам назначают задачу
              </div>
            </div>
            <button
              :class="['toggle-btn', { active: notif.tasks }]"
              @click="notif.tasks = !notif.tasks"
            >
              <span class="toggle-thumb" />
            </button>
          </div>
          <div class="toggle-row">
            <div>
              <div class="toggle-label">Напоминания</div>
              <div class="toggle-hint text-muted text-sm">
                Напоминания по расписанию
              </div>
            </div>
            <button
              :class="['toggle-btn', { active: notif.reminders }]"
              @click="notif.reminders = !notif.reminders"
            >
              <span class="toggle-thumb" />
            </button>
          </div>
          <div class="toggle-row">
            <div>
              <div class="toggle-label">Покупки</div>
              <div class="toggle-hint text-muted text-sm">
                Когда добавляют товары в список
              </div>
            </div>
            <button
              :class="['toggle-btn', { active: notif.shopping }]"
              @click="notif.shopping = !notif.shopping"
            >
              <span class="toggle-thumb" />
            </button>
          </div>
        </div>
      </VCard>
    </section>

    <!-- Language -->
    <section class="settings-section">
      <h3>Язык</h3>
      <VCard class="mt-2">
        <div class="vsel-wrap">
          <label class="vsel-label">Язык интерфейса</label>
          <select v-model="language" class="vsel">
            <option value="ru">Русский</option>
            <option value="kk">Қазақша</option>
            <option value="en">English</option>
          </select>
        </div>
      </VCard>
    </section>

    <!-- Theme -->
    <section class="settings-section">
      <h3>Тема</h3>
      <VCard class="mt-2">
        <div class="theme-options">
          <button
            v-for="t in themes"
            :key="t.value"
            :class="['theme-btn', { active: theme === t.value }]"
            @click="theme = t.value"
          >
            <span class="theme-icon">{{ t.icon }}</span>
            <span class="theme-label">{{ t.label }}</span>
          </button>
        </div>
      </VCard>
    </section>

    <!-- Family settings -->
    <section class="settings-section">
      <h3>Семья</h3>
      <VCard class="mt-2">
        <div class="family-info-row">
          <span class="text-muted text-sm">Ваша семья:</span>
          <strong>{{ family.currentFamily?.name || "—" }}</strong>
        </div>
        <div class="family-info-row mt-1">
          <span class="text-muted text-sm">Участников:</span>
          <strong>{{ family.members.length }}</strong>
        </div>
        <NuxtLink to="/app/family" class="family-link mt-2">
          Управление семьёй →
        </NuxtLink>
      </VCard>
    </section>

    <!-- Logout -->
    <section class="settings-section">
      <VCard>
        <div class="logout-row">
          <div>
            <div class="logout-title">Выйти из аккаунта</div>
            <div class="text-muted text-sm">
              Вы будете перенаправлены на страницу входа
            </div>
          </div>
          <VButton variant="danger" @click="handleLogout">Выйти</VButton>
        </div>
      </VCard>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { useFamilyStore } from "~/stores/family";
import VCard from "~/components/ui/VCard.vue";
import VInput from "~/components/ui/VInput.vue";
import VButton from "~/components/ui/VButton.vue";

definePageMeta({ layout: "app", middleware: "auth" });

const router = useRouter();
const auth = useAuthStore();
const family = useFamilyStore();

const user = computed(() => auth.user);
const initials = computed(() =>
  user.value ? user.value.name.slice(0, 2).toUpperCase() : "?",
);

const profileForm = ref({
  name: user.value?.name || "",
  email: user.value?.email || "",
});
const profileSaved = ref(false);

const notif = ref({ tasks: true, reminders: true, shopping: false });
const language = ref("ru");
const theme = ref("dark");

const themes = [
  { value: "dark", icon: "🌑", label: "Тёмная" },
  { value: "system", icon: "💻", label: "Системная" },
];

function saveProfile() {
  // mock save
  profileSaved.value = true;
  setTimeout(() => (profileSaved.value = false), 3000);
}

function handleLogout() {
  auth.logout();
  router.push("/login");
}
</script>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 640px;
}

.settings-section {
  display: flex;
  flex-direction: column;
}
.settings-section h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0;
}

.profile-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.profile-avatar {
  width: 48px;
  height: 48px;
  background: var(--green-dark);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--green);
  flex-shrink: 0;
}
.profile-name {
  font-size: 1rem;
  font-weight: 600;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
@media (max-width: 480px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
.save-msg {
  font-size: 0.82rem;
  color: var(--green);
  margin-top: 0.5rem;
}

.toggle-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--border);
}
.toggle-row:last-child {
  border-bottom: none;
}
.toggle-label {
  font-size: 0.9rem;
  font-weight: 500;
}

.toggle-btn {
  width: 44px;
  height: 24px;
  border-radius: 100px;
  background: var(--bg-3);
  border: 1px solid var(--border);
  cursor: pointer;
  position: relative;
  transition:
    background 0.2s,
    border-color 0.2s;
  flex-shrink: 0;
}
.toggle-btn.active {
  background: var(--green-dark);
  border-color: var(--green-border);
}
.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--text-dim);
  transition:
    left 0.2s,
    background 0.2s;
}
.toggle-btn.active .toggle-thumb {
  left: 22px;
  background: var(--green);
}

.vsel-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.vsel-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
}
.vsel {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.7rem 1rem;
  color: var(--text);
  font-size: 0.9rem;
  outline: none;
  width: 100%;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%237a7a7a' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
}
.vsel:focus {
  border-color: var(--green-border);
}

.theme-options {
  display: flex;
  gap: 0.75rem;
}
.theme-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 1rem 1.5rem;
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
}
.theme-btn.active {
  border-color: var(--green-border);
  background: rgba(60, 255, 138, 0.06);
}
.theme-icon {
  font-size: 1.3rem;
}
.theme-label {
  font-size: 0.78rem;
  color: var(--text-muted);
}
.theme-btn.active .theme-label {
  color: var(--green);
}

.family-info-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
}
.family-link {
  display: inline-block;
  font-size: 0.85rem;
  color: var(--green);
  transition: opacity 0.2s;
}
.family-link:hover {
  opacity: 0.8;
}

.logout-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.logout-title {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.2rem;
}
</style>
