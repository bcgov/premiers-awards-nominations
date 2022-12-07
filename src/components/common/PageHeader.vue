<template>
  <div>
    <b-jumbotron header-level="4" :header="this.$props.header" :lead="this.$props.lead" />
  </div>
</template>

<script>

export default {
  name: "overview",
  props: {
    lead: String,
    header: String
  }
};

</script>
