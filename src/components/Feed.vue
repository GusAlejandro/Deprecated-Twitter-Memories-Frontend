<template>
  <!--TODO: HANDLE THE THREE STATES: FILE UPLOAD FORM, FILE PROCESS, TWEETS SHOW-->
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
        <div v-show="file_processing">
          <p>Your archive is currently being processed, refresh to check if your tweets are now ready.</p>
        </div>
        <div class="file_upload" v-show="file_not_there">
          <p>Upload your twitter archive, you can download it by following <a href="https://help.twitter.com/en/managing-your-account/how-to-download-your-twitter-archive">this</a></p>
          <b-form-file class="mt-3" v-model="file" style="display: inline-block" plain></b-form-file>
          <b-button @click="uploadFile" style="display: inline-block">Submit</b-button>
        </div>
        <b-col v-show="file_done">
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
      file_stat: '',
      file: '',
      file_not_there: false,
      file_processing: false,
      file_done: false
    }
  },
  methods: {
    getAll () {
      this.getFileStatus()
      if (this.file_stat === '0') {
        this.file_not_there = true
        this.file_processing = false
        this.file_done = false
      } else if (this.file_stat === '1') {
        this.file_not_there = false
        this.file_processing = true
        this.file_done = false
      } else if (this.file_stat === '2') {
        this.file_not_there = false
        this.file_processing = false
        this.file_done = true
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
    // probably dont need this, since we only hit /api/file_status before mount
    file_stat: function () {
      if (this.file_stat === '0') {
        this.file_not_there = true
        this.file_processing = false
        this.file_done = false
      } else if (this.file_stat === '1') {
        this.file_not_there = false
        this.file_processing = true
        this.file_done = false
      } else if (this.file_stat === '2') {
        this.file_not_there = false
        this.file_processing = false
        this.file_done = true
      }
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
