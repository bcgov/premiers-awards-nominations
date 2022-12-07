<template>
  <div>
    <Header header="Premier's Awards: Administration" lead="" />
    <Card>
      <template #title>
        User Management
      </template>
      <template #content>
        Activate registered user accounts, modify user info and remove users.
      </template>
      <template #footer>
        <Button @click="()=>{navigate('users-list')}">User Management</Button>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Header from "@/components/common/Header.vue";
import {useRouter} from "vue-router/dist/vue-router";
const router = useRouter();

const navigate = (name) => {
  router.push({name: name});
}
</script>
