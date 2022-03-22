<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card class="my-md-8 pa-md-4">
          <v-card-title class="text-md-h5 pb-md-8">{{ postData.title }}</v-card-title>
          <v-card-text>
            <div class="markdown-body" v-html="postText" />
          </v-card-text>
        </v-card>
        <v-card class="my-md-8 mt-4">
          <v-card-text>
            <Vssue :title="vssue.title" :options="vssue.options" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { VssueComponent } from "../plugins/vssue"
import GithubV3 from "@vssue/api-github-v3"
import MarkdownIt from "markdown-it"
import pangu from 'markdown-it-pangu'
import prism from "markdown-it-prism"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-c"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-python"
import "../styles/prism.css"
import "../styles/vssue.css"
import "../styles/markdown.css"

export default {
  components: {
    Vssue: VssueComponent,
  },
  methods: {
    getPostText: function () {
      const parser = new MarkdownIt()
      parser.use(pangu).use(prism)
      return parser.render(
        require("../blog/markdown/" + this.$route.params.id + ".md")
      )
    },
  },
  data() {
    return {
      postData: require("../blog/posts.json")[this.$route.params.id - 1],
      postText: this.getPostText(),
      vssue: {
        title: "No: " + this.$route.params.id,
        options: {
          api: GithubV3,
          owner: "wenxuanjun",
          repo: "boring-website",
          clientId: "7311afee29388c58d4c6",
          clientSecret: "e4b9ddbd593f326e04d54363bef4bcecc25110f0"
        },
      }
    };
  },
};
</script>
