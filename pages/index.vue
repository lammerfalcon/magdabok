<script lang="ts" setup>
import { useSupabaseUser } from '#imports'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

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
const { data } = await supabase.from('patient_meals').select('*').order('created_at', { ascending: false })
meals.value = data as Meal[]
async function fetchMeals() {
  const { data } = await supabase.from('patient_meals').select('*').order('created_at', { ascending: false })
  meals.value = data as Meal[]
}
</script>

<template>
  <div v-if="!user">
    <AuthCard />
  </div>
  <!--  <div class="grid gap-2 grid-cols-2 sm:grid-cols-2 md:grid-cols-3"> -->
  <!--    <UCard v-for="card in 9" :key="card" class="columns-1"> -->
  <!--      <UBadge :color="MEAL_TYPES.breakfast.color"> -->
  <!--        {{ MEAL_TYPES.breakfast.text }} -->
  <!--      </UBadge> -->
  <!--      <img class="h-20 w-20 text-3xl rounded-2xl" src="~/assets/img/meal1.jpg" alt=""> -->
  <!--    </UCard> -->
  <!--  </div> -->
  <div v-else>
    <UButton @click="fetchMeals()" />
    <meal-card v-for="meal in meals" :key="meal.id" :meal="meal" />
  </div>
</template>
