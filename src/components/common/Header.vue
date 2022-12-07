<template>
  <div>
    <h1>{{props.header}}</h1>
    <p>{{props.lead}}</p>
    <Divider />
  </div>
</template>

<script setup>
const props = defineProps(['header', 'lead']);
</script>