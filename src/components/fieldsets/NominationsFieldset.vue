<template>
  <Fieldset :legend="heading">
    <div class="card">
      <div class="p-fluid grid">
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
              <InputText
                  id="title"
                  type="text"
                  v-model="selected.title"
                  @change.native="v$.title.$touch()"
                  :class="v$.title.$invalid && isNew ? 'p-invalid' : ''"
                  :disabled="!isNew"
              />
              <label for="title">Title</label>
          </span>
          <p v-for="error of v$.title.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
              <InputText
                  id="category"
                  type="text"
                  v-model="selected.username"
                  @change.native="v$.username.$touch()"
                  :class="v$.username.$invalid && isNew ? 'p-invalid' : ''"
                  :disabled="!isNew"
              />
              <label for="idir">Category</label>
          </span>
          <p v-if="isNew" v-for="error of v$.username.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
              <InputText
                  id="firstname"
                  type="text"
                  v-model="selected.firstname"
                  @change.native="v$.firstname.$touch()"
              />
              <label for="firstname">First Name</label>
          </span>
          <p v-for="error of v$.firstname.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
              <InputText
                  id="lastname"
                  type="text"
                  v-model="selected.lastname"
                  @change.native="v$.lastname.$touch()"
              />
              <label for="lastname">Last Name</label>
          </span>
          <p v-for="error of v$.lastname.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
              <InputText
                  id="email"
                  type="email"
                  v-model="selected.email"
                  @change.native="v$.email.$touch()"
              />
              <label for="email">Email</label>
          </span>
          <p v-for="error of v$.email.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
        <div class="field col-12 md:col-6">
          <span class="p-float-label">
            <MultiSelect
                v-model="selected.roles"
                :options="roles"
                optionLabel="text"
                optionValue="value"
                @change.native="v$.roles.$touch()"
                :disabled="isCurrent || isNew"
                :class="v$.roles.$invalid ? 'p-invalid' : ''"
                :showToggleAll="false"
                style="width:15rem"
            />
              <label for="roles">Roles</label>
          </span>
          <p v-for="error of v$.roles.$errors" :key="error.$uid">
            <InlineMessage>{{ error.$message }}</InlineMessage>
          </p>
        </div>
      </div>
    </div>
  </Fieldset>
</template>

<script setup>
import settings from "@/services/settings.services";
import {storeToRefs} from "pinia/dist/pinia";
import {authDataStore} from "@/stores/auth.store";
import {email, required, helpers} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {ref} from "vue";
import {nominationsDataStore} from "@/stores/nominations.store";

// properties
const props = defineProps(['mode']);
const isNew = props.mode === 'new';
const heading = isNew ? 'Create Nomination' : 'Edit Nomination';

// get current user
const { current } = storeToRefs(authDataStore());

// load users state
const { selected, error } = storeToRefs(nominationsDataStore());

// freeze role change for self edits
const isCurrent = ref(selected.value.guid === current.value.guid);

// get options for user roles
const roles = settings.get('roles') || [];

// custom validators


// init validations
const validations = {
  title: { required },
  category: { required },
  guid: { required },
  filePath: { required },
  organization: { required },
  nominee: helpers.withMessage("Nominees are not valid.", ()=>{}),
  nominees: helpers.withMessage("Nominees are not valid.", ()=>{}),
  partners: helpers.withMessage("Partners are not valid.", ()=>{}),
  contacts: {
    primary: {
      firstname: { required },
      lastname: { required },
      email: { required },
      phone: { required },
    },
    video: {
      firstname: { required },
      lastname: { required },
      email: { required, email },
      locations: []
    }
  },
  nominators: helpers.withMessage("Nominators are not valid.", ()=>{}),
  acknowledgment: { required },
  evaluation: {
    summary: { required },
    context: { required },
    complexity: { required },
    approach: { required },
    valuing_people: { required },
    commitment: { required },
    contribution: { required },
    impact: { required },
  },
  attachments: helpers.withMessage("Attachments are not valid.", ()=>{}),
};

// apply validators
const v$ = useVuelidate(validations, selected);

</script>
