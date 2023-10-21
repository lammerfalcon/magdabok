<script setup lang="ts">
import { useMeals, useSupabaseUser } from '#imports'

const user = useSupabaseUser()

definePageMeta({
  middleware: ['auth'],
  layout: 'default',
})
const { fetchMeals } = useMeals()
const currentMeal = ref(null)
const grouppedMeals = useState('grouppedMeals')
const isOpen = ref(false)

fetchMeals()
function editMeal(meal) {
  isOpen.value = true
  currentMeal.value = meal
}
const MEAL_TYPES = {
  breakfast: {
    color: 'green',
    text: 'Breakfast',
    value: 'breakfast',
  },
  lunch: {
    color: 'yellow',
    text: 'Lunch',
    value: 'lunch',
  },
  dinner: {
    color: 'rose',
    text: 'Dinner',
    value: 'dinner',
  },
}
</script>

<template>
  <div class="gap-4 flex flex-col py-10">
    <UploadMeal v-model="isOpen" :meal="currentMeal" class="overflow-y-scroll" />
    <div v-if="!!grouppedMeals?.length">
      <div v-for="items in grouppedMeals" :key="items.day">
        <h4 class="mb-4">
          {{ new Date(items.day) .toLocaleDateString() }}
        </h4>

        <div class="grid grid-cols-3 auto-rows-fr gap-x-3 gap-y-6">
          <div v-for="meal in items.meals.sort((a, b) => b.id - a.id)" :key="meal.id" class="relative" @click="editMeal(meal)">
            <div class="relative aspect-w-1 aspect-h-1">
              <NuxtImg fit="cover" placeholder class="rounded-lg object-cover w-full h-full" :src="meal.img_url" />
            </div>
            <UBadge class="z-40 absolute bottom-2 left-2" size="xs" :color="MEAL_TYPES[meal.type].color">
              {{ MEAL_TYPES[meal.type].text[0] }}
            </UBadge>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center">
      <UButton label="Upload first meal" @click="isOpen = true" />
    </div>
  </div>
</template>

<style scoped>

</style>
