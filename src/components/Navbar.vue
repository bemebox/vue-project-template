<template>
  <header class="shadow-md bg-white dark:bg-gray-800">
    <div class="flex justify-between items-center px-6 py-4">
      <!-- Hamburger Menu -->
      <font-awesome-icon
        icon="bars"
        class="cursor-pointer px-2 w-5 h-5 ms-1 md:hidden focus:outline-none text-gray-500"
      />

      <!-- Search Input -->
      <div
        class="relative flex-1 max-w-md mx-auto bg-gray-70 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
      >
        <input
          type="text"
          placeholder="Search for projects"
          class="w-full pl-10 pr-4 py-2 border dark:border-gray-600 bg-gray-70 dark:bg-gray-800 dark:text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <font-awesome-icon
          class="absolute top-3 left-3 w-4 h-4 text-gray-400"
          icon="magnifying-glass"
        />
      </div>

      <!-- Action Items -->
      <div class="flex items-center space-x-4">
        <!-- Light/Dark Theme Switch -->
        <button class="p-2" @click="toggleTheme" aria-label="Toggle Theme">
          <font-awesome-icon v-if="!dark" class="w-5 h-5 text-gray-500" icon="moon" />
          <font-awesome-icon v-else class="w-5 h-5 text-blue-500" icon="sun" />
        </button>

        <!-- Profile Menu -->
        <div class="relative" ref="menuContainer">
          <button
            @click="toggleProfileMenu"
            class="relative w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <img
              src="https://randomuser.me/api/portraits/thumb/men/22.jpg"
              alt="User Profile"
              class="w-full h-full rounded-full"
            />
          </button>
          <ul
            v-if="profileMenuOpen"
            class="absolute right-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-700 dark:border-gray-600"
          >
            <li
              @click="navigateTo('profile')"
              class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <a href="#">Profile</a>
            </li>
            <li
              @click="navigateTo('settings')"
              class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <a href="#">Settings</a>
            </li>
            <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
              <a href="#">Logout</a>
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

    const navigateTo = (routeName: string) => {
      router.push({ name: routeName })
      profileMenuOpen.value = false // Close the profile menu
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
      navigateTo,
    }
  },
}
</script>
