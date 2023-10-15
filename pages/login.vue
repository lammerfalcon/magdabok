<script setup>
definePageMeta({
  layout: 'login',
  middleware: ['guest'],
})
const supabase = useSupabaseClient()
const toast = useToast()

const loading = ref(false)
const email = ref('asdasdasd@gmail.com')

async function handleLogin() {
  try {
    loading.value = true
    const { error, data } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
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
      timeout: 4000,
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <UCard class="w-1/3">
    <template #header>
      <UAlert variant="soft" color="green" class="w-full whitespace-nowrap" title="Magdabok - your personal book" />
    </template>
    <form class="flex flex-col gap-2" @submit.prevent="handleLogin">
      <UInput v-model="email" name="email" class="w-full" type="email" placeholder="Your email" />
      <UButton
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
