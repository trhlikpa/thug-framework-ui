<template>
<div class="col-sm-4 col-sm-offset-4">
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title"><strong>Create new account </strong></h3></div>
    <div class="panel-body">
      <div class="form-group">
        <input autofocus type="text" class="form-control" @keyup.enter="keySubmit()" placeholder="Enter name" v-model="credentials.name">
      </div>
      <div class="form-group">
        <input type="email" class="form-control" @keyup.enter="keySubmit()" placeholder="Enter email" v-model="credentials.email">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" @keyup.enter="keySubmit()" placeholder="Enter password" v-model="credentials.password">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" @keyup.enter="keySubmit()" placeholder="Confirm password" v-model="credentials.password_confirm">
      </div>
      <hr>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div class="alert alert-danger" v-if="!validEmail">
        <strong>Email error - </strong> Enter valid email address
      </div>
      <div class="alert alert-danger" v-for="erorMsg in passwordErrors">
        <strong>Password error - </strong> {{ erorMsg }}
      </div>
      <button v-if="valid" v-on:click="submit()" class="btn btn-success">Confirm</button>
      <button v-else class="btn btn-default disabled">Confirm</button>

      <router-link to="/login"><a class="pull-right" style="margin-top: 5px;">Use an existing account</a></router-link>
    </div>
  </div>
</template>

<script>
import auth from '../auth.js'
export default {
  data() {
    return {
      credentials: {
        name: '',
        email: '',
        password: '',
        password_confirm: ''
      },
      error: ''
    }
  },
  computed: {
    valid() {
      return this.credentials.email.length > 0 && this.credentials.password.length > 0 && this.credentials.name.length > 0 &&
        this.credentials.password_confirm.length > 0 && this.validEmail && this.validPassword
    },
    validEmail() {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.credentials.email)
    },
    passwordErrors() {
      var msgs = []
      if (this.credentials.password.length < 8) {
        msgs.push("Password must be at least 8 characters")
      }
      if (this.credentials.password.search(/[a-z]/i) < 0) {
        msgs.push("Password must contain at least one letter.")
      }
      if (this.credentials.password.search(/[0-9]/) < 0) {
        msgs.push("Password must contain at least one digit.")
      }
      if (this.credentials.password != this.credentials.password_confirm) {
        msgs.push("Password and confirmation password are not the same")
      }

      return msgs
    },
    validPassword() {
      if (this.passwordErrors.length > 0) {
        return false;
      }
      return true;

    }
  },
  methods: {
    keySubmit() {
      if (this.valid) {
        this.submit()
      }
    },
    submit() {
      var credentials = {
        name: this.credentials.name,
        email: this.credentials.email,
        password: this.credentials.password,
        password_confirm: this.credentials.password_confirm,
      }

      auth.register(this, credentials)
    }
  }
}
</script>
