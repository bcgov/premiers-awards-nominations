<template>
  <div v-if="props.type === 'users-list'">
    <UserFieldset :mode="mode" />
  </div>
  <div v-else-if="props.type === 'settings'">
    <UserFieldset :mode="mode" />
  </div>
  <div v-else-if="props.type === 'nominations'">
    <UserFieldset :mode="mode" />
  </div>
  <div v-else>
    <UserFieldset :mode="mode" />
  </div>
</template>

<script setup>
import UserFieldset from "@/components/fieldsets/UserFieldset.vue";
const props = defineProps(['type', 'mode']);
</script>
