<template>
  <blockquote class="twitter-tweet" data-lang="en"><a :href="get_url"></a></blockquote>
</template>

<script>
export default {
  name: 'Tweet',
  props: ['tweet_id'],
  data () {
    return {
      base_url: 'https://twitter.com/account/status/'
    }
  },
  computed: {
    get_url: function () {
      return this.base_url + this.tweet_id
    }
  }
}
</script>

<style scoped>

</style>
