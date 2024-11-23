<template>
  <div>
    <font-awesome-icon class="py-4 w-10 h-10" icon="ban" />
    <h1 class="text-6xl mb-4">404</h1>
    <p class="text-xl">Page Not Found</p>
    <router-link to="/" class="mt-4 text-blue-500 hover:text-blue-700">Go back to Home</router-link>
  </div>
</template>
<script lang="ts">
export default {
  name: 'NotFound',
}
</script>
