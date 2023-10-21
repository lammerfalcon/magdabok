<script setup>
const isOpen = ref(false)
const colorMode = useColorMode()
const supabase = useSupabaseClient()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
async function logOut() {
  const { error } = await supabase.auth.signOut({ scope: 'global' })
  await navigateTo('/login')
}
const links = [{
  label: 'Dashboard',
  badge: 100,
  to: '/',
}, {
  label: 'Grid',
  icon: 'i-heroicons-squares-2x2',
  to: '/grid',
}, {
  label: 'Pills',
  icon: 'i-heroicons-lifebuoy',
  to: '/pills',
}, {
  label: 'New meal',
  icon: 'i-heroicons-plus-circle',
  click: () => isOpen.value = !isOpen.value,
}, {
  label: 'logout',
  icon: 'i-heroicons-command-line',
  click: async () => await logOut(),
}]
</script>

<template>
  <UploadMeal v-model="isOpen" class="overflow-y-scroll" />
  <UContainer class="md:grid md:grid-cols-4 md:gap-4 lg:gap-20 md:p-2 lg:p-10 min-h-screen ">
    <div class="relative md:col-span-1">
      <UVerticalNavigation class="sticky top-10 hidden md:block " :links="links" />
      <div class="fixed left-0 right-0 bottom-0 z-10 md:hidden block ">
        <nav class="bg-white dark:bg-black flex flex-row flex-nowrap gap-4 py-4 justify-around items-center">
          <UIcon class="text-2xl" name="i-heroicons-plus-circle" @click="isOpen = !isOpen" />
          <UIcon class="text-2xl" name="i-heroicons-list-bullet" @click="navigateTo('/')" />
          <UIcon class="text-2xl" name="i-heroicons-squares-2x2" @click="navigateTo('/grid')" />
          <UIcon class="text-2xl" name="i-heroicons-lifebuoy" @click="navigateTo('/pills')" />
          <UIcon class="text-2xl" name="i-heroicons-trash" @click="logOut" />
        </nav>
      </div>
    </div>
    <div class="md:col-span-3">
      <slot />
    </div>
  </UContainer>
</template>

<style scoped>

</style>
