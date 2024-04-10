<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
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
              :to="{ name: 'post', params: { id: postData.raw.id }}"
            >
              <v-card-title>{{ postData.raw.title }}</v-card-title>
              <v-card-text>{{ postData.raw.time }}</v-card-text>
            </v-card>
          </template>
          <template v-slot:footer>
            <v-pagination
              v-model="currentPage"
              variant="elevated"
              active-color="blue-darken-2"
              :length="numberOfPages"
              density="comfortable"
            />
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import postData from "@/blog/posts.json"

const currentPage = ref(1)
const itemsPerPage = ref(6)
const postsData = ref([...postData].reverse())
const numberOfPages = computed(() => Math.ceil(postsData.value.length / itemsPerPage.value))
</script>