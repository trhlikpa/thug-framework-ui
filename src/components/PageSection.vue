<template>
<div>
  <header>
    <h2 class="sub-header">
      <a href="javascript:void(0)" @click="switchState">
        <i v-if="enabled" class="glyphicon glyphicon-chevron-down"></i>
        <i v-else class="glyphicon glyphicon-chevron-right"></i>
      </a>
      <slot name="title">
        {{id}}
      </slot>
    </h2>
  </header>
  <a class="anchor" v-bind:id="id"></a>
  <main class="content" v-if="enabled">
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
    id: {
      type: String,
      required: true
    },
    renderImmediately: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    enabled: {
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
</style>
