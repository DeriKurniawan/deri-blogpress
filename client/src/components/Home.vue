<template lang="html">
  <div class="ui container">
    <h2>Home</h2>
    <div v-if="is_login">
      Helo! {{ user.name }}!
    </div>
    <div class="ui divided item">
      <div class="item" v-for="article in articles">
        <div class="content">
          <a class="header">{{ article.title }}</a>
          <div class="meta">
            <span class="cinema">{{ article.author.name }}</span>
          </div>
          <div class="description">
            <p>{{ article.content }}</p>
          </div>
          <div class="extra">
            <div class="ui label">
              {{ article.category }}
            </div>
            <div v-if="article.author.username == user.username">
              <a class="ui right floated yellow button" @click="clickEditArticle(article)">Edit</a>
              <a class="ui right floated red button" @click="clickDeleteArticle(article)">Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import {mapGetters, mapActions} from 'vuex'

export default {
  computed: mapGetters({
    message: 'getMessage',
    user: 'getUser',
    is_login: 'getLoginStatus',
    articles: 'getArticles'
  }),
  methods: {
    ...mapActions([
      'fetchArticles',
      'deleteArticle'
    ]),
    clickEditArticle(article) {

      this.$router.push({
        path: '/articleform',
        query: {id: article._id}
      })
    },
    clickDeleteArticle(article) {
      this.deleteArticle(article)
    }
  },
  created() {
    
  }
}
</script>
