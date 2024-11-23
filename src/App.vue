<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex flex-1 flex-col md:ml-64">
      <Navbar />
      <main class="p-6 flex-grow h-screen">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  components: { Navbar, Sidebar },
  setup() {},
}
</script>
