<template>
  <div>
    <header>
      <a href="javascript:void(0)" @click="switchState">
        <h2 class="sub-header">
          <i v-if="enabled" class="glyphicon glyphicon-chevron-down"></i>
          <i v-else class="glyphicon glyphicon-chevron-right"></i>
          <slot name="title">
          </slot>
        </h2>
      </a>
    </header>
    <a class="anchor" v-bind:id="id"></a>
    <main v-if="enabled" v-bind:id="id + '.body'">
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
      get: function () {
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

.sub-header > i {
  font-size: 20px;
  top: -1px;  
  margin-right: 5px;
}

</style>