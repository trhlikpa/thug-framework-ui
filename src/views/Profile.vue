<template>
<div v-if="this.user.authenticated">
  <h1 class="page-header">Profile</h1>
  <div class="col-sm-6 col-sm-offset-3">
    <div class="row">
      <div class="col-sm-2">
        <label>Email: </label>
      </div>
      {{user.email}}
    </div>
    <div class="row" style="margin-top: 25px;">
      <div class="col-sm-4">
        <label>Change password: </label>
      </div>
    </div>
    <div class="row password-input-group">
      <div class="form-group">
        <input autofocus type="password" class="form-control" v-model="credentials.password" @keyup.enter="keySubmit()" placeholder="Enter password">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" v-model="credentials.newPassword" @keyup.enter="keySubmit()" placeholder="Enter new password">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" v-model="credentials.newPasswordConfirmation" @keyup.enter="keySubmit()" placeholder="Confirm new password">
      </div>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div class="alert alert-danger" v-for="erorMsg in passwordErrors">
        <strong>New password error - </strong> {{ erorMsg }}
      </div>
      <button v-if="valid" v-on:click="submit()" class="btn btn-success">Enter</button>
      <button v-else class="btn btn-default disabled">Enter</button>
    </div>
  </div>
</div>
</template>

<script>
import UserAuthentication from '../mixins/UserAuthentication.vue'
import auth from '../auth.js'
export default {
  mixins: [UserAuthentication],
  data() {
    return {
      credentials: {
        password: '',
        newPassword: '',
        newPasswordConfirmation: ''
      },
      error: ''
    }
  },
  computed: {
    valid() {
      return this.credentials.password.length > 0 && this.passwordErrors.length < 1
    },
    passwordErrors() {
      var msgs = []
      if (this.credentials.newPassword.length < 8) {
        msgs.push("New password must be at least 8 characters")
      }
      if (this.credentials.newPassword.search(/[a-z]/i) < 0) {
        msgs.push("New password must contain at least one letter.")
      }
      if (this.credentials.newPassword.search(/[0-9]/) < 0) {
        msgs.push("New password must contain at least one digit.")
      }
      if (this.credentials.newPassword != this.credentials.newPasswordConfirmation) {
        msgs.push("New password and confirmation password are not the same")
      }

      return msgs
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
        password: this.credentials.password,
        new_password: this.credentials.newPassword,
        new_password_confirm: this.credentials.newPasswordConfirmation,
      }

      auth.changePassword(this, credentials)
    }
  },
  mounted() {
    if (this.user.authenticated) {
      return
    } else {
      this.$router.push('login')
    }
  }
}
</script>

<style>
.password-input-group {
  margin: 5px 15px !important;
}
</style>
