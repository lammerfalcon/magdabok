<script setup>
useSeoMeta({
  title: 'Magdabok app',
  ogTitle: 'Magdabok app',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'Personal diary for self care',
  ogImage: 'https://cdn.dribbble.com/userupload/11333665/file/original-16aa0b08aee4b06667b46c4d200c4f52.jpg?resize=2048x1691',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <NuxtLayout class="bg-stone-100">
    <UNotifications />
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="postcss">
@import "@/assets/css/main.css";
</style>
