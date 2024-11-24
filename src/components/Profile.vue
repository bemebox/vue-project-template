<template>
  <div>
    <h1 class="text-3xl mb-4">Profile</h1>
  </div>
  <div class="flex items-center justify-center">
    <div class="max-w-md w-full shadow-xl">
      <div class="shadow-xl rounded-lg py-3">
        <!-- Profile Picture -->
        <div class="photo-wrapper p-2">
          <img
            v-if="profile"
            :src="profile.picture"
            alt="Profile Picture"
            class="w-32 h-32 rounded-full mx-auto"
          />
        </div>

        <!-- Profile Info -->
        <div v-if="profile" class="p-2">
          <h3 class="text-center text-xl font-medium leading-8">{{ profile.name }}</h3>
          <div class="text-center text-base font-semibold">
            <p>{{ profile.age }}</p>
          </div>
          <div class="text-center text-sm font-semibold">
            <p>{{ profile.role }}</p>
          </div>

          <!-- Contact Info -->
          <table class="text-sm my-3 w-full">
            <tbody>
              <tr>
                <td class="px-2 py-2 font-semibold">Address</td>
                <td class="px-2 py-2">{{ profile.address }}</td>
              </tr>
              <tr>
                <td class="px-2 py-2 font-semibold">Phone</td>
                <td class="px-2 py-2">{{ profile.phone }}</td>
              </tr>
              <tr>
                <td class="px-2 py-2 font-semibold">Email</td>
                <td class="px-2 py-2">{{ profile.email }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Loading State -->
        <div v-else class="text-center py-6">
          <p>Loading profile...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'

export default {
  name: 'Profile',
  setup() {
    const profile = ref<null | {
      name: string
      age: number
      role: string
      address: string
      phone: string
      email: string
      picture: string
    }>(null)

    // Mock API fetch function
    const fetchProfile = async () => {
      try {
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        profile.value = {
          name: 'John Doe',
          age: 49,
          role: 'Web Developer',
          address: 'Chatakpur-3, Dhangadhi Kailali',
          phone: '+977 9955221114',
          email: 'john@example.com',
          picture: 'https://randomuser.me/api/portraits/men/22.jpg',
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error)
      }
    }

    onMounted(fetchProfile)

    return {
      profile,
    }
  },
}
</script>
