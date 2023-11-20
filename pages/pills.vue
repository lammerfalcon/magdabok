<script setup lang="ts">
const bads = ref([
  {
    "name": "Vitamin C",
    "dosage": "500 mg",
    "note": "Take after a meal",
    "times_per_day": 1,
    "times_taken_today": 0,
  },
  {
    "name": "Magnesium",
    "dosage": "200 mg",
    "note": "Take before bedtime",
    "times_per_day": 1,
    "times_taken_today": 0,

  },
  {
    "name": "Omega-3",
    "dosage": "1000 mg",
    "note": "Take with a meal",
    "times_per_day": 2,
    "times_taken_today": 0,

  }
])

</script>

<template>
  <div>
    <div class="text-2xl py-6">Pills</div>
    <div class="flex flex-col gap-y-6" >
      <UAlert @click="bad.times_taken_today += 1" color="primary" :variant="bad.times_taken_today >= bad.times_per_day ? 'soft' : 'solid'" title="" v-for="(bad, index) in bads" :key="index">

        <template #title>
          <div class="flex flex-row justify-between items-center">
            <div class="flex flex-col">
              <div ><span class="text-xl">{{ bad.name }}</span>, {{ bad.dosage }}</div>
               <div class="text-sm">
                 {{bad.note}}
               </div>
            </div>
            <div class="text-2xl">
              {{ bad.times_taken_today }} | {{ bad.times_per_day }}
            </div>
          </div>
        </template>
      </UAlert>
    </div>
  </div>
</template>

<style scoped>

</style>
