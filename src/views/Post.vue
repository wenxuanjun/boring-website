<style>
blockquote {
  color: #666;
  border-left: 4px solid #ddd;
  font-style: italic;
  padding: 10px 15px;
  margin: 10px 0;
}
blockquote > p {
  margin-bottom: 0 !important;
}
</style>

<template>
  <v-container>
    <v-card>
      <v-card-title>{{ postData.title }}</v-card-title>
      <v-card-text>
        <div class="text-body-1" v-html="postText" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import MarkdownIt from "markdown-it";
import prism from "markdown-it-prism";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-python";
import "../scss/prism.css";

export default {
  methods: {
    getPostText: function() {
      const parser = new MarkdownIt();
      parser.use(prism);
      return parser.render(
        require("../blog/markdown/" + this.$route.params.id + ".md")
      );
    }
  },
  data() {
    return {
      postData: require("../blog/posts.json")[this.$route.params.id],
      postText: this.getPostText()
    };
  }
};
</script>