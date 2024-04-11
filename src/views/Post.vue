<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card class="my-md-8 pa-md-4">
          <v-card-title class="text-h5 pb-md-6 pb-4 mt-md-2 mt-4">
            {{ currentPostData.title }}
          </v-card-title>
          <v-card-text>
            <div class="markdown-body" v-html="renderedText"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRoute } from 'vue-router'
import MarkdownIt from "markdown-it"
import MarkdownItPrism from "markdown-it-prism"
import MarkdownItMeta from "markdown-it-meta"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-c"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-python"
import "prismjs/components/prism-kotlin"
import postsData from "@/blog/metadata.json"
import "@/styles/prism.css"
import "@/styles/markdown.css"

const route = useRoute()
const currentPostData = postsData.find(post => post.id === route.params.id)

const parser = new MarkdownIt()
parser.use(MarkdownItMeta)
parser.use(MarkdownItPrism)

const markdownFiles = Object.entries(import.meta.glob(
  "@/blog/markdown/*.md",
  { query: '?raw', import: 'default', eager: true }
))

const targetFileKey = `markdown/${route.params.id}.md`
const targetFileEntry = markdownFiles.find(([key]) => key.includes(targetFileKey))
const renderedText = parser.render(targetFileEntry[1])
</script>