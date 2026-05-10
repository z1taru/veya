<template>
  <div :class="['si', { 'si--done': item.done }]">
    <button class="si-check" @click="$emit('toggle', item.id)">
      <span v-if="item.done">✓</span>
    </button>
    <div class="si-info">
      <span class="si-name">{{ item.name }}</span>
      <span class="si-meta">
        <span v-if="item.qty" class="si-qty">{{ item.qty }}</span>
        <span v-if="item.category" class="si-cat">{{ item.category }}</span>
        <span v-if="addedByName" class="si-who">{{ addedByName }}</span>
      </span>
    </div>
    <button class="si-del" @click="$emit('delete', item.id)">✕</button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useFamilyStore } from "~/stores/family";

const props = defineProps({ item: { type: Object, required: true } });
defineEmits(["toggle", "delete"]);

const family = useFamilyStore();
const addedByName = computed(() => {
  const m = family.getMemberById(props.item.addedBy);
  return m ? m.name : null;
});
</script>

<style scoped>
.si {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.85rem 1rem;
  background: var(--bg-1);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition:
    opacity 0.2s,
    border-color 0.2s;
}
.si:hover {
  border-color: var(--border-md);
}
.si--done {
  opacity: 0.5;
}
.si-check {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 2px solid var(--border-md);
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: var(--green);
  flex-shrink: 0;
  transition:
    border-color 0.2s,
    background 0.2s;
}
.si--done .si-check {
  background: rgba(60, 255, 138, 0.15);
  border-color: var(--green-border);
}
.si-check:hover {
  border-color: var(--green-border);
}
.si-info {
  flex: 1;
  min-width: 0;
}
.si-name {
  font-size: 0.9rem;
  font-weight: 500;
  display: block;
}
.si--done .si-name {
  text-decoration: line-through;
  color: var(--text-muted);
}
.si-meta {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 0.2rem;
}
.si-qty,
.si-cat,
.si-who {
  font-size: 0.72rem;
  color: var(--text-muted);
}
.si-del {
  background: none;
  border: none;
  color: var(--text-dim);
  cursor: pointer;
  font-size: 0.78rem;
  padding: 0.25rem;
  border-radius: var(--radius-sm);
  transition: color 0.2s;
  flex-shrink: 0;
}
.si-del:hover {
  color: var(--red);
}
</style>
