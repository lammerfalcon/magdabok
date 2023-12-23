<script setup>
import { useSupabaseUser } from '#imports'

definePageMeta({
  layout: 'login',
})
const user = useSupabaseUser()

const supabase = useSupabaseClient()
const toast = useToast()
const loading = ref(false)
const email = ref('')

async function handleLogin() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: 'http://localhost:3000/confirm',
        data: {
          role: 'patient',
        },
      },
    })
    if (error)
      throw error
    toast.add({
      title: 'Check email for login',
      description: 'You are awsome today!',
      icon: 'i-octicon-desktop-download-24',
      timeout: 3000,
    })
  }
  catch (error) {
    toast.add({
      color: 'yellow',
      title: error.toString(),
      icon: 'i-heroicons-cog',
      timeout: 3000,
    })
  }
  finally {
    loading.value = false
  }
}
watch(user, () => {
  if (user.value) {
    return navigateTo('/')
  }
}, { immediate: true })
</script>

<template>
  <UCard class="w-full mx-4 md:w-1/3" :ui="{ background: 'bg-asparagus-100' }">
    <template #header>
      <h2 class="text-2xl text-asparagus-500" title="Magdabok - your personal book">
        MAGDABOK
      </h2>
    </template>
    <form class="flex flex-col gap-2" @submit.prevent="handleLogin">
      <UInput v-model="email" size="xl" name="email" class="w-full" type="email" placeholder="Your email" />
      <UButton
        :loading="loading"
        variant="ghost"
        type="submit"
        class="self-start"
        :value="loading ? 'Loading' : 'Send magic link'"
        :disabled="loading"
      >
        Send magic link
      </UButton>
    </form>
  </UCard>
</template>
