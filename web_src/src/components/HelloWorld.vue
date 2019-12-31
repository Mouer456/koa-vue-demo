<template>
  <div class="hello">
    <h3>{{ msg }}</h3>
    <div>koa2接口测试：</div>
    <div>{{ dataTest }}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      dataTest: {}
    };
  },
  mounted() {
    this.apiTest();
  },
  methods: {
    apiTest() {
      this.$axios.get('/api/user/userinfo').then(res => {
        console.log(res);
        this.dataTest = res;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
