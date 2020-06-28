<template>
  <v-container>
    <v-alert colored-border type="info" border="left" dismissible>These functions are still unstable so it's unwise to entangle their errors.</v-alert>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span>表达式计算</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="evaluate_input" @keyup.enter="getEvaluated"></v-text-field>
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
            <v-text-field v-model="dericative_input" @keyup.enter="getDerivatived"></v-text-field>
            <div v-html="derivatived"></div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>化简表达式（慢）</v-card-title>
          <v-card-text>
            <v-text-field v-model="rationalize_input" @keyup.enter="getRationalized"></v-text-field>
            <div v-html="rationalized"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>图片转文字（不准确）</v-card-title>
          <v-card-text>
            <v-file-input accept="image/*" v-model="ocr.input">
              <template v-slot:append-outer>
                <v-btn color="primary" @click="doTesseract">Submit</v-btn>
              </template>
            </v-file-input>
            <div v-show="ocr.status_show">
              <p class="text-capitalize font-weight-bold">{{ ocr.status }}</p>
              <v-progress-linear color="primary" height="10" v-model="ocr.progress" rounded></v-progress-linear>
            </div>
            <v-dialog v-model="ocr.dialog" max-width="500px">
              <v-card>
                <v-card-title>转换结果</v-card-title>
                <v-card-text v-html="ocr.result"></v-card-text>
              </v-card>
            </v-dialog>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar.show">
      {{ snackbar.text }}
      <v-btn color="primary" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import 'katex/dist/katex.min.css';
import katex from "katex";
import { rationalize, derivative, evaluate, parse } from "mathjs";
import { createWorker } from "tesseract.js";

export default {
  data() {
    return {
      snackbar: {
        show: false,
        text: null
      },
      ocr: {
        input: null,
        status: null,
        status_show: false,
        progress: null,
        dialog: false,
        result: null
      },
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
      this.snackbar.text = text;
      this.snackbar.show = true;
    },
    doTesseract: function() {
      if (this.ocr.input == null) {
        this.enableSnackbar("Please input your image.");
        return;
      }
      const worker = createWorker({
        langPath: "https://cdn.wendster.com/tesseract",
        workerPath: "https://cdn.jsdelivr.net/npm/tesseract.js@2.0.2/dist/worker.min.js",
        corePath: "https://cdn.jsdelivr.net/npm/tesseract.js-core@v2.0.0/tesseract-core.wasm.js",
        logger: message => {
          this.ocr.status = message.status;
          this.ocr.progress = message.progress * 100;
        }
      });
      (async () => {
        this.ocr.status_show = true;
        await worker.load();
        await worker.loadLanguage("eng+chi_sim+chi_sim_vert");
        await worker.initialize("eng+chi_sim+chi_sim_vert");
        const {
          data: { text }
        } = await worker.recognize(this.ocr.input);
        this.ocr.result = text;
        this.ocr.dialog = true;
        await worker.terminate();
        this.ocr.status_show = false;
      })();
    }
  }
};
</script>
