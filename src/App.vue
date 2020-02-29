<template>
  <div id="app">
    <Header></Header>
    <div class="main">

      <router-view name="slidebar"></router-view>
      <!-- 这里的main就对应 index.js 中的 main ，进入首页后会自动找到名字为main的路由 -->
      <router-view name="main"></router-view>
      
    </div>
  </div>
</template>

<script>

//把Header组件先引入进来
import Header from "./components/Header";
import PostList from './components/PostList'

export default {
  name: "App",
  //放在这里
  components: {
    Header,
    PostList
  }
}
</script>

<style scoped>

main{
  width: 80%;
  margin: 0 auto;
}

</style>
