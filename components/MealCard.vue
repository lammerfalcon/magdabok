<script lang="ts" setup>
import type { Meal } from '~/pages/index.vue'

defineProps<{ meal: Meal }>()
const MEAL_TYPES = {
  all: {
    color: 'teal',
    text: 'All',
  },
  breakfast: {
    color: 'green',
    text: 'Breakfast',
  },
  lunch: {
    color: 'yellow',
    text: 'Lunch',
  },
  dinner: {
    color: 'rose',
    text: 'Dinner',
  },
}
const isOpen = ref(false)
const currentBadge = ref('breakfast')
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString('ru-RU', options)
  return formattedDate.replace(' г.', '')
}
</script>

<template>
  <USlideover v-model="isOpen" side="left">
    <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Slideover
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
        </div>
      </template>
      <div class="flex-nowrap flex gap-3">
        <UBadge v-for="badge in MEAL_TYPES" :key="badge.color" :variant=" currentBadge === badge.text ? 'solid' : 'soft'" size="lg" :color="badge.color" :label="badge.text" @click="currentBadge = badge.text" />
      </div>
    </UCard>
  </USlideover>

  <UCard class="max-w-xl">
    <template #header>
      <div class="flex flex-nowrap justify-between" @click="isOpen = !isOpen">
        <h3 class="text-xl">
          {{ formatDate(meal.created_at) }}
        </h3>
        <UBadge :color="MEAL_TYPES[meal.type].color">
          {{ MEAL_TYPES[meal.type].text }}
        </UBadge>
      </div>
    </template>
    <div>
      <img class="rounded-xl w-full" :src="meal.image_url" alt="">
    </div>
    <template v-if="meal.description" #footer>
      <div>
        <UAlert
          :description="meal.description"
        />
      </div>
    </template>
  </UCard>
</template>

<style scoped>

</style>
