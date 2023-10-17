<script setup>
import { v4 as uuidv4 } from 'uuid'
import { useMeals } from '~/composables/useMeals'

const isOpen = defineModel()
const user = useSupabaseUser()
const toast = useToast()
const supabase = useSupabaseClient()
const { fetchMeals } = useMeals()
const loading = ref(false)

const img = useImage()
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
const state = ref({
  email: '',
  password: '',
})
const currentBadge = ref(MEAL_TYPES.breakfast)
const foodPhoto = ref(null)
const foodPhotoPreview = ref(null)
const description = ref(null)

async function handleFileUpload() {
  try {
    loading.value = true
    const uuid = uuidv4()
    const { data, error } = await supabase.storage
      .from('patients_food_photos') // Use the correct bucket name here
      .upload(`${user.value.id}/${uuid}`, foodPhoto.value.files[0])
    foodPhoto.value = null
    const response = supabase.storage
      .from('patients_food_photos')
      .getPublicUrl(data.path)
    foodPhotoPreview.value = response.data
    loading.value = false
  }
  catch (error) {
    console.log('Error uploading file: ', error.message)
  }
  finally {
    foodPhoto.value = null
    loading.value = false
  }
}

async function createNewMeal() {
  try {
    loading.value = true

    const { error } = await supabase.from('patient_meals').insert({
      patient_id: user.value.id,
      type: currentBadge.value.value,
      image_url: foodPhotoPreview?.value?.publicUrl,
      description: description.value,
    },
    )
    await fetchMeals()
    currentBadge.value = MEAL_TYPES.breakfast
    foodPhotoPreview.value = null
  }
  catch (e) {
    toast.add({ title: e.toString() })
  }
  finally {
    loading.value = false
    isOpen.value = false
    description.value = null
  }
}
function doSomethingOnLoad(e) {
  console.log(e)
}
</script>

<template>
  <USlideover v-model="isOpen" side="left">
    <UCard class="h-full overflow-y-scroll" :ui="{ body: { base: 'h-full' } }">
      <UForm :state="state" class="flex gap-4 flex-col h-full">
        <UAlert variant="soft" color="primary" title="Upload new meal">
          <template #title>
            <div class="flex flex-row justify-between">
              <span>New meal</span>
              <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
            </div>
          </template>
        </UAlert>
        <div class="flex-nowrap flex gap-3 py-4">
          <UBadge v-for="badge in MEAL_TYPES" :key="badge.color" class="cursor-pointer" :variant=" currentBadge.text === badge.text ? 'solid' : 'soft'" size="lg" :color="badge.color" :label="badge.text" @click="currentBadge = badge" />
        </div>
        <div v-if="!foodPhotoPreview?.publicUrl" class="flex items-center justify-center w-full">
          <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center py-1 md:pt-5 md:pb-6">
              <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" ref="foodPhoto" type="file" class="hidden" @change="handleFileUpload()">
          </label>
        </div>

        <NuxtImg
          v-else
          loading="lazy"
          preload
          class="w-full rounded-md"
          placeholder
          quality="1"
          format="webp"
          :src="foodPhotoPreview?.publicUrl"
        />
        <div class="flex flex-col gap-2 mt-auto">
          <UTextarea v-model="description" size="xl" class="" autoresize />
          <UButton size="lg" :loading="loading" class="" @click="createNewMeal()">
            upload
          </UButton>
        </div>
      </UForm>
    </UCard>
  </USlideover>
</template>

<style scoped>

</style>
