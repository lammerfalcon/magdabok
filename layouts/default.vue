<script setup>
import { v4 as uuidv4 } from 'uuid'

const user = useSupabaseUser()

const supabase = useSupabaseClient()
const isOpen = ref(false)
const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
const links = [{
  label: 'Profile',
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/739984?v=4',
  },
  badge: 100,
}, {
  label: 'Installation',
  icon: 'i-heroicons-home',
  to: '/auth',
}, {
  label: 'Vertical Navigation',
  icon: 'i-heroicons-chart-bar',
  to: '/auth',
}, {
  label: 'Command Palette',
  icon: 'i-heroicons-command-line',
  click: () => isOpen.value = !isOpen.value,
}]
const methods = [{
  name: 'Breakfast',
  value: 'breakfast',
  label: 'Breakfast',
}, {
  name: 'Lunch',
  value: 'lunch',
  label: 'Lunch',
}, {
  name: 'Dinner',
  value: 'dinner',
  label: 'Dinner',
},
]
const selected = ref('breakfast')
const foodPhoto = ref(null)
const foodPhotoPreview = ref(null)
const description = ref(null)

async function handleFileUpload() {
  const uuid = await uuidv4()
  const { data, error } = await supabase.storage
    .from('patients_food_photos') // Use the correct bucket name here
    .upload(`${user.value.id}/${uuid}`, foodPhoto.value.files[0])
  foodPhoto.value = null
  const response = supabase.storage
    .from('patients_food_photos')
    .getPublicUrl(data.path)
  foodPhotoPreview.value = response.data
  if (error) {
    alert(error.message)
    return
  }
  foodPhoto.value.value = null
}

async function createNewMeal() {
  await supabase
    .from('patient_meals')
    .insert(
      {
        patient_id: user.value.id,
        type: selected.value,
        image_url: foodPhotoPreview?.value?.publicUrl,
        description: description.value,
      },
    )
  selected.value = 'breakfast'
  foodPhotoPreview.value = null
}
</script>

<template>
  <USlideover v-model="isOpen" side="left">
    <UCard class="h-full">
      <template #header>
        <UAlert variant="solid" color="primary" title="Upload new meal" />
      </template>
      <template #footer>
        <UButton @click="createNewMeal()">
          upload
        </UButton>
      </template>
      <UForm class="flex gap-4 flex-col">
        <img
          class="w-full rounded-md"
          :src="foodPhotoPreview?.publicUrl"
        >

        <div v-if="!foodPhotoPreview?.publicUrl" class="flex items-center justify-center w-full">
          <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" ref="foodPhoto" type="file" class="hidden" @change="handleFileUpload()">
          </label>
        </div>
        <UTextarea v-model="description" />
        <URadio v-for="method of methods" :key="method.name" v-model="selected" v-bind="method" />
      </UForm>
    </UCard>
  </USlideover>
  <UContainer class="grid grid-cols-4 gap-20 p-10">
    <Ucard class="relative col-span-1">
      <UVerticalNavigation class="sticky top-10" :links="links" />
    </Ucard>
    <Ucard class="col-span-3">
      <slot />
    </Ucard>
  </UContainer>
  <!--    <input id="file" type="file" accept="image/*" @change="setPhoto"> -->
  <!--    <img :src="img" alt=""> -->
  <!--    <div class="w-full h-[52px] bg-white dark:bg-gray-900 dark:border-none sticky bottom-0 flex flex-row justify-around items-center border-t"> -->
  <!--      <ULink v-for="item in tabs" :key="item.path" class=" " :to="item.path"> -->
  <!--        <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" /> -->
  <!--      </ULink> -->
  <!--    </div> -->
</template>

<style scoped>

</style>
