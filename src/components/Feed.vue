<template>
  <div class="play">
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'Feed',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    getAll () {
      this.axios.get('http://192.168.1.118:5000/play')
        .then(function (response) {
          console.log(response.data.status)
        })
    }
  },
  beforeMount () {
    this.getAll()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
