<template>
<div class="col-sm-4 col-sm-offset-4">
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title"><strong>Log in </strong></h3></div>
    <div class="panel-body">
      <div class="form-group">
        <input type="email" class="form-control" placeholder="Enter email" v-model="credentials.email">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" placeholder="Enter password" v-model="credentials.password">
      </div>
      <hr>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <button v-if="valid" v-on:click="submit()" class="btn btn-success">Enter</button>
      <button v-else class="btn btn-default disabled">Enter</button>
      <router-link to="/registration"><a class="pull-right" style="margin-top: 5px;">Create new account</a></router-link>
    </div>
  </div>
</template>

<script>
import auth from '../auth.js'
export default {
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      error: ''
    }
  },
  computed: {
    valid() {
      return this.credentials.email.length > 0 && this.credentials.password.length > 0
    }
  },
  methods: {
    submit() {
      var credentials = {
        email: this.credentials.email,
        password: this.credentials.password
      }

      auth.login(this, credentials)
    }
  }
}
</script>
