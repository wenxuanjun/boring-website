<template>
  <v-data-iterator
    :items="postsData"
    :items-per-page.sync="itemsPerPage"
    :page="currentPage"
  >
    <template v-slot:default="props">
      <v-card
        class="pa-md-4 px-2 py-4 my-md-8 mb-4"
        v-for="postData in props.items"
        :key="postData.raw.id"
        :to="{ name: 'post', params: { id: postData.raw.id } }"
      >
        <v-card-title>{{ postData.raw.title }}</v-card-title>
        <v-card-text class="py-0">
          <div class="text-medium-emphasis" style="line-height: normal">
            {{ postData.raw.summary }}
          </div>
          <div class="pt-4">
            <v-icon size="x-small">{{ mdiClock }}</v-icon>
            <span class="text-overline pl-2">
              {{ new Date(postData.raw.date).toLocaleDateString('zh-CN', dateConvertOption) }}
            </span>
          </div>
        </v-card-text>
      </v-card>
    </template>
    <template v-slot:footer>
      <v-pagination
        v-model="currentPage"
        class="pb-md-4 pb-2"
        variant="elevated"
        active-color="blue-darken-2"
        :length="numberOfPages"
        density="comfortable"
      />
    </template>
  </v-data-iterator> 
</template>

<script setup>
import { ref, computed } from 'vue'
import { mdiClock } from '@mdi/js'
import postsData from "@/blog/metadata.json"

const currentPage = ref(1)
const itemsPerPage = ref(6)

const dateConvertOption = { year: 'numeric', month: 'short', day: 'numeric' }
const numberOfPages = computed(() => Math.ceil(postsData.length / itemsPerPage.value))
</script>