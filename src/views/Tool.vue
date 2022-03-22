<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card class="my-md-8 pa-md-4 mb-4">
          <v-card-title>图片转文字（不准确）</v-card-title>
          <v-card-text>
            <v-file-input accept="image/*" v-model="ocr.input">
              <template v-slot:append-outer>
                <v-btn color="primary" @click="preTesseract">Submit</v-btn>
              </template>
            </v-file-input>
            <div v-show="ocr.status_show">
              <p class="text-capitalize font-weight-bold">{{ ocr.status }}</p>
              <v-progress-linear
                color="primary"
                height="10"
                v-model="ocr.progress"
                rounded
              ></v-progress-linear>
            </div>
            <v-dialog v-model="ocr.dialog.setting" max-width="500px">
              <v-card>
                <v-card-title>参数设置</v-card-title>
                <v-card-text>
                  <v-select
                    v-model="ocr.quality"
                    :items="ocr.settings.quality"
                    label="模型质量"
                  ></v-select>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="doTesseract">Go</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="ocr.dialog.result" max-width="500px">
              <v-card>
                <v-card-title>转换结果</v-card-title>
                <v-card-text v-html="ocr.result"></v-card-text>
              </v-card>
            </v-dialog>
          </v-card-text>
        </v-card>
        <v-card class="pa-md-4">
          <v-card-title>项目筛选</v-card-title>
          <v-card-text>
            <v-textarea
              outlined
              label="原始内容"
              v-model="filter.text"
            ></v-textarea>
            <v-btn color="primary" block @click="doFilterList">Submit</v-btn>
            <v-list-item-group dense class="mt-3">
              <v-list-item
                v-for="(item, key) in filter.array"
                :key="key"
                @click="doFilterRemove(key)"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar.show">
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar.show = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
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
        quality: "normal",
        result: null,
        dialog: {
          setting: false,
          result: false
        },
        settings: {
          quality: ["fast", "normal", "best"]
        }
      },
      filter: {
        text: null,
        array: []
      }
    }
  },
  methods: {
    enableSnackbar: function (text) {
      this.snackbar.text = text
      this.snackbar.show = true
    },
    doFilterList: function () {
      var array = []
      this.filter.text.trim().split("\n").forEach((text) => array.push(text))
      this.filter.array = array
    },
    doFilterRemove: function (key) {
      this.filter.array.splice(key, 1)
      var text = ""
      for (var i = 0, len = this.filter.array.length; i < len; i++)
        text += this.filter.array[i] + "\n"
      this.filter.text = text
    },
    preTesseract: function () {
      this.ocr.input == null ? this.enableSnackbar("Please upload your picture.") : this.ocr.dialog.setting = true
    },
    doTesseract: function () {
      this.ocr.dialog.setting = false
      const worker = createWorker({
        langPath: "https://cdn.jsdelivr.net/gh/wenxuanjun/CDN@master/files/ocrdata/" + this.ocr.quality,
        workerPath: "https://cdn.jsdelivr.net/npm/tesseract.js@2.1.3/dist/worker.min.js",
        corePath: "https://cdn.jsdelivr.net/npm/tesseract.js-core@v2.2.0/tesseract-core.wasm.js",
        cacheMethod: "none",
        logger: (message) => {
          this.ocr.status = message.status
          this.ocr.progress = message.progress * 100
        }
      })
      (async () => {
        this.ocr.status_show = true
        await worker.load()
        await worker.loadLanguage("eng+chi_sim+chi_sim_vert")
        await worker.initialize("eng+chi_sim+chi_sim_vert")
        const { data: { text } } = await worker.recognize(this.ocr.input);
        this.ocr.result = text
        this.ocr.dialog.result = true
        await worker.terminate()
        this.ocr.status_show = false
      })()
    }
  }
}
</script>
