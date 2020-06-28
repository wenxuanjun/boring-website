<template>
  <v-container>
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>
        <div class="text-body-1" v-html="postText" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import MarkdownIt from "markdown-it";
import prism from "markdown-it-prism";
import "prismjs/components/prism-bash";
import "../scss/prism.css";

export default {
  methods: {
    getPostText: function() {
      const parser = new MarkdownIt();
      parser.use(prism);
      return parser.render(
        require("../assets/blog/" + this.$route.params.id + ".md")
      );
    }
  },
  data() {
    return {
      postText: this.getPostText()
    };
  }
};
</script>