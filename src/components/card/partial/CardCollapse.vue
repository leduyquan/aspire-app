<template>
  <a-collapse v-model="activeKey" :bordered="false" expandIconPosition="right">
    <template #expandIcon="props">
      <img class="collapse-arrow" :src="iconPath('icons/global/down-arrow.svg')" :style="`transform: rotate(${props.isActive ? 180 : 0}deg)`" />
    </template>
    <a-collapse-panel :key="isOpen ? 'open' : ''" :header="headerLabel" >
      <slot></slot>
      <template v-if="actionLabel">
        <div class="collapse-action">
          <a href="" class="collapse-action-label" @click="onClick">{{ actionLabel }}</a>
        </div>
      </template>
      <template #extra>
        <img class="collapse-icon" :src="iconPath(`icons/cards/${icon}.svg`)" />
      </template>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
  export default {
    name: 'CardCollapse',
    props: {
      headerLabel: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: true
      },
      actionLabel: {
        type: String,
        default: ''
      },
      isOpen: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        activeKey: 'open'
      }
    },
    methods: {
      onClick() {
        this.$emit('click')
      }
    }
  }
</script>