<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-data-iterator
          :items="postsData"
          :items-per-page.sync="itemsPerPage"
          :page="page"
        >
          <template v-slot:default="props">
            <v-card
              class="pa-md-4 my-md-8 mb-4"
              v-for="postData in props.items"
              :key="postData.raw.id"
              :to="{ name: 'post', params: { id: postData.raw.id }}"
            >
              <v-card-title>{{ postData.raw.title }}</v-card-title>
              <v-card-text>{{ postData.raw.time }}</v-card-text>
            </v-card>
          </template>
          <template v-slot:footer>
            <v-pagination v-model="page" :length="numberOfPages" density="comfortable"></v-pagination>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { VDataIterator } from 'vuetify/labs/VDataIterator'
import postData from "@/blog/posts.json"

export default {
  components: {
    VDataIterator,
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 6,
      postsData: [...postData].reverse()
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.postsData.length / this.itemsPerPage)
    }
  }
}
</script>