<template>
  <div>
    <h1 class="text-3xl mb-4">Table</h1>
  </div>
  <div class="p-6">
    <!-- Search Input -->
    <div class="flex justify-center mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        class="w-full max-w-lg px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
      />
    </div>

    <!-- Table -->
    <div class="w-full overflow-hidden rounded-lg shadow-lg">
      <table class="w-full whitespace-no-wrap">
        <thead>
          <tr class="text-xs font-semibold tracking-wide text-left uppercase border-b">
            <th class="px-4 py-3">Client</th>
            <th class="px-4 py-3">Amount</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y">
          <tr v-for="client in paginatedData" :key="client.id" class="">
            <td class="px-4 py-3">
              <div class="flex items-center text-sm">
                <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                  <img
                    class="object-cover w-full h-full rounded-full"
                    :src="client.avatar"
                    alt="Client avatar"
                  />
                  <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                </div>
                <div>
                  <p class="font-semibold">{{ client.name }}</p>
                  <p class="text-xs">
                    {{ client.job }}
                  </p>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 text-sm">{{ client.amount }}</td>
            <td class="px-4 py-3 text-xs">
              <span
                :class="[
                  'px-2 py-1 font-semibold leading-tight rounded-full',
                  statusClasses(client.status),
                ]"
              >
                {{ client.status }}
              </span>
            </td>
            <td class="px-4 py-3 text-sm">{{ client.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div
      class="flex items-center justify-between px-4 py-3 mt-4 text-xs font-semibold tracking-wide uppercase border-t"
    >
      <span>Showing {{ startItem + 1 }}-{{ endItem }} of {{ filteredData.length }}</span>
      <nav class="inline-flex items-center">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded-l-md focus:outline-none focus:ring-2"
        >
          Prev
        </button>
        <span class="px-3 py-1">{{ currentPage }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded-r-md focus:outline-none focus:ring-2"
        >
          Next
        </button>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'

export default {
  name: 'TableWithSearchAndPagination',
  setup() {
    const searchQuery = ref('')
    const currentPage = ref(1)
    const itemsPerPage = ref(5)

    const tableData = ref([
      {
        id: 1,
        name: 'Hans Burger',
        job: '10x Developer',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        amount: '$863.45',
        status: 'Approved',
        date: '6/10/2020',
      },
      {
        id: 2,
        name: 'Jolina Angelie',
        job: 'Unemployed',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        amount: '$369.95',
        status: 'Pending',
        date: '6/10/2020',
      },
      // Add more items as needed...
    ])

    const filteredData = computed(() =>
      tableData.value.filter((item) =>
        Object.values(item).join(' ').toLowerCase().includes(searchQuery.value.toLowerCase()),
      ),
    )

    const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage.value))

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return filteredData.value.slice(start, end)
    })

    const startItem = computed(() => (currentPage.value - 1) * itemsPerPage.value)
    const endItem = computed(() =>
      Math.min(startItem.value + itemsPerPage.value, filteredData.value.length),
    )

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    const statusClasses = (status: string) => {
      switch (status) {
        case 'Approved':
          return 'text-green-700 bg-green-100'
        case 'Pending':
          return 'text-orange-700 bg-orange-100'
        case 'Denied':
          return 'text-red-700 bg-red-100'
        default:
          return 'text-gray-700 bg-gray-100'
      }
    }

    return {
      searchQuery,
      currentPage,
      itemsPerPage,
      filteredData,
      paginatedData,
      totalPages,
      startItem,
      endItem,
      prevPage,
      nextPage,
      statusClasses,
    }
  },
}
</script>
