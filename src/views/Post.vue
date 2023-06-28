<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card class="my-md-8 pa-md-4">
          <v-card-title class="text-h5 pb-md-6 pb-4 mt-md-2 mt-4">
            {{ currentPostData.title }}
          </v-card-title>
          <v-card-text>
            <div class="markdown-body" v-html="getPostText()"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRoute } from 'vue-router'
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
import postData from "@/blog/posts.json"
import "@/styles/prism.css"
import "@/styles/markdown.css"

const route = useRoute()
const currentPostData = postData[route.params.id - 1]

const getPostText = () => {
  const parser = new MarkdownIt()
  parser.use(pangu).use(prism)
  return parser.render((() => {
    const files = import.meta.glob("@/blog/markdown/*.md", { as: 'raw', eager: true })
    return Object.entries(files).find(([key]) => key.includes(`markdown/${route.params.id}.md`))[1]
  })())
}
</script>