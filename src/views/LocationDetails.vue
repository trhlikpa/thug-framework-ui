<template>
  <div v-if="this.user.authenticated">
    <div v-if="fetching" class="loader">
    </div>
    <div v-else>
      <h1 class="page-header" v-if="location">{{'Location: ' + location._id.$oid}}</h1>
      <div class="row" v-if="location">
        <a class="btn btn-info" @click="$router.go(-1)">Back</a>
      </div>
      <a class="anchor main-anchor" id="location" title="location"></a>
      <pagesection v-if="location" :renderImmediately="true">
        <span slot="title">Location</span>
        <div slot="body">
          <div class="col-md-12">
            <div>
              <table class="table details-table">
                <tbody>
                  <tr class="entry">
                    <td class="name">URL:</td>
                    <td class="value">{{location.url}}</td>
                  </tr>
                  <tr class="entry">
                    <td class="name">HTTP status code:</td>
                    <td class="value">{{location.status}}</td>
                  </tr>
                  <tr class="entry">
                    <td class="name">Content type:</td>
                    <td class="value">{{location['content-type']}}</td>
                  </tr>
                  <tr class="entry">
                    <td class="name">Mime type:</td>
                    <td class="value">{{location['mime-type']}}</td>
                  </tr>
                  <tr class="entry">
                    <td class="name">Data size:</td>
                    <td class="value">{{location.size}}</td>
                  </tr>
                  <tr class="entry">
                    <td class="name">MD5 checksum:</td>
                    <td class="value">{{location.md5}}</td>
                  </tr>
                  <tr class="entry">
                    <td class="name">Sha-256 checksum:</td>
                    <td class="value">{{location.sha256}}</td>
                  </tr>
                  <tr class="entry">
                    <td class="name">Flags:</td>
                    <td class="value">{{location.flags}}</td>
                  </tr>
                  <tr class="entry">
                    <td class="name">Analysis Date:</td>
                    <td class="value">{{location.file.uploadDate}}</td>
                  </tr>
                  <tr class="entry">
                    <td colspan="2" v-html="codeFormat(location.code)"></td>
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
        location: null
      }
    },
    methods: {
      fetchLocation() {
        this.$http.get(this.tasksUrl + this.$route.params.task_id + '/locations/' + this.$route.params.location_id).then((response) => {
          this.location = response.body.location
          this.fetching = false
          this.parseAnchors()
        }, (response) => {
          this.fetching = false
          console.log('error loading location: ', response.status)
        })
      }
    },
    mounted() {
      if (this.user.authenticated) {
        this.fetchLocation()
      } else {
        this.$router.push('login')
      }
    }
  }

</script>
