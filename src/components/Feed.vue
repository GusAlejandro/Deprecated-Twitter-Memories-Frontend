<template>
  <div class="the-feed">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand>Twitter Memories</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-navbar-item right><b-button>Logout</b-button></b-navbar-item>
        </b-navbar-nav>
    </b-navbar>
    <b-container align="center">
      <h1 align="center">Tweets from the Past</h1>
      <b-row>
        <b-col>
        </b-col>
        <b-col>
          <blockquote class="twitter-tweet" data-lang="en"><a href="https://twitter.com/account/status/989392196687155201"></a></blockquote>
          <blockquote class="twitter-tweet" data-lang="en"><a href="https://twitter.com/account/status/989283779872149505"></a></blockquote>
          <blockquote class="twitter-tweet" data-lang="en"><a href="https://twitter.com/account/status/976628869640826880"></a></blockquote>
          <blockquote class="twitter-tweet" data-lang="en"><a href="https://twitter.com/account/status/975081484477390848"></a></blockquote>
        </b-col>
        <b-col>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'Feed',
  data () {
    return {
    }
  },
  methods: {
    getAll () {
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
