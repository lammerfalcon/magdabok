<script lang="ts" setup>
// defineProps<{ mealType: 'breakfast' | 'lunch' | 'dinner' }>()
// const MEAL_TYPES = {
//   breakfast: {
//     color: 'primary',
//     text: 'Breakfast',
//   },
//   lunch: {
//     color: 'yellow',
//     text: 'Lunch',
//   },
//   dinner: {
//     color: 'rose',
//     text: 'Dinner',
//   },
// }
</script>

<template>
  <!--  <div class="grid gap-2 grid-cols-2 sm:grid-cols-2 md:grid-cols-3"> -->
  <!--    <UCard v-for="card in 9" :key="card" class="columns-1"> -->
  <!--      <UBadge :color="MEAL_TYPES.breakfast.color"> -->
  <!--        {{ MEAL_TYPES.breakfast.text }} -->
  <!--      </UBadge> -->
  <!--      <img class="h-20 w-20 text-3xl rounded-2xl" src="~/assets/img/meal1.jpg" alt=""> -->
  <!--    </UCard> -->
  <!--  </div> -->

  <meal-card meal-type="breakfast" />
  <meal-card meal-type="breakfast" />
  <meal-card meal-type="breakfast" />
  <meal-card meal-type="breakfast" />
  <meal-card meal-type="breakfast" />
</template>
