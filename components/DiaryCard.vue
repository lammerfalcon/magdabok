<script setup>
const relation = ref("patients");
const client = useSupabaseClient();
const { data } = await useAsyncData(
  "patients",
  async () => await client.from(relation.value).select("*")
);
const result = ref(data.value);
watch(
  () => relation.value,
  async () => {
    const { data } = await client.from(relation.value).select("*");
    result.value = data;
  }
);
</script>

<template>
  <div class="flex flex-col">
    <div>hello</div>
    <input v-model="relation" type="text" />
    <div>{{ result }}</div>
  </div>
</template>

<style scoped></style>
