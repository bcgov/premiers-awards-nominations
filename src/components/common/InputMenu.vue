<template>
  <div>

    <!-- Form Section Menu -->
    <b-navbar
      style="margin-top: 50px; width: 300px; left: auto"
      fixed="top"
      v-b-scrollspy
      class="flex-column"
    >
      <b-navbar-brand href="#">
        Nomination Section
        <b-badge :variant="nomination.submitted ? 'success' : 'warning'">
          {{ nomination.submitted ? 'Submitted' : 'Draft' }}
        </b-badge>
      </b-navbar-brand>
      <b-nav pills vertical>
        <b-nav-item
          size="sm"
          v-for="(input, index) in inputs"
          v-bind:key="index + 1"
          :href="`#list-item-${input.id}`"
        >
          <BIconXSquare
            v-if="!validation[input.id] && input.required"
            variant="warning"
          />
          <BIconDashSquare
            variant="secondary"
            v-else-if="!validation[input.id] && !input.required"
          />
          <BIconCheckSquare
            v-else
            style="color: #00C2A8;"
          />
          {{input.label}}
        </b-nav-item >
      </b-nav>
      <b-nav class="mt-2">
        <submit :inputs="inputs" />
      </b-nav>
    </b-navbar>

  </div>
</template>

<script>

import submit from '../inputs/InputSubmit'
import { BIconCheckSquare, BIconXSquare, BIconDashSquare } from 'bootstrap-vue'

export default {
  name: "nomination-emerging-leader",
  props: {
    inputs: Array
  },
  components: {
    submit,
    BIconCheckSquare,
    BIconXSquare,
    BIconDashSquare
  },
  computed: {
    nomination() {
      return this.$store.getters.getNomination;
    },
    validation() {
      return this.$store.getters.getValidation;
    }
  }
};
</script>
<style>
body {
  position: relative;
}
a.active {
  background-color: #2c3e50 !important;
  color: #FFFFFF !important;
}
</style>

