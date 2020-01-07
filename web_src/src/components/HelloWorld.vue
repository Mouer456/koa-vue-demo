<template>
  <div class="hello">
    <van-tabs v-model="active" scrollspy sticky>
      <van-tab title="标签 1">
        <p>标签 1：</p>
        <p />
        {{ msg }}
      </van-tab>
      <van-tab title="标签 2">
        <p>标签 2：</p>
        <div>koa2接口测试：</div>
        {{ koaData }}
      </van-tab>
      <van-tab title="标签 3">
        <p>标签 3：Calendar组件</p>
        <van-cell title="日期" :value="date" @click="show = true" is-link />
        <van-calendar v-model="show" @confirm="onConfirm" />
      </van-tab>
      <van-tab title="标签 4">
        <p>标签 4：</p>
        内容 4
      </van-tab>
      <van-tab title="标签 5">
        <p>标签 5：</p>
        内容 5
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue';
import { Tab, Tabs, Cell, Calendar } from 'vant';

Vue.use(Tab)
  .use(Tabs)
  .use(Cell)
  .use(Calendar);

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      active: 0,
      koaData: {},
      date: '',
      show: false
    };
  },
  mounted() {
    this.apiTest();
  },
  methods: {
    apiTest() {
      this.$axios.get('/api/user/userAllInfo_sqlite').then(res => {
        // console.log(res);
        this.koaData = res;
      });
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;

      this.date = this.formatDate(date);
      console.log(this.date);
      console.log(date);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
