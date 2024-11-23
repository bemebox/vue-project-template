<template>
  <div>
    <!-- Backdrop -->
    <div v-if="isOpen" class="fixed inset-0 z-40 md:hidden" @click="$emit('closeSidebar')"></div>

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 w-64 z-50 transform transition-transform duration-300 md:translate-x-0"
      :class="{ '-translate-x-full': !isOpen, 'translate-x-0': isOpen }"
    >
      <div class="py-5 items-center">
        <h2 class="text-xl font-bold mb-6">
          <font-awesome-icon icon="share-nodes" class="px-6 w-6 h-6" />Template
        </h2>
        <ul>
          <li
            v-for="item in menuItems"
            :key="item.label"
            :to="item.path"
            class="py-4 text-sm font-bold border-l-4"
            :class="{
              '': $route.path === item.path,
              '': $route.path !== item.path,
            }"
          >
            <a :href="item.path" class="px-2 block">
              <font-awesome-icon :icon="item.icon" class="px-4 w-4 h-4" />
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Sidebar',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      menuItems: [
        { path: '/', label: 'Home', icon: 'house' },
        { path: '/dashboard', label: 'Dashboard', icon: 'chart-pie' },
        { path: '/form', label: 'Form', icon: 'rectangle-list' },
        { path: '/table', label: 'Table', icon: 'table' },
        { path: '/profile', label: 'Profile', icon: 'address-card' },
        { path: '/settings', label: 'Settings', icon: 'gear' },
        { path: '/login', label: 'Login', icon: 'key' },
        { path: '/account', label: 'Create Account', icon: 'id-card-clip' },
        {
          path: '/forgout-password',
          label: 'Forgot Password',
          icon: 'fingerprint',
        },
      ],
    }
  },
}
</script>
