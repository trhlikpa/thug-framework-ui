<template>
  <div v-if="this.user.authenticated">
    <div v-if="fetching" class="loader">
    </div>
    <div v-else>
      <h1 class="page-header" v-if="behavior">{{'Behavior: ' + behavior._id.$oid}}</h1>
      <div class="row" v-if="behavior">
        <a class="btn btn-info" @click="$router.go(-1)">Back</a>
      </div>
      <a class="anchor main-anchor" id="behavior" title="behavior"></a>
      <pagesection :renderImmediately="true">
        <span slot="title">Behavior</span>
        <div slot="body">
          <div class="col-md-12">
            <div>
              <table class="table details-table">
                <tbody>
                  <tr class="entry">
                    <td class="name">CVE:</td>
                    <td class="value">{{behavior.cve}}</td>
                  </tr>
                  <tr class="entry">
                    <td class="name">Method:</td>
                    <td class="value">{{behavior.method}}</td>
                  </tr>
                  <tr class="entry">
                    <td class="name">Description:</td>
                    <td class="value">{{behavior.description}}</td>
                  </tr>
                  <tr class="entry">
                    <td class="name">Timestamp:</td>
                    <td class="value">{{dateFormat(behavior.timestamp)}}</td>
                  </tr>
                  <tr class="entry">
                    <td colspan="2" v-html="codeFormat(item.snippet)"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </pagesection>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Api from '../mixins/Api.vue'
  import DataFormating from '../mixins/DataFormating.vue'
  import Anchors from '../mixins/Anchors.vue'
  import UserAuthentication from '../mixins/UserAuthentication.vue'
  export default {
    mixins: [Api, DataFormating, Anchors, UserAuthentication],
    data() {
      return {
        fetching: true,
        behavior: null
      }
    },
    methods: {
      fetchBehavior() {
        this.$http.get(this.tasksUrl + this.$route.params.task_id + '/behaviors/' + this.$route.params.behavior_id).then((response) => {
          this.behavior = response.body.behavior
          this.fetching = false
          this.parseAnchors()
        }, (response) => {
          this.fetching = false
          console.log('error loading behavior: ', response.status)
        })
      }
    },
    mounted() {
      if (this.user.authenticated) {
        this.fetchBehavior()
      } else {
        this.$router.push('login')
      }
    }
  }

</script>
