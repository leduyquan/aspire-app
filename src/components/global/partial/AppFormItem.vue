<template>
  <ValidationProvider v-slot="slotProps" :vid="vid" :name="nameAttr" :rules="rules">
    <a-form-model-item
      v-bind="$attrs"
      :validate-status="resolveState(slotProps)"
      :help='getMessage(slotProps.failedRules, slotProps.errors[0])'
      :required="rules.includes('required')"
      has-feedback
    >
      <slot name="label" />
      <slot />
    </a-form-model-item>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

  export default {
    name: 'AppFormItem',
    components: {
      ValidationProvider
    },
    props: {
      vid: {
        type: String,
        default: ''
      },
      rules: {
        type: [Object, String],
        default: ''
      }
    },
    computed: {
      nameAttr() {
        return this.$attrs.name || this.$attrs.label
      }
    },
    methods: {
      resolveState({errors, pending}) {
        if (errors[0]) {
          return 'error'
        }
        if (pending) {
          return 'validating'
        }
        return ''
      },
      getMessage(error, message) {
        if (error.required ) {
          return this.$t('validate.this_field_required')
        }
        return message
      },
    }
  }
</script>
