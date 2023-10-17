<script lang="ts" setup>
import { useMeals, useSupabaseUser } from '#imports'

const user = useSupabaseUser()

definePageMeta({
  middleware: ['auth'],
  layout: 'default',
})
const { fetchMeals } = useMeals()
const meals = useState('meals')
fetchMeals()
watchEffect(() => {
  if (!user.value)
    return navigateTo('/login')
})
</script>

<template>
  <div>
    <UButton @click="fetchMeals()" />
    <div v-for="meal in meals" :key="meal.id" class="py-2 border-b max-w-xl">
      <meal-card :meal="meal" @update:fetch-meals="fetchMeals()" />
    </div>
  </div>
</template>
