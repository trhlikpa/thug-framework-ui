<template>
<div>
  <header>
    <h2 v-if="disabled" class="sub-header disabled">
      <i class="glyphicon glyphicon-remove"></i>
      <slot name="title">
      </slot>
    </h2>
    <h2 v-else class="sub-header">
      <a href="javascript:void(0)" @click="switchState">
        <i v-if="visible" class="glyphicon glyphicon-chevron-down"></i>
        <i v-else class="glyphicon glyphicon-chevron-right"></i>
      </a>
      <slot name="title">
      </slot>
    </h2>
  </header>
  <main class="content" v-if="!disabled && visible">
    <slot name="body">
      <p>No relevant data</p>
    </slot>
  </main>
</div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: null
    }
  },
  props: {
    renderImmediately: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    visible: {
      get: function() {
        if (this.collapsed == null) {
          if (this.renderImmediately) {
            this.$emit('fetchdata')
            this.collapsed = false
            return true
          } else {
            return false
          }
        }

        return !this.collapsed
      }
    }
  },
  methods: {
    switchState() {
      if (this.collapsed == null) {
        this.$emit('fetchdata')
        this.collapsed = false
      } else if (this.collapsed) {
        this.collapsed = false
      } else {
        this.collapsed = true
      }
    }
  }
}
</script>

<style scoped>
.sub-header>a>i {
  font-size: 20px;
  top: -1px;
  margin-right: 5px;
  color: #34495e;
}

.content {
  position: relative;
  opacity: 1;
  min-height: 200px;
}

.disabled {
  opacity: 0.4;
}

.glyphicon-remove {
  font-size: 19px;
  top: 0px;
}
</style>
