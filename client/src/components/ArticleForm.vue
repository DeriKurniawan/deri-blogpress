<template lang="html">
  <form class="ui form" @submit.prevent="submitArticleForm">
    <div class="field">
      <label>Title</label>
      <input type="text" name="full-name" placeholder="Title" v-model="articleForm.title">
    </div>

    <div class="field">
      <label>Content</label>
      <textarea v-model="articleForm.content"></textarea>
    </div>

    <div class="field">
      <label>Category</label>
      <select class="ui fluid dropdown" v-model="articleForm.category">
        <option value="">Select one..</option>
        <option value="food">Food</option>
        <option value="music">Music</option>
        <option value="environment">Environment</option>
      </select>
    </div>


    <button class="ui button" type="submit">Publish</button>
  </form>


</template>

<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data() {
      return {
        articleForm: {
          _id: null,
          title: '',
          content: '',
          category: '',
          author: ''
        }
      }
    },
    methods: {
      ...mapActions([
        'saveArticle'
      ]),
      ...mapGetters([
        'getArticles'
      ]),
      submitArticleForm() {
        console.log("submitArticleForm", this.articleForm)
        this.saveArticle(this.articleForm)

        this.$router.push('/')
      }
    },
    created() {
      console.log("ArticleForm created!");
      console.log(this.$router.currentRoute.);

      if(this.$router.currentRoute.query.id != null){
        let article_id = this.$router.currentRoute.query.id
        console.log("article_id", article_id)
        // get article with that id from store

        let articles = this.getArticles()
        console.log("articles", articles)


        var index = articles.findIndex( a => a._id == article_id )
        console.log("index", index)
        if( index != -1 ) {
          this.articleForm = articles[index]
          console.log("found in articles", this.articleForm)
        }
      }
    }
  }
</script>

<style media="screen">
</style>
