<template>
  <div class="loginForm">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-brand>Twitter Memories</b-navbar-brand>
    </b-navbar>
    <b-container align="left" style="margin-top: 10px">
      <b-form>
        <b-form-group id="inputUsername"
                      label="Username:"
                      label-for="username">
          <b-form-input id="username"
                        v-model="form.username"
                        required
                        placeholder="username">
          </b-form-input>
        </b-form-group>
        <b-form-group id="inputPassword"
                      label="Password:"
                      label-for="password">
          <b-form-input id="password"
                        type="password"
                        v-model="form.password"
                        required
                        placeholder="password">
          </b-form-input>
        </b-form-group>
        <p>{{ response_message }}</p>
        <b-button v-on:click="onLogin" variant="primary">Login</b-button>
        <b-button v-on:click="onRegister" variant="secondary">Register</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'HelloWorld',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      response_message: ''
    }
  },
  methods: {
    onLogin () {
      let self = this
      console.log('login')
      let config = {
        auth: {
          'username': this.form.username,
          'password': this.form.password
        }
      }
      return this.axios.get('http://192.168.1.118:5000/api/token', config)
        .then(function (response) {
          console.log(response.data.token)
          localStorage.setItem('tweet-token', response.data.token)
          self.$router.push('/feed')
        })
        .catch(error => {
          console.log(error.message)
          this.response_message = 'Incorrect Credentials'
        })
    },
    onRegister () {
      let self = this
      console.log('register')
      let params = {'username': this.form.username, 'password': this.form.password}
      this.axios.post('http://192.168.1.118:5000/api/register', params)
        .then(function (response) {
          self.form.username = ''
          self.form.password = ''
          self.response_message = response.data.status
        })
    },
    refreshToken () {
      localStorage.setItem('tweet-token', '')
    }
  },
  beforeMount () {
    this.refreshToken()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
