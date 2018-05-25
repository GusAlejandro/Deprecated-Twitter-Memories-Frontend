<template>
  <!--TODO: Clean up how we handle the 3 states in the watch/getAll JS-->
  <div class="the-feed">
    <b-navbar toggleable="md" type="dark" variant="dark">
        <b-navbar-brand>Twitter Memories</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item right><b-button @click="logout">Logout</b-button></b-nav-item>
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
          <Tweet v-for="item in collect_of_id" v-bind:key="item" :id="item"><div class="spinner"></div></Tweet>
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
import Tweet from 'vue-tweet-embed/tweet'

export default {
  name: 'Feed',
  components: {Tweet},
  data () {
    return {
      collect_of_id: [],
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
      // this.getTweets()
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
    },
    getFileStatus () {
      let self = this
      let config = {auth: {'username': localStorage.getItem('tweet-token'), 'password': 'unused'}}
      this.axios.get('https://twitter-memories.herokuapp.com/api/file_status', config)
        .then(function (response) {
          self.file_stat = response.data.file_status
          // console.log(self.file_stat)
        })
    },
    getTweets () {
      let self = this
      console.log('we out here')
      let currDate = new Date()
      let month = currDate.getMonth() + 1
      if (month <= 9) {
        month = '0' + month.toString()
      } else {
        month = month.toString()
      }
      let date = currDate.getDate()
      if (date <= 9) {
        date = '0' + date.toString()
      } else {
        date = date.toString()
      }
      let config = {auth: {'username': localStorage.getItem('tweet-token'), 'password': 'unused'}, params: {'month': month, 'date': date}}
      this.axios.get('https://twitter-memories.herokuapp.com/api/tweets', config)
        .then(function (response) {
          if (response.data.TWEETS.length === 0) {
            self.collect_of_id.push('997275242975322112')
          } else {
            for (let i = 0; i < response.data.TWEETS.length; i++) {
              self.collect_of_id.push(response.data.TWEETS[i]['id'])
            }
          }
        })
    },
    uploadFile () {
      const formData = new FormData()
      formData.append('file', this.file)
      let config = {auth: {'username': localStorage.getItem('tweet-token'), 'password': 'unused'}}
      this.axios.post('https://twitter-memories.herokuapp.com/api/upload', formData, config)
        .then(function (response) {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    logout () {
      let self = this
      localStorage.setItem('tweet-token', '')
      self.$router.push('/')
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
        this.getTweets()
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
