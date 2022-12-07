<template>
  <div class="mt-3 w-100">
    <b-nav pills vertical>
      <b-nav-item>
        <b-button
          block
          :disabled="nomination.submitted"
          type="button"
          :variant="nomination.submitted ? 'secondary' : 'info'"
          @click="save()"
        >Save Draft <b-spinner class="ml-3" small v-if="saving" label="Saving..." /></b-button>
      </b-nav-item>
      <b-nav-item>
        <b-button
          block
          :disabled="!formValidation || nomination.submitted"
          type="button"
          :variant="formValidation && !nomination.submitted ? 'success' : 'secondary'"
          @click="submit()"
        >{{ nomination.submitted ? 'Submitted' : 'Submit' }} <b-spinner class="ml-3" small v-if="submitting" /></b-button>
      </b-nav-item>
      <b-nav-item>
        <b-button
          variant="outline-secondary"
          block
          size="sm"
          :disabled="nomination.submitted && !isAdmin"
          @click="reroute(`/delete/${nomination._id}`)"
        >
          Delete
        </b-button>
      </b-nav-item>
      <b-form-valid-feedback :state="formValidation && !nomination.submitted">
        Nomination is ready for submission.
      </b-form-valid-feedback>
      <b-form-invalid-feedback :state="formValidation">
        Nomination is incomplete or invalid.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="validation.counts.total <= validation.counts.max.total">
        Evaluation word count:
        {{ validation.counts.total }}/{{ validation.counts.max.total }}
      </b-form-valid-feedback>
      <b-form-invalid-feedback :state="validation.counts.total < validation.counts.max.total">
        Evaluation word count:
        {{ validation.counts.total }}/{{ validation.counts.max.total }} (Exceeded)
      </b-form-invalid-feedback>
      <b-form-invalid-feedback :state="validation.counts.summary < validation.counts.max.summary">
        Summary word count:
        {{ validation.counts.summary }}/{{ validation.counts.max.summary }}
      </b-form-invalid-feedback>
      <b-form-invalid-feedback :state="validation.counts.context < validation.counts.max.context">
        Context word count:
        {{ validation.counts.context }}/{{ validation.counts.max.context }} (Exceeded)
      </b-form-invalid-feedback>

      <b-navbar fixed="bottom" align="right">
        <b-alert
          v-if="message.text"
          show="5"
          fade
          dismissible
          :variant="message.type"
          @dismissed="message={text:'', type:''}"
        >
          {{message.text}}
        </b-alert>
      </b-navbar>

    </b-nav>
  </div>
</template>

<script>

import app from '@/services/api.services'
import {genID} from '@/services/validation.services'

export default {
  name: "submit-input",
  props: {
    label: String,
    disabled: Boolean,
    inputs: Array
  },
  data () {
    return {
      formid: genID(),
      message: {
        text: '',
        type: ''
      },
      saving: false,
      submitting: false
    }
  },
  computed: {
    validation () {
      return this.$store.getters.getValidation || {}
    },
    nomination () {
      return this.$store.getters.getNomination || {}
    },
    attachments () {
      return this.$store.getters.getAttachments || {}
    },
    formValidation () {
      return (this.inputs || []).filter(input => {
        return this.validation[input.id] !== 'undefined'
          ? !(this.validation[input.id] || !input.required)
          : false
      }).length === 0;
    },
    isAdmin () {
      return this.$store.getters.isAdmin
    },
  },
  methods: {
    async reroute(uri) {
      await this.$router.push(uri)
    },
    async save () {
      try {
        this.saving = true
        this.message = {
          text: 'Saving nomination...',
          type: 'info'
        }

        // upload attachments first
        await this.upload();

        // update nomination data
        await app.post(`data/update/${this.nomination._id}`, this.nomination)
        this.saving = false
        this.message = {
          text: 'Nomination saved.',
          type: 'success'
        }

        // reload nomination data
        await this.$store.dispatch("loadNomination", this.nomination._id)

      } catch (err) {
        console.error(err);
        this.saving = false

        this.message = {
          text: 'Nomination could not be saved.',
          type: 'danger'
        }
      }
    },
    async submit () {
      try {
        this.submitting = true
        this.message = {
          text: 'Submitting nomination...',
          type: 'info'
        }
        // handle data submission
        // NOTE: important to upload files first before submission data
        await this.upload()
        await app.post(`data/submit/${this.nomination._id}`, this.nomination)

        this.submitting = false
        this.message = {
          text: 'Successfully submitted nomination!',
          type: 'success'
        }
        await this.$store.dispatch("loadNomination", this.nomination._id)

      } catch (err) {
        console.error(err);
        this.submitting = false
        this.message = {
          text: 'Nomination could not be submitted.',
          type: 'danger'
        }
      }
    },
    async upload () {
      // handle attachment submission
      let formData = new FormData();
      this.attachments.map((attachment) => {
        formData.append(`_id`, attachment._id || '');
        formData.append(`file`, attachment.file || null);
        formData.append(`nomination`, this.nomination._id || '');
        formData.append(`label`, attachment.label || '');
        formData.append(`description`, attachment.description || '');
      })
      return await app.post(
        `attachments/upload/${this.nomination.year}/${this.nomination._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }})
    }
  }
}
</script>
