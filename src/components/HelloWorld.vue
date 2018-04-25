<template>
  <div class="loginForm">
    <b-form>
      <b-form-group id="inputUsername"
                    label="Usename:"
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
      <b-button v-on:click="checkSuccess" variant="primary">Login</b-button>
      <b-button v-on:click="onRegister" variant="secondary">Register</b-button>
    </b-form>
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
      }
    }
  },
  methods: {
    onLogin () {
      console.log('login')
      return this.axios.get('http://192.168.1.118:5000/login?username=' + this.form.username + '&password=' + this.form.password)
        .then(function (response) {
          return response.data
        })
    },
    onRegister () {
      console.log('register')
      let params = {'username': this.form.username, 'password': this.form.password}
      this.axios.post('http://192.168.1.118:5000/register', params)
        .then(function (response) {
          console.log(response.data.status)
        })
    },
    checkSuccess () {
      this.onLogin()
        .then(data => {
          if (data.status === 'Login Successful!') {
            this.$router.push({path: '/tweets'})
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
