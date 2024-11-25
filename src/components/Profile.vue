<template>
  <div class="min-h-screen">
    <!-- Header Section -->
    <div class="bg-white shadow-lg">
      <div class="flex items-center justify-between max-w-7xl mx-auto p-6">
        <div class="flex items-center space-x-4">
          <!-- Profile Picture -->
          <div class="w-24 h-24 rounded-full overflow-hidden border">
            <img :src="profile.avatar" alt="Profile Picture" class="object-cover w-full h-full" />
          </div>
          <!-- User Info -->
          <div>
            <h1 class="text-3xl font-bold">{{ profile.name }}</h1>
            <p class="text-sm">{{ profile.role }}</p>
            <p class="text-sm">{{ profile.email }}</p>
          </div>
        </div>
        <button
          @click="openEditModal"
          class="px-4 py-2 text-sm font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Edit Profile
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="shadow-md">
      <div class="max-w-7xl mx-auto px-6">
        <nav class="flex space-x-4">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="{
              'border-b-2': activeTab === tab,
              '': activeTab !== tab,
            }"
            class="px-4 py-3 text-sm font-medium"
          >
            {{ tab }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Content Section -->
    <div class="max-w-7xl mx-auto px-6 py-6">
      <!-- About Me Tab -->
      <div v-if="activeTab === 'About Me'">
        <h2 class="text-xl font-bold mb-4">About Me</h2>
        <p class="text-sm">{{ profile.about }}</p>
      </div>

      <!-- Activity Tab -->
      <div v-if="activeTab === 'Activity'">
        <h2 class="text-xl font-bold mb-4">Recent Activity</h2>
        <ul class="space-y-4">
          <li
            v-for="activity in profile.activity"
            :key="activity.id"
            class="p-4 rounded-lg shadow-md"
          >
            <p class="text-sm">{{ activity.description }}</p>
            <p class="text-xs">{{ activity.date }}</p>
          </li>
        </ul>
      </div>

      <!-- Settings Tab -->
      <div v-if="activeTab === 'Settings'">
        <h2 class="text-xl font-bold mb-4">Profile Settings</h2>
        <p class="text-sm">Settings functionality coming soon!</p>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div
      v-if="isEditModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      @click="closeEditModal"
    >
      <div class="p-6 rounded-lg shadow-lg w-96 bg-white" @click.stop>
        <h3 class="text-xl font-semibold mb-4">Edit Profile</h3>
        <form @submit.prevent="saveProfile">
          <!-- Avatar URL Input -->
          <div class="mb-4">
            <label for="avatar" class="text-sm font-semibold">Avatar URL</label>
            <div class="mt-2 mb-4 flex items-center justify-center">
              <div class="w-24 h-24 rounded-full overflow-hidden border">
                <img
                  :src="profile.avatar"
                  alt="Profile Picture"
                  class="object-cover w-full h-full"
                />
              </div>
            </div>
            <input
              type="url"
              id="avatar"
              v-model="profile.avatar"
              placeholder="Enter Image URL"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            />
          </div>

          <!-- Name -->
          <div class="mb-4">
            <label for="name" class="text-sm font-semibold">Name</label>
            <input
              v-model="profile.name"
              type="text"
              id="name"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
              required
            />
          </div>

          <!-- Email -->
          <div class="mb-4">
            <label for="email" class="text-sm font-semibold">Email</label>
            <input
              v-model="profile.email"
              type="email"
              id="email"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
              required
            />
          </div>

          <!-- Role -->
          <div class="mb-4">
            <label for="role" class="text-sm font-semibold">Role</label>
            <input
              v-model="profile.role"
              type="text"
              id="role"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
              required
            />
          </div>

          <!-- About -->
          <div class="mb-4">
            <label for="about" class="text-sm font-semibold">About</label>
            <textarea
              v-model="profile.about"
              id="about"
              rows="4"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="closeEditModal"
              class="px-4 py-2 text-sm font-semibold border rounded-md focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'ConfluenceProfilePage',
  setup() {
    const tabs = ref(['About Me', 'Activity', 'Settings'])
    const activeTab = ref('About Me')
    const isEditModalOpen = ref(false)

    const profile = ref({
      name: 'John Doe',
      role: 'Software Engineer',
      email: 'john.doe@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      about:
        'I am a passionate software engineer with over 10 years of experience in building scalable web applications.',
      activity: [
        { id: 1, description: 'Commented on a page: "Team Meeting Notes"', date: '2 hours ago' },
        { id: 2, description: 'Updated a page: "Project Roadmap"', date: '1 day ago' },
        { id: 3, description: 'Created a page: "Weekly Standup Agenda"', date: '3 days ago' },
      ],
    })

    const openEditModal = () => {
      isEditModalOpen.value = true
    }

    const closeEditModal = () => {
      isEditModalOpen.value = false
    }

    const saveProfile = () => {
      // Logic for saving the profile goes here
      console.log('Profile updated:', profile.value)

      // After saving, close the modal
      closeEditModal()
    }

    return {
      profile,
      tabs,
      activeTab,
      isEditModalOpen,
      openEditModal,
      closeEditModal,
      saveProfile,
    }
  },
}
</script>
