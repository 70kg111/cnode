<template>
  <div class="header">
    <router-link :to="{name:'root'}">
      <img src="https://static2.cnodejs.org/public/images/cnodejs_light.svg" alt srcset>
    </router-link>
    <ul>
      <li>
        <a href="#">首页</a>
      </li>
      <li>
        <a href="#">新手入门</a>
      </li>
      <li>
        <a href="#">API</a>
      </li>
      <li>
        <a href="#">关于</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<!--这里的scoped意思就是只对当前页面有效-->
<style scoped>

*{
  margin: 0;
  padding: 0;
}

.header {
  background: #444;
  height: 50px;
}

img {
  max-width: 120px;
  margin-left: 50px;
  margin-top: 10px;
}

ul {
  list-style: none;
  float: right;
  margin-right: 20px;
  margin-top: 15px;
}

li {
  display: inline-block;
  padding: 0 10px;
}

a {
  text-decoration: none;
  color: #ccc;
}
</style>
