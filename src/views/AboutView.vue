<template>
  <div class="about">
    <h1 :class="{ active: isActive }">This is an about page</h1>
    <button @click="toggleActive">Toggle Active</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isActive = ref(false)

setTimeout(() => {
  isActive.value = true
}, 2000)

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.active {
  color: red;
  border-left: 5px solid red;
}
</style>
