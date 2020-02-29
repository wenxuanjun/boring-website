<template>
  <v-container>
    <v-alert
      type="info"
      colored-border
      border="left"
      dismissible
    >These functions are still unstable so it's unwise to entangle their errors.</v-alert>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span>表达式计算</span>
            <v-dialog max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn x-small class="ma-2" color="grey" v-on="on">Help</v-btn>
              </template>
              <v-card>
                <v-card-title>帮助</v-card-title>
                <v-card-text>
                  <p class="font-weight-black">这是个极其简单的计算器！</p>
                  <p>只需要把想计算的表达式输入，然后点击按钮即可（废话）。</p>
                  <p>支持多种函数如：sin(x)、sqrt()、log(x, [n])等，具体为哪些请自行摸索……</p>
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
          <v-card-title>函数求导</v-card-title>
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
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>OCR</v-card-title>
          <v-card-text>
            <v-file-input accept="image/*" v-model="ocr_input">
              <template v-slot:append-outer>
                <v-btn color="primary" @click="doTesseract">Submit</v-btn>
              </template>
            </v-file-input>
            <v-row>
              <v-col cols="4">{{ ocr_status }}</v-col>
              <v-col cols="8">
                <v-progress-linear color="primary" height="10" v-model="ocr_progress" rounded></v-progress-linear>
              </v-col>
            </v-row>
            <v-dialog v-model="ocr_dialog" max-width="500px">
              <v-card>
                <v-card-title>OCR Result</v-card-title>
                <v-card-text v-html="ocr_result"></v-card-text>
              </v-card>
            </v-dialog>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar">
      {{ snackbar_text }}
      <v-btn color="primary" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import "katex/dist/katex.min.css";
import katex from "katex";
import { rationalize, derivative, evaluate, parse } from "mathjs";
import { createWorker } from "tesseract.js";

export default {
  data() {
    return {
      snackbar: false,
      snackbar_text: null,
      ocr_input: null,
      ocr_status: null,
      ocr_progress: null,
      ocr_dialog: false,
      ocr_result: null,
      evaluated: null,
      derivatived: null,
      rationalized: null,
      evaluate_input: null,
      dericative_input: null,
      rationalize_input: null
    };
  },
  methods: {
    getEvaluated: function() {
      try {
        this.evaluated = this.runKatex(
          parse(evaluate(this.evaluate_input)).toTex()
        );
      } catch (err) {
        this.enableSnackbar(err);
      }
    },
    getDerivatived: function() {
      try {
        this.derivatived = this.runKatex(
          derivative(this.dericative_input, "x").toTex()
        );
      } catch (err) {
        this.enableSnackbar(err);
      }
    },
    getRationalized: function() {
      try {
        this.rationalized = this.runKatex(
          rationalize(this.rationalize_input).toTex()
        );
      } catch (err) {
        this.enableSnackbar(err);
      }
    },
    runKatex: function(input) {
      return katex.renderToString(input, {
        throwOnError: false,
        displayMode: true
      });
    },
    enableSnackbar: function(text) {
      this.snackbar_text = text;
      this.snackbar = true;
    },
    doTesseract: function() {
      const worker = createWorker({
        langPath: "/tesseract",
        workerPath: "https://cdn.jsdelivr.net/npm/tesseract.js@2.0.2/dist/worker.min.js",
        corePath: "https://cdn.jsdelivr.net/npm/tesseract.js-core@v2.0.0/tesseract-core.wasm.js",
        logger: message => {
          this.ocr_status = message.status;
          this.ocr_progress = message.progress * 100;
        }
      });
      (async () => {
        await worker.load();
        await worker.loadLanguage("eng+chi_sim+chi_sim_vert");
        await worker.initialize("eng+chi_sim+chi_sim_vert");
        const {
          data: { text }
        } = await worker.recognize(this.ocr_input);
        this.ocr_result = text.replace('\n','<br/>');
        this.ocr_dialog = true;
        await worker.terminate();
      })();
    }
  }
};
</script>
