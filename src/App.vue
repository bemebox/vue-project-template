<template>
  <div>
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div>
      <Navbar />
      <main>
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
