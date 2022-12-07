<template>
  <div>
    <Sidebar v-model:visible="isProfileVisible">
      <div class="flex mb-4">
        <Avatar icon="pi pi-user" class="mr-2" size="xlarge" />
        <div class="col-6"><h3>{{current.username}}</h3></div>
      </div>
      <div class="grid">
        <div class="col-6"><b>Username (IDIR):</b></div>
        <div class="col-6">{{current.username}}</div>
        <div class="col-6"><b>First Name:</b></div>
        <div class="col-6">{{current.firstname}}</div>
        <div class="col-6"><b>Last Name:</b></div>
        <div class="col-6">{{current.lastname}}</div>
        <div class="col-6"><b>Roles:</b></div>
        <div class="col-6">
          <div v-for="role in current.roles">{{role}}</div>
        </div>
      </div>
    </Sidebar>
    <Menubar class="bg-indigo-600 d-flex justify-content-between ui-sticky" :model="items">
      <template #start>
        <img alt="logo" :src="logoSrc" height="60" class="mr-2">
      </template>
      <template #end>
        <Button class="bg-indigo-900" label="Profile" icon="pi pi-user" @click="toggleProfile" />
      </template>
    </Menubar>
    <Toast />
  </div>
</template>

<script setup>
import {ref} from 'vue';
import logoSrc from '@/assets/wiw-white-text.svg';
import {storeToRefs} from "pinia/dist/pinia";
import {authDataStore} from "@/stores/auth.store";

// get current user
const { current, error  } = storeToRefs(authDataStore());

// toggle profile sidebar
const isProfileVisible = ref(false);
const toggleProfile = () => {
  isProfileVisible.value = !isProfileVisible.value;
}

const items = ref([
  {
    label:'Premiers Awards: Admin',
    icon:'pi pi-fw pi-home',
    class: 'font-bold',
    url: '/'
  },
  {
    label:'About',
    icon:'pi pi-fw pi-external-link',
    url: 'https://premiersawards.gww.gov.bc.ca'
  },
  {
    label:'Users',
    icon:'pi pi-fw pi-users',
    class: 'text-white',
    items:[
      {
        label:'List',
        icon:'pi pi-fw pi-users',
        url: '/app/users'
      },
      {
        label:'Add New',
        icon:'pi pi-fw pi-user-plus',
        url: '/app/users/new'
      }
    ]
  },
  {
    label: 'Settings',
    icon: 'pi pi-fw pi-cog',
  }
])
</script>
<style>
.p-submenu-list {
  background-color: #42519f !important;
  color: white !important;
}
.p-menuitem-text, .p-menuitem-icon, .p-submenu-icon, .p-menubar-root-list {
  background-color: #42519f !important;
  color: white !important;
}
/*.ui-sticky {*/
/*  position: sticky !important;*/
/*  position: -webkit-sticky;*/
/*  z-index: 10000;*/
/*  top: 0;*/
/*}*/
/*@media (max-width: 960px) {*/
/*  .ui-sticky {*/
/*    position: sticky !important;*/
/*    position: -webkit-sticky;*/
/*    z-index: 10000;*/
/*    top: 0;*/
/*  }*/
/*}*/
</style>