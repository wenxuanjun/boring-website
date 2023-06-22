<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card class="my-md-8 pa-md-4">
          <v-card-title class="text-md-h5 pb-md-8">{{ postData.title }}</v-card-title>
          <v-card-text>
            <div class="markdown-body" v-html="postText"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
import "prismjs/components/prism-kotlin"
import "@/styles/prism.css"
import "@/styles/markdown.css"
import postData from "@/blog/posts.json"

export default {
  methods: {
    getPostText: function () {
      const parser = new MarkdownIt()
      parser.use(pangu).use(prism)
      return parser.render((() => {
        const markdownFiles = import.meta.glob("@/blog/markdown/*.md", { as: 'raw', eager: true })
        return Object.entries(markdownFiles).find(([key]) => key.includes(this.$route.params.id))[1]
      })())
    }
  },
  data() {
    return {
      postData: postData,
      postText: this.getPostText(),
    }
  }
}
</script>
