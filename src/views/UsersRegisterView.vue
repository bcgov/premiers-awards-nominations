<template>
  <Header header="User Registration" />
  <Placeholder v-if="loading" />
  <div v-if="!isActive && isRegistered">
    <Message :closable="false" severity="info">
      Your registration is currently under review.
    </Message>
  </div>
  <div v-else-if="done || isRegistered">
    <Message :closable="false" severity="info">
      You are currently registered for the following roles:
      <ul>
        <li v-for="role in current.roles">{{role}}</li>
      </ul>
    </Message>
  </div>
  <div v-else>
    <IndexFieldset type="users" mode="new" />
    <div>
      <Button :disabled="loading || done" label="Cancel" icon="pi pi-times" @click="cancel" class="p-button-text"/>
      <Button :disabled="loading || done" label="Submit" icon="pi pi-check" @click="submit" autofocus />
    </div>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import { usersDataStore } from "@/stores/users.store";
import IndexFieldset from "@/components/fieldsets/IndexFieldset.vue";
import { useToast } from "primevue/usetoast";
import messages from "@/services/message.services"
import {useRouter} from "vue-router";
import {useVuelidate} from "@vuelidate/core";
import {storeToRefs} from "pinia";
import {authDataStore} from "@/stores/auth.store";

// get current user info
const { current, isRegistered, isActive } = storeToRefs(authDataStore());
// initialize messages
const toast = useToast();
// get router
const router = useRouter();
// validator
const v$ = useVuelidate();
// users store
const store = usersDataStore();
// initialize references
const { loading } = storeToRefs(usersDataStore());
const done = ref(false);

// subscribe to store actions
store.$onAction(
    ({name, store, _, after}) => {
      after(() => {
        // post message
        const {text=''} = messages.get(name) || {};
        if (store.getErrors) toast.add({
          severity: 'error', summary: 'An Error has Occurred', detail: store.getErrors.text, life: 3000});
        else if (text) {
          toast.add({severity: 'success', summary: 'User Registration Successful!', detail: text, life: 3000})
        }
      })
    }
);

// create new user record
const submit = async () => {
  // validate form
  if (invalid()) return;

  // insert new record
  await store.insert();
  if (store.getErrors) return;
  done.value = true;
};

// cancel registration (navigates to users list)
const cancel = () => {
  router.push({ name: 'users-list' });
};
// test if form is invalid
const invalid = () => {
  v$.value.$touch();
  return v$.value.$invalid;
}

</script>
