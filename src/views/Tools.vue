<template>
  <v-container>
    <v-alert type="info" colored-border border="left" dismissible>
      These functions are still unstable so it's unwise to entangle their errors.
    </v-alert>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>求函数导函数</v-card-title>
          <v-card-text>
            <v-text-field v-model="dericative_input">
              <template v-slot:append-outer>
                <v-btn color="primary" @click="getDerivatived">Submit</v-btn>
              </template>
            </v-text-field>
            <div v-html="derivatived"></div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>化简表达式（慢）</v-card-title>
          <v-card-text>
            <v-text-field v-model="rationalize_input">
              <template v-slot:append-outer>
                <v-btn color="primary" @click="getRationalized">Submit</v-btn>
              </template>
            </v-text-field>
            <div v-html="rationalized"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import "katex/dist/katex.min.css";
import katex from "katex";
import { rationalize } from "mathjs";
import { derivative } from "mathjs";

export default {
  data() {
    return {
      derivatived: "",
      rationalized: "",
      dericative_input: "",
      rationalize_input: ""
    };
  },
  methods: {
    getDerivatived: function() {
      this.derivatived = this.runKatex(derivative(this.dericative_input, "x").toTex())
    },
    getRationalized: function() {
        this.rationalized = this.runKatex(rationalize(this.rationalize_input).toTex())
    },
    runKatex: function(input) {
      return katex.renderToString(input,{
          throwOnError: false,
          displayMode:true
        })
    }
  }
};
</script>
