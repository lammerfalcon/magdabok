<script lang="ts" setup>
import type { Meal } from '~/pages/index.vue'

defineProps<{ meal: Meal }>()
const emit = defineEmits(['update:fetchMeals'])

const supabase = useSupabaseClient()
const toast = useToast()

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
async function deleteMeal(mealId) {
  try {
    const { error } = await supabase
      .from('patient_meals')
      .delete()
      .eq('id', mealId)
    if (error)
      throw error
    emit('update:fetchMeals')
  }
  catch (e) {
    toast.add({
      title: e.toString(),
    })
  }
}
</script>

<template>
  <!--  <USlideover v-model="isOpen" side="left"> -->
  <!--    <UCard class="flex flex-col flex-1 ring-gray-900" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"> -->
  <!--      <template #header> -->
  <!--        <div class="flex items-center justify-between"> -->
  <!--          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white"> -->
  <!--            Slideover -->
  <!--          </h3> -->
  <!--          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" /> -->
  <!--        </div> -->
  <!--      </template> -->
  <!--      <div class="flex-nowrap flex gap-3"> -->
  <!--        <UBadge v-for="badge in MEAL_TYPES" :key="badge.color" :variant=" currentBadge === badge.text ? 'solid' : 'soft'" size="lg" :color="badge.color" :label="badge.text" @click="currentBadge = badge.text" /> -->
  <!--      </div> -->
  <!--    </UCard> -->
  <!--  </USlideover> -->

  <UCard :ui="{ ring: 'ring-0', shadow: 'shadow-none', divide: 'divide-none' }">
    <template #header>
      <div class="flex flex-nowrap items-center gap-4" @click="isOpen = !isOpen">
        <UBadge :color="MEAL_TYPES[meal.type].color">
          {{ MEAL_TYPES[meal.type].text }}
        </UBadge>
        <h5 class="text-md">
          {{ formatDate(meal.created_at) }}
        </h5>
        <UButton variant="soft" color="red" size="2xs" class="ml-auto" icon="i-heroicons-trash" @click="deleteMeal(meal.id)" />
      </div>
    </template>
    <div>
      <NuxtImg loading="lazy" placeholder quality="1" format="webp" class="rounded-xl w-full" :src="meal.image_url" alt="" />
    </div>
    <template v-if="meal.description" #footer>
      <div>
        <UAlert
          title="Description:"
          :description="meal.description"
        />
      </div>
    </template>
  </UCard>
</template>

<style scoped>

</style>
