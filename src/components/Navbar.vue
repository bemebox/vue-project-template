<template>
  <header class="shadow-md">
    <div class="flex justify-between items-center px-6 py-4">
      <!-- Hamburger Menu -->
      <font-awesome-icon
        @click="$emit('toggleSidebar')"
        icon="bars"
        class="cursor-pointer px-2 w-5 h-5 ms-1 md:hidden focus:outline-none"
      />

      <!-- middle  -->
      <div class="relative flex-1 max-w-md mx-auto">&nbsp;</div>

      <!-- Action Items -->
      <div class="flex items-center space-x-4">
        <router-link to="/settings">
          <font-awesome-icon class="w-5 h-5 p-2" icon="gear" title="Settings" />
        </router-link>

        <!-- Light/Dark Theme Switch -->
        <button class="p-2" @click="toggleTheme" aria-label="Toggle Theme">
          <font-awesome-icon v-if="!dark" class="w-5 h-5" icon="moon" title="Dark mode" />
          <font-awesome-icon v-else class="w-5 h-5" icon="sun" title="Light mode" />
        </button>

        <router-link to="/help">
          <font-awesome-icon class="w-5 h-5 p-2" icon="circle-question" title="Help" />
        </router-link>

        <!-- Profile Menu -->
        <div class="relative" ref="menuContainer">
          <button @click="toggleProfileMenu" class="relative w-8 h-8" title="User Profile">
            <img
              src="https://randomuser.me/api/portraits/thumb/men/22.jpg"
              alt="User Profile"
              class="w-full h-full rounded-full"
            />
          </button>
          <ul
            v-if="profileMenuOpen"
            class="absolute right-0 w-48 border border-gray-200 rounded-md shadow-lg"
          >
            <li class="px-4 py-2">
              <!-- Use router-link for navigation -->
              <router-link to="/profile" @click="profileMenuOpen = false">Profile</router-link>
            </li>
            <li class="px-4 py-2">
              <router-link to="/logout" @click="profileMenuOpen = false">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Navbar',
  emits: ['toggleSidebar'],
  setup() {
    const dark = ref(false)
    const profileMenuOpen = ref(false)
    const menuContainer = ref<HTMLElement | null>(null)
    const router = useRouter()

    const toggleTheme = () => {
      dark.value = !dark.value
      document.documentElement.classList.toggle('dark', dark.value)
      localStorage.setItem('theme', dark.value ? 'dark' : 'light') // Save user preference
    }

    const toggleProfileMenu = () => {
      profileMenuOpen.value = !profileMenuOpen.value
    }

    const closeProfileMenu = (event: MouseEvent) => {
      // Close the menu only if the click is outside the menu container
      if (menuContainer.value && !menuContainer.value.contains(event.target as Node)) {
        profileMenuOpen.value = false
      }
    }

    const initializeTheme = () => {
      // Check if the user has previously set a theme
      const savedTheme = localStorage.getItem('theme')

      if (savedTheme) {
        dark.value = savedTheme === 'dark'
      } else {
        // Default to OS preference if no saved theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        dark.value = prefersDark
      }

      // Apply the theme
      document.documentElement.classList.toggle('dark', dark.value)
    }

    onMounted(() => {
      document.addEventListener('click', (e) => closeProfileMenu(e)) // Explicitly pass the event
      initializeTheme()
    })

    // Remove event listener when component is destroyed
    onBeforeUnmount(() => {
      document.removeEventListener('click', (e) => closeProfileMenu(e)) // Explicitly pass the event
    })

    return {
      dark,
      toggleTheme,
      profileMenuOpen,
      toggleProfileMenu,
      closeProfileMenu,
      menuContainer,
    }
  },
}
</script>
