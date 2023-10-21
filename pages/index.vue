<script lang="ts" setup>
import { useMeals, useSupabaseUser } from '#imports'

const user = useSupabaseUser()

definePageMeta({
  middleware: ['auth'],
  layout: 'default',
})
const { fetchMeals } = useMeals()
const meals = useState('meals')
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
// watchEffect(() => {
//   if (!user.value)
//     return navigateTo('/login')
// })
</script>

<template>
  <div>
    <UButton @click="fetchMeals()" />

    <div v-for="meal in meals" :key="meal.id" class="py-2 border-b max-w-xl">
      <meal-card :meal="meal" @update:fetch-meals="fetchMeals()" />
    </div>
  </div>
</template>
