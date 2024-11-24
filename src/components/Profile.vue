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
            class="w-32 h-32 rounded-full mx-auto"
            src="https://randomuser.me/api/portraits/men/22.jpg"
            alt="John Doe"
          />
        </div>

        <!-- Profile Info -->
        <div class="p-2">
          <h3 class="text-center text-xl font-medium leading-8">John Doe</h3>
          <div class="text-center text-base font-semibold">
            <p>49</p>
          </div>
          <div class="text-center text-sm font-semibold">
            <p>Web Developer</p>
          </div>

          <!-- Contact Info -->
          <table class="text-sm my-3 w-full">
            <tbody>
              <tr>
                <td class="px-2 py-2 font-semibold">Address</td>
                <td class="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
              </tr>
              <tr>
                <td class="px-2 py-2 font-semibold">Phone</td>
                <td class="px-2 py-2">+977 9955221114</td>
              </tr>
              <tr>
                <td class="px-2 py-2 font-semibold">Email</td>
                <td class="px-2 py-2">john@exmaple.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Profile',
}
</script>
