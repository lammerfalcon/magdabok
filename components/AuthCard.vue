<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const loading = ref(false)
// const email = ref('rodiongavrilov@gmail.com')
const email = ref('lammerfalcon@mail.ru')
const role = ref('patient')

async function handleLogin() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({ email: email.value })
    if (error)
      throw error
  }
  catch (error) {
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
          :disabled="loading"
          :value="loading ? 'Loading' : 'Send magic link'"
          class="button block bg-amber-400 p-4 rounded-xl cursor-pointer"
          type="submit"
        >
      </div>
    </div>
  </form>
  {{ user }}
</template>
