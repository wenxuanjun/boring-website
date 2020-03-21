<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4">
        <v-btn block href="http://demo.wendster.com">点击以访问Demo站点</v-btn>
        <v-card style="margin-top:20px">
          <v-card-title>琐言碎语</v-card-title>
          <v-card-text>
            <p>我又双叒叕回来啦！</p>
            <p>注：DEMO站点包含最新特性与错误修复。</p>
          </v-card-text>
        </v-card>
        <v-card style="margin-top:20px">
          <v-card-title>Rating</v-card-title>
          <v-card-text>
            <v-slide-group multiple show-arrows>
              <v-slide-item
                v-for="slide in slide_list"
                :key="slide"
                v-slot:default="{ active, toggle }"
              >
                <v-btn
                  class="mx-2"
                  :input-value="active"
                  active-class="primary"
                  rounded
                  @click="toggle"
                >{{ slide }}</v-btn>
              </v-slide-item>
            </v-slide-group>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card>
          <v-card-title>Something to Play</v-card-title>
          <v-card-text>
            <v-time-picker full-width scrollable color="grey"></v-time-picker>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card>
          <v-card-title>最新动态</v-card-title>
          <v-divider></v-divider>
          <v-list two-line>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>[新增] 莫名多出来的页底</v-list-item-title>
                <v-list-item-subtitle>听说若不在页底添加备案号会被罚款</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>[新增] 图片转文字</v-list-item-title>
                <v-list-item-subtitle>纯本地处理，超低识别率，值得你拥有</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>[新增] 回滚悬浮按钮</v-list-item-title>
                <v-list-item-subtitle>支持回滚的Malageed简直如德芙一般丝滑</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>[修复] 标点半／全角不一致</v-list-item-title>
                <v-list-item-subtitle>统一格式至少能让枯燥的Malageed美观一点</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      slide_list: ["Dijkstra", "KMP", "Slay One", "BMT", "Splay"]
    };
  }
};
</script>