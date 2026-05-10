<template>
  <div class="fmc">
    <div class="fmc-avatar">{{ initials }}</div>
    <div class="fmc-info">
      <div class="fmc-name">{{ member.name }}</div>
      <div class="fmc-email">{{ member.email || "—" }}</div>
    </div>
    <div class="fmc-right">
      <span :class="['role-badge', `role-${member.role}`]">{{
        roleLabel
      }}</span>
      <span
        :class="[
          'status-dot',
          member.status === 'active' ? 'dot-active' : 'dot-pending',
        ]"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({ member: { type: Object, required: true } });

const ROLES = {
  owner: "Владелец",
  parent: "Родитель",
  member: "Участник",
  child: "Ребёнок",
};

const initials = computed(() => props.member.name.slice(0, 2).toUpperCase());
const roleLabel = computed(() => ROLES[props.member.role] || props.member.role);
</script>

<style scoped>
.fmc {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: border-color 0.2s;
}
.fmc:hover {
  border-color: var(--border-md);
}
.fmc-avatar {
  width: 40px;
  height: 40px;
  background: var(--green-dark);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--green);
  flex-shrink: 0;
}
.fmc-info {
  flex: 1;
  min-width: 0;
}
.fmc-name {
  font-size: 0.9rem;
  font-weight: 600;
}
.fmc-email {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.1rem;
}
.fmc-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}
.role-badge {
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
}
.role-owner {
  background: rgba(60, 255, 138, 0.12);
  color: var(--green);
  border: 1px solid var(--green-border);
}
.role-parent {
  background: rgba(92, 168, 255, 0.1);
  color: var(--blue);
  border: 1px solid rgba(92, 168, 255, 0.25);
}
.role-member {
  background: var(--bg-3);
  color: var(--text-muted);
  border: 1px solid var(--border);
}
.role-child {
  background: rgba(255, 200, 50, 0.1);
  color: var(--yellow);
  border: 1px solid rgba(255, 200, 50, 0.25);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dot-active {
  background: var(--green);
}
.dot-pending {
  background: var(--text-dim);
}
</style>
