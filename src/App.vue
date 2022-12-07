<template>
  <header>
    <Navbar />
  </header>
  <Message :closable="false" v-if="notification.message" :severity="notification.severity">
    {{ notification.message }}
  </Message>
  <RouterView />
</template>

<script setup>
import Navbar from "@/components/common/Navbar.vue";
import { onBeforeMount, ref } from "vue";
import { authDataStore } from "@/stores/auth.store";
import messages from "@/services/message.services";
import {storeToRefs} from "pinia/dist/pinia";

// initialization
const { current } = storeToRefs(authDataStore());
const notification = ref({severity: '', message: ''});

// load user data
onBeforeMount(()=> {
  const store = authDataStore();
  // subscribe to store actions
  store.$onAction(
      ({name, store, args, after}) => {
        after((result) => {
          // post message
          const {text=''} = messages.get(name) || {};
          if (store.getErrors) {
            notification.value = {severity: 'error', message: text || store.getErrors.text};
          }
        })
      }
  );
  // initialize current user
  store.currentUserInit();
});
</script>

<style>
  @import "primevue/resources/primevue.min.css";
  @import "primevue/resources/themes/md-light-indigo/theme.css";
  @import "primeicons/primeicons.css";
  @import "/node_modules/primeflex/primeflex.css";
</style>

<style lang="scss">
@import "@/assets/_theme.scss";
</style>
