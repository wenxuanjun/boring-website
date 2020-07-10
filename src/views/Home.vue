<template>
  <v-container>
    <v-data-iterator :items="postsData.reverse()" :items-per-page.sync="itemsPerPage" :page="page" hide-default-footer>
      <template v-slot:default="props">
        <v-card class="my-4" v-for="(postData, index) in props.items" :key="postData.name" :to="{ name: 'post', params: { id: postsData.length - index - 1 }}">
          <v-card-title>{{ postData.title }}</v-card-title>
          <v-card-text>{{ postData.time }}</v-card-text>
        </v-card>
      </template>
      <template v-slot:footer>
        <v-pagination v-model="page" :length="numberOfPages"></v-pagination>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      itemsPerPage: 6,
      postsData: require("../blog/posts.json")
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.postsData.length / this.itemsPerPage);
    }
  }
};
</script>