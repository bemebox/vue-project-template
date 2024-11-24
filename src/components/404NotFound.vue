<template>
  <div class="py-4 items-center justify-center text-center">
    <font-awesome-icon class="py-4 w-10 h-10" icon="ban" />
    <h1 class="text-6xl mb-4">404</h1>
    <p class="text-base">
      Page not found. Check the address or
      <router-link to="/dashboard" class="mt-4 text-blue-500 hover:text-blue-700"
        >go back</router-link
      >.
    </p>
  </div>
</template>
<script lang="ts">
export default {
  name: 'NotFound',
}
</script>
