<template>
  <div class="ob-wrap">
    <div class="ob-card fade-up">
      <!-- Progress -->
      <div class="ob-progress">
        <div
          v-for="i in 4"
          :key="i"
          :class="['ob-step', { active: step === i, done: step > i }]"
        >
          <div class="ob-dot">{{ step > i ? "✓" : i }}</div>
        </div>
      </div>

      <!-- Step 1: Family name -->
      <div v-if="step === 1" class="ob-body">
        <div class="ob-emoji">🏠</div>
        <h2>Ваша семья</h2>
        <p>Как называется ваша семья?</p>
        <VInput
          v-model="familyName"
          label="Название семьи"
          placeholder="Семья Сейткали"
        />
        <VButton full :disabled="!familyName.trim()" @click="step1"
          >Далее</VButton
        >
      </div>

      <!-- Step 2: Add members -->
      <div v-else-if="step === 2" class="ob-body">
        <div class="ob-emoji">👨‍👩‍👧</div>
        <h2>Участники семьи</h2>
        <p>Добавьте близких — они смогут видеть задачи и покупки.</p>

        <div class="member-list">
          <div v-for="m in addedMembers" :key="m.id" class="member-row">
            <span class="member-avatar">{{
              getInitials(memberName(m))
            }}</span>
            <span>{{ memberName(m) }}</span>
            <span class="member-role-label">{{ m.role }}</span>
          </div>
        </div>

        <div class="member-form">
          <VInput v-model="newMember.name" placeholder="Имя" />
          <VInput v-model="newMember.email" type="email" placeholder="Email" />
          <VSelect
            v-model="newMember.role"
            :options="roleOpts"
            placeholder="Роль..."
          />
          <VButton
            variant="secondary"
            :disabled="!newMember.name.trim() || !newMember.email.trim()"
            @click="addMember"
            >+ Добавить</VButton
          >
        </div>

        <div class="ob-row">
          <VButton variant="outline" @click="step--">Назад</VButton>
          <VButton @click="step++">Далее</VButton>
        </div>
      </div>

      <!-- Step 3: Use cases -->
      <div v-else-if="step === 3" class="ob-body">
        <div class="ob-emoji">🎯</div>
        <h2>Что важно для вас?</h2>
        <p>Выберите сценарии, которые будете использовать чаще всего.</p>
        <div class="uc-grid">
          <button
            v-for="uc in useCases"
            :key="uc.value"
            :class="['uc-item', { selected: selected.includes(uc.value) }]"
            @click="toggleUC(uc.value)"
          >
            <span class="uc-icon">{{ uc.icon }}</span>
            <span class="uc-label">{{ uc.label }}</span>
          </button>
        </div>
        <div class="ob-row">
          <VButton variant="outline" @click="step--">Назад</VButton>
          <VButton @click="step++">Далее</VButton>
        </div>
      </div>

      <!-- Step 4: Done -->
      <div v-else-if="step === 4" class="ob-body ob-final">
        <div class="ob-check">✓</div>
        <h2>Всё готово!</h2>
        <p>Добро пожаловать в Veya. Ваша семейная сеть настроена.</p>
        <VButton full @click="finish">Открыть Veya</VButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useFamilyStore } from "~/stores/family";
import {
  getInitials,
  getMemberDisplayName,
} from "~/utils/displayNames";
import VInput from "~/components/ui/VInput.vue";
import VSelect from "~/components/ui/VSelect.vue";
import VButton from "~/components/ui/VButton.vue";

definePageMeta({ layout: "default", middleware: "auth" });

const router = useRouter();
const family = useFamilyStore();

const step = ref(1);
const familyName = ref(family.currentFamily?.name || "");
const addedMembers = ref([]);
const newMember = ref({ name: "", email: "", role: "member" });
const selected = ref([]);

const roleOpts = [
  { value: "parent", label: "Родитель" },
  { value: "member", label: "Участник" },
  { value: "child", label: "Ребёнок" },
];

const useCases = [
  { value: "tasks", icon: "✅", label: "Семейные задачи" },
  { value: "shopping", icon: "🛒", label: "Список покупок" },
  { value: "elderly", icon: "💊", label: "Забота о близких" },
  { value: "kids", icon: "🎒", label: "Дети и расписание" },
  { value: "reminders", icon: "🔔", label: "Напоминания" },
  { value: "ai", icon: "✨", label: "AI-помощник" },
];
const memberName = (member) => getMemberDisplayName(member);

onMounted(() => {
  family.fetchCurrentFamily().catch(() => {});
});

async function step1() {
  if (familyName.value.trim()) {
    try {
      await family.setFamily(familyName.value.trim());
      step.value++;
    } catch (_) {}
  }
}

async function addMember() {
  if (!newMember.value.name.trim() || !newMember.value.email.trim()) return;
  try {
    const m = await family.addMember({
      name: newMember.value.name,
      email: newMember.value.email,
      role: newMember.value.role,
    });
    addedMembers.value.push(m);
    newMember.value = { name: "", email: "", role: "member" };
  } catch (_) {}
}

function toggleUC(val) {
  const idx = selected.value.indexOf(val);
  if (idx === -1) selected.value.push(val);
  else selected.value.splice(idx, 1);
}

function finish() {
  router.push("/app");
}
</script>

<style scoped>
.ob-wrap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}
.ob-card {
  width: 100%;
  max-width: 500px;
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
}
.ob-progress {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  justify-content: center;
}
.ob-step {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ob-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--bg-3);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-muted);
  transition: all 0.3s;
}
.ob-step.active .ob-dot {
  background: var(--green-dark);
  border-color: var(--green-border);
  color: var(--green);
}
.ob-step.done .ob-dot {
  background: rgba(60, 255, 138, 0.15);
  border-color: var(--green-border);
  color: var(--green);
}
.ob-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.ob-emoji {
  font-size: 2.5rem;
  text-align: center;
}
.ob-body h2 {
  font-size: 1.5rem;
  text-align: center;
}
.ob-body p {
  font-size: 0.875rem;
  color: var(--text-muted);
  text-align: center;
}
.ob-row {
  display: flex;
  gap: 0.75rem;
}
.ob-row > * {
  flex: 1;
}

.member-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.member-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: var(--bg-2);
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
}
.member-avatar {
  width: 28px;
  height: 28px;
  background: var(--green-dark);
  color: var(--green);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 700;
}
.member-role-label {
  margin-left: auto;
  font-size: 0.72rem;
  color: var(--text-dim);
}
.member-form {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.member-form > *:first-child {
  flex: 1;
  min-width: 120px;
}

.uc-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}
.uc-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 1rem;
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}
.uc-item:hover {
  border-color: var(--border-md);
}
.uc-item.selected {
  border-color: var(--green-border);
  background: rgba(60, 255, 138, 0.06);
}
.uc-icon {
  font-size: 1.5rem;
}
.uc-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-align: center;
}
.uc-item.selected .uc-label {
  color: var(--green);
}

.ob-final {
  text-align: center;
  align-items: center;
}
.ob-check {
  width: 64px;
  height: 64px;
  background: rgba(60, 255, 138, 0.12);
  border: 1px solid var(--green-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  color: var(--green);
}
</style>
