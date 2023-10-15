<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'default',
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()
console.log(user)
// defineProps<{ mealType: 'breakfast' | 'lunch' | 'dinner' }>()
// const MEAL_TYPES = {
//   breakfast: {
//     color: 'primary',
//     text: 'Breakfast',
//   },
//   lunch: {
//     color: 'yellow',
//     text: 'Lunch',
//   },
//   dinner: {
//     color: 'rose',
//     text: 'Dinner',
//   },
// }
await supabase.auth.getSession()
export interface Meal {
  id: number
  patient_id: number
  type: 'breakfast' | 'lunch' | 'dinner'
  image_url: string
  description: string
  created_at: string
  updated_at: string
}
const meals = ref<Meal[]>([])
// const { data } = await supabase.from('patient_meals').select('*').order('created_at', { ascending: false })
// meals.value = data as Meal[]
async function fetchMeals() {
  const { data } = await supabase.from('patient_meals').select('*').order('created_at', { ascending: false })
  meals.value = data as Meal[]
}
fetchMeals()
</script>

<template>
  <div>
    <UButton @click="fetchMeals()" />
    <div v-for="meal in meals" :key="meal.id" class="py-2 border-b max-w-xl">
      <meal-card :meal="meal" @update:fetch-meals="fetchMeals()" />
    </div>
  </div>
</template>
