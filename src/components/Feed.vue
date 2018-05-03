<template>
  <!--TODO: HANDLE THE THREE STATES: FILE UPLOAD, FILE PROCESS, TWEETS SHOW-->
  <div class="the-feed">
    <b-navbar toggleable="md" type="dark" variant="dark">
        <b-navbar-brand>Twitter Memories</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item right><b-button>Logout</b-button></b-nav-item>
        </b-navbar-nav>
    </b-navbar>
    <b-container align="center">
      <h1 align="center">Tweets from the Past</h1>
      <b-row>
        <b-col>
        </b-col>
        <div class="processing">
          <p>Your archive is currently being processed, refresh to check if your tweets are now ready.</p>
        </div>
        <div class="file_upload" v-show="opp_file_stat">
          <p>Upload your twitter archive, you can download it by following <a href="https://help.twitter.com/en/managing-your-account/how-to-download-your-twitter-archive">this</a></p>
          <b-form-file class="mt-3" v-model="file" style="display: inline-block" plain></b-form-file>
          <b-button @click="uploadFile" style="display: inline-block">Submit</b-button>
        </div>
        <b-col v-show="file_stat">
          <!--Based on current layout, we just populate the collect_of_id array with response from GET /tweets-->
          <Tweet v-for="item in collect_of_id" v-bind:key="item" :tweet_id="item"></Tweet>
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
import Tweet from './Tweet'
export default {
  name: 'Feed',
  components: {Tweet},
  data () {
    return {
      collect_of_id: [
        '989392196687155201',
        '989283779872149505',
        '976628869640826880',
        '975081484477390848'
      ],
      file_stat: false,
      file: '',
      opp_file_stat: true,
      processing_done: false
    }
  },
  methods: {
    getAll () {
      this.getFileStatus()
      if (this.file_stat) {
        this.getTweets()
      }
    },
    getFileStatus () {
      let self = this
      let config = {auth: {'username': localStorage.getItem('tweet-token'), 'password': 'unused'}}
      this.axios.get('http://192.168.1.118:5000/api/file_status', config)
        .then(function (response) {
          self.file_stat = response.data.file_status
        })
    },
    getTweets () {
      let config = {auth: {'username': localStorage.getItem('tweet-token'), 'password': 'unused'}}
      this.axios.get('http://192.168.1.118:5000/api/tweets', config)
        .then(function (response) {
          console.log(response.data)
        })
    },
    uploadFile () {
      const formData = new FormData()
      formData.append('file', this.file)
      let config = {auth: {'username': localStorage.getItem('tweet-token'), 'password': 'unused'}}
      this.axios.post('http://192.168.1.118:5000/api/upload', formData, config)
        .then(function (response) {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  },
  watch: {
    file_stat: function () {
      this.opp_file_stat = !this.file_stat
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
