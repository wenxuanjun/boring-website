<template>
  <v-container>
    <v-alert type="info" colored-border border="left" dismissible>
      These functions are still unstable so it's unwise to entangle their errors.
    </v-alert>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span>计算表达式</span>
            <v-dialog max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn x-small class="ma-2" color="grey" v-on="on">Help</v-btn>
              </template>
              <v-card>
                <v-card-title>帮助</v-card-title>
                <v-card-text>
                  <p class="font-weight-black">这是个极其简单的计算器！</p>
                  <p>只需要把想计算的表达式输入，然后点击按钮即可（废话）。</p>
                  <p>支持多种函数如：sin(x)、log(x, [n])等，具体为哪些请自行摸索……</p>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="evaluate_input">
              <template v-slot:append-outer>
                <v-btn color="primary" @click="getEvaluated">Submit</v-btn>
              </template>
            </v-text-field>
            <div v-html="evaluated"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
import { rationalize, derivative, evaluate, parse } from "mathjs";

export default {
  data() {
    return {
      evaluated: "",
      derivatived: "",
      rationalized: "",
      evaluate_input: "",
      dericative_input: "",
      rationalize_input: ""
    };
  },
  methods: {
    getEvaluated: function() {
      this.evaluated = this.runKatex(
        parse(evaluate(this.evaluate_input)).toTex()
      );
    },
    getDerivatived: function() {
      this.derivatived = this.runKatex(
        derivative(this.dericative_input, "x").toTex()
      );
    },
    getRationalized: function() {
      this.rationalized = this.runKatex(
        rationalize(this.rationalize_input).toTex()
      );
    },
    runKatex: function(input) {
      return katex.renderToString(input, {
        throwOnError: false,
        displayMode: true
      });
    }
  }
};
</script>
