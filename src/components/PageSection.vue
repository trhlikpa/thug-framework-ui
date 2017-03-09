<template>
  <div>
    <header>
      <a href="javascript:void(0)" @click="switchState">
        <slot name="header">
          <h2 class="sub-header">{{ id }}</h2>
        </slot>
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

.a {
  display: flex;
  justify-content: space-between;
}

.i {
  margin-right: auto;  
}


</style>