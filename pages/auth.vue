<script setup>
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const loading = ref(false)
const email = ref('rodiongavrilov@gmail.com')
const role = ref('patient')
const foodPhoto = ref(null)
const foodPhotoPreview = ref([])
async function handleFileUpload() {
  const uuid = uuidv4()
  const { data, error } = await supabase.storage
    .from('patients_food_photos') // Use the correct bucket name here
    .upload(`${user.value.id}/${uuid}`, foodPhoto.value.files[0])
  const response = supabase.storage
    .from('patients_food_photos')
    .getPublicUrl(data.path)
  foodPhotoPreview.value.push(response.data)
  console.log(response.data.publicUrl)
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
        type: 'breakfast',
        image_url: 'https://avatars.githubusercontent.com/u/739984?v=4',
      },
    )
}

async function handleLogin() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({ email: email.value })
    if (error)
      throw error

    alert('Check your email for the login link!')
  }
  catch (error) {
    alert(error.error_description || error.message)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">
        Supabase + Nuxt 3
      </h1>
      <p class="description">
        Sign in via magic link with your email below
      </p>
      <div>
        <input
          v-model="email"
          class="inputField"
          placeholder="Your email"
          type="email"
        >
      </div>
      <div>
        <select v-model="role" class="inputField">
          <option value="patient">
            Patient
          </option>
          <option value="doctor">
            Doctor
          </option>
        </select>
      </div>
      <div>
        <input
          ref="foodPhoto"
          accept="image/*"
          type="file"
          @change="handleFileUpload()"
        >
      </div>
      <div>
        <input
          :disabled="loading"
          :value="loading ? 'Loading' : 'Send magic link'"
          class="button block bg-amber-400 p-4 rounded-xl cursor-pointer"
          type="submit"
        >
      </div>
    </div>
  </form>
  <div>
    <button class="button block bg-amber-400 p-4 rounded-xl cursor-pointer" @click="createNewMeal()">
      create new
    </button>
  </div>
  {{ user }}
  <img v-for="item in foodPhotoPreview" :key="item" :src="item?.publicUrl" alt="" class="w-1/6 aspect-auto">
  {{ item?.publicUrl }}
</template>
