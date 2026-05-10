<template>
  <div class="family-page">
    <!-- Family card -->
    <VCard v-if="currentFamily" class="family-card">
      <div class="family-card-inner">
        <div class="family-icon">👨‍👩‍👧</div>
        <div>
          <h2 class="family-name">{{ currentFamily.name }}</h2>
          <p class="text-muted text-sm">
            {{ members.length }} участников · создана
            {{ currentFamily.createdAt }}
          </p>
        </div>
      </div>
    </VCard>

    <!-- Members list -->
    <section class="section">
      <div class="section-head">
        <h3>Участники</h3>
        <span class="member-count">{{ members.length }}</span>
      </div>
      <div class="members-list">
        <FamilyMemberCard
          v-for="member in members"
          :key="member.id"
          :member="member"
        />
      </div>
    </section>

    <!-- Invite form -->
    <section class="section">
      <h3>Пригласить участника</h3>
      <VCard class="mt-2">
        <div class="invite-form">
          <VInput v-model="inviteForm.name" label="Имя" placeholder="Алдияр" />
          <VInput
            v-model="inviteForm.email"
            label="Email"
            type="email"
            placeholder="aldiyar@example.com"
          />
          <div class="vsel-wrap">
            <label class="vsel-label">Роль</label>
            <select v-model="inviteForm.role" class="vsel">
              <option value="parent">Родитель</option>
              <option value="member">Участник</option>
              <option value="child">Ребёнок</option>
            </select>
          </div>
          <VButton
            :disabled="!inviteForm.name.trim() || !inviteForm.email.trim()"
            @click="sendInvite"
          >
            Отправить приглашение
          </VButton>
        </div>
        <div v-if="inviteSent" class="invite-success fade-in">
          ✓ Приглашение отправлено на {{ inviteSent }}
        </div>
      </VCard>
    </section>

    <!-- Pending invites -->
    <section v-if="invites.length" class="section">
      <h3>Ожидают подтверждения</h3>
      <div class="invites-list mt-2">
        <div v-for="inv in invites" :key="inv.id" class="invite-row">
          <div class="invite-info">
            <span class="invite-name">{{ inv.name }}</span>
            <span class="invite-email text-muted text-sm">{{ inv.email }}</span>
          </div>
          <span class="pending-badge">Ожидает</span>
        </div>
      </div>
    </section>

    <!-- Family settings -->
    <section class="section">
      <h3>Настройки семьи</h3>
      <VCard class="mt-2">
        <div class="settings-form">
          <VInput
            v-model="familyNameEdit"
            label="Название семьи"
            :placeholder="currentFamily?.name || 'Название'"
          />
          <VButton
            variant="secondary"
            :disabled="!familyNameEdit.trim()"
            @click="saveFamilyName"
          >
            Сохранить
          </VButton>
        </div>
        <p v-if="nameSaved" class="save-msg fade-in">✓ Сохранено</p>
      </VCard>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useFamilyStore } from "~/stores/family";
import FamilyMemberCard from "~/components/app/FamilyMemberCard.vue";
import VCard from "~/components/ui/VCard.vue";
import VInput from "~/components/ui/VInput.vue";
import VButton from "~/components/ui/VButton.vue";

definePageMeta({ layout: "app", middleware: "auth" });

const family = useFamilyStore();

const currentFamily = computed(() => family.currentFamily);
const members = computed(() => family.members);
const invites = computed(() => family.invites);

const inviteForm = ref({ name: "", email: "", role: "member" });
const inviteSent = ref("");
const familyNameEdit = ref(currentFamily.value?.name || "");
const nameSaved = ref(false);

function sendInvite() {
  if (!inviteForm.value.name.trim() || !inviteForm.value.email.trim()) return;
  family.inviteMember(inviteForm.value.email, inviteForm.value.name);
  inviteSent.value = inviteForm.value.email;
  inviteForm.value = { name: "", email: "", role: "member" };
  setTimeout(() => (inviteSent.value = ""), 4000);
}

function saveFamilyName() {
  if (!familyNameEdit.value.trim()) return;
  family.setFamily(familyNameEdit.value.trim());
  nameSaved.value = true;
  setTimeout(() => (nameSaved.value = false), 3000);
}
</script>

<style scoped>
.family-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.family-card-inner {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}
.family-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}
.family-name {
  font-size: 1.4rem;
  margin-bottom: 0.25rem;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.section-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.section-head h3 {
  font-size: 1rem;
  font-weight: 600;
}
.member-count {
  background: var(--bg-3);
  color: var(--text-muted);
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.1rem 0.5rem;
  border-radius: 100px;
}

.members-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.invite-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  transition: border-color 0.2s;
}
.vsel:focus {
  border-color: var(--green-border);
}

.invite-success {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(60, 255, 138, 0.08);
  border: 1px solid var(--green-border);
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  color: var(--green);
}

.invites-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.invite-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1rem;
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}
.invite-info {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.invite-name {
  font-size: 0.9rem;
  font-weight: 500;
}
.pending-badge {
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
  background: rgba(255, 200, 50, 0.1);
  color: var(--yellow);
  border: 1px solid rgba(255, 200, 50, 0.25);
  flex-shrink: 0;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.save-msg {
  font-size: 0.82rem;
  color: var(--green);
  margin-top: 0.5rem;
}
</style>
