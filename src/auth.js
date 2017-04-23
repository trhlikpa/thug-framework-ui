import Api from './mixins/Api.vue'

export default {
  user: {
    authenticated: false,
    name: '',
    email: ''
  },
  login(context, creds) {
    context.$http.post(Api.data().baseUrl + '/api/v1.0/auth/login/', creds).then((data) => {
        localStorage.setItem('token', data.body.token)
        localStorage.setItem('email', creds.email)

        this.user.email = creds.email
        this.user.authenticated = true

        context.$router.push({
          name: 'Jobs'
        })

        location.reload()
      },
      (err) => {
        context.error = err.body.message
      })
  },
  register(context, creds) {
    context.$http.post(Api.data().baseUrl + '/api/v1.0/auth/register/', creds).then((data) => {

        context.$router.push({
          name: 'Login'
        })
      },
      (err) => {
        context.error = err.body.message
      })
  },
  changePassword(context, creds) {
    context.$http.post(Api.data().baseUrl + '/api/v1.0/auth/passwordchange/', creds).then((data) => {
      this.logout()
      },
      (err) => {
        context.error = err.body.message
      })
  },
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    this.user.authenticated = false
    this.user.email = ''
  },
  checkAuth() {
    var jwt = localStorage.getItem('token')
    var email = localStorage.getItem('email')

    if (jwt) {
      this.user.authenticated = true
      this.user.email = email
    } else {
      this.user.authenticated = false
      this.user.email = ''
    }
  },
  getAuthHeader() {
    var token = localStorage.getItem('token')

    if (token == null) {
      return null
    }

    return token.toString()
  }
}
