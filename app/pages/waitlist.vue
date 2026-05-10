<template>
  <div class="wl-page">
    <div class="container">
      <div class="wl-hero fade-up">
        <div class="section-label">Ранний доступ</div>
        <h1>Вступите в waitlist</h1>
        <p>Veya скоро запускается. Оставьте заявку — мы напишем первыми.</p>
      </div>
      <div class="wl-form-wrap">
        <WaitlistForm />
      </div>
    </div>
  </div>
</template>

<script setup>
import WaitlistForm from "~/components/public/WaitlistForm.vue";
definePageMeta({ layout: "default" });
</script>

<style scoped>
.wl-page {
  padding: 8rem 0 4rem;
}
.wl-hero {
  text-align: center;
  margin-bottom: 3rem;
}
.wl-hero h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
}
.wl-hero p {
  color: var(--text-muted);
  max-width: 480px;
  margin: 0 auto;
}
.wl-form-wrap {
  max-width: 480px;
  margin: 0 auto;
}
</style>
