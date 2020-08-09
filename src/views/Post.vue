<style>
img {
  max-width: 80%;
}
@media screen and (max-width: 960px) {
  img {
    max-width: 100%;
  }
}
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
    <v-card class="mt-4">
      <v-card-text>
        <Vssue :title="title" :options="options"/>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { VssueComponent } from "vssue";
import GithubV3 from "@vssue/api-github-v3";
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
import "vssue/dist/vssue.css";

export default {
  components: {
    Vssue: VssueComponent,
  },
  methods: {
    getPostText: function () {
      const parser = new MarkdownIt();
      parser.use(prism);
      return parser.render(
        require("../blog/markdown/" + this.$route.params.id + ".md")
      );
    },
  },
  data() {
    return {
      postData: require("../blog/posts.json")[this.$route.params.id - 1],
      postText: this.getPostText(),
      vssue: {
        title: "Vssue Demo",
        options: {
          api: GithubV3,
          owner: "wenxuanjun",
          repo: "boring-website",
          clientId: "7311afee29388c58d4c6",
          clientSecret: "e4b9ddbd593f326e04d54363bef4bcecc25110f0"
        },
      },
    };
  },
};
</script>
