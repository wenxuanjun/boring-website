<template>
  <v-card class="pa-md-4">
    <v-card-title class="text-md-h5 text-h6 pb-md-6 pb-4 mt-md-2 mt-4">
      {{ currentPostData.title }}
    </v-card-title>
    <v-card-text>
      <div class="markdown-body" v-html="renderedText"></div>
    </v-card-text>
  </v-card>
  <v-card class="my-md-8 my-4 pa-md-4 pt-2">
    <v-card-title class="pb-md-6 pb-4">
      <v-icon size="x-small" start>{{ mdiCommentMultiple }}</v-icon>
      <span class="font-weight-bold text-body-1 pl-2">评论</span>
    </v-card-title>
    <v-card-text>
      <Giscus
        repo="wenxuanjun/boring-website"
        repoId="MDEwOlJlcG9zaXRvcnkyNzUwNDQ4NzQ="
        category="General"
        categoryId="DIC_kwDOEGTaCs4CeqeG"
        mapping="og:title"
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        :theme="giscusTheme"
        lang="zh-CN"
        loading="lazy"
      />
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import MarkdownIt from "markdown-it"
import MarkdownItPrism from "markdown-it-prism"
import MarkdownItMeta from "markdown-it-meta"
import Giscus from '@giscus/vue'
import { mdiCommentMultiple } from '@mdi/js'
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

useHead({
  title: currentPostData.title,
  meta: [{
    property: 'og:title',
    content: currentPostData.title
  }]
})

const darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
const giscusTheme = darkTheme ? 'noborder_gray' : 'light_tritanopia'

const parser = new MarkdownIt()
parser.use(MarkdownItMeta)
parser.use(MarkdownItPrism)

const markdownFiles = Object.entries(import.meta.glob(
  "@/blog/markdown/*.md",
  { query: '?raw', import: 'default', eager: true }
))

const targetFileKey = `${route.params.id}.md`
const targetFileEntry = markdownFiles.find(([key]) => key.includes(targetFileKey))
const renderedText = parser.render(targetFileEntry[1])
</script>
