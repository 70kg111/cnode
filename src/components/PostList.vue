<template>
  <div class="PostList">
    <!-- 数据未返回时，显示这个正在加载的动图 -->
    <div class="loading" v-if="isLoading">
      <img src="#">
    </div>

    <!-- 代表 主题/帖子 列表 -->
    <div class="posts">
      <ul>
        <!-- 头部文章分类 -->
        <li>
          <div class="toobar">
            <span>全部</span>
            <span>精华</span>
            <span>分享</span>
            <span>问答</span>
            <span>招聘</span>
          </div>
        </li>
        <!-- 显示的单篇文章信息 -->
        <li v-for="post in posts">
          <!-- 头像 -->
          <!-- 需要去动态的绑定class -->
          <img v-bind:src="post.author.avatar_url">

          <!-- 回复量和访问量 -->
          <span class="allcount">
            <span class="reply_count">{{post.reply_count}}</span>
            /{{ post.visit_count}}
          </span>

          <!-- 文章分类 -->
          <!-- 需要去动态绑定class -->
          <span v-bind:class="[{put_good:(post.good == true),put_top:(post.top == true),'topiclist-tab':(post.good != true && post.top != true)}]">
              <span>{{ post | tabFormatter}}</span>
            </span>

          <!-- 标题 -->
          <!-- 因为点击帖子要跳转，所以需要用到路由 -->
          <router-link :to="{ name:'post_content',params:{ id:post.id,name:post.author.loginname }}">
              <span class="title">{{post.title}}</span>
          </router-link>

          <!-- 最终回复时间 -->
          <!-- 但是拿到的是国际时间，所以要写一个过滤器，这个过滤器不止这里要用，所以写到main.js中全局注册 -->
          <span class="last_reply">{{post.last_reply_at | formatDate}}</span>

        </li>

        <!-- pagination组件 -->
        <li>
          <pagination @handleList="renderList"></pagination>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>

import pagination from './Pagination'

export default {
  name: "PostList",
  data: function() {
    return {
      isLoading: false,
      posts: [], //代表页面里的列表数组
      postPage: 1
    };
  },
  //这里定义发送/接受请求的方法
  methods: {
    //es6语法，与 getData:function(){...}一个意思
    getData() {
      //第一个参数是url，第二个参数是内容（这里是page和limit)
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          //get请求一定要写params
          params:{
            page: this.postPage,
            limit: 20
          }
        })
        //请求成功后执行的方法
        .then(res => {
          console.log("获取数据成功");
          console.log(res);
          this.posts = res.data.data;
        })
        //请求失败后执行的方法
        .catch(function(err) {
          console.log("获取数据失败");
          console.log(err);
        });
    },
    renderList(value){
      this.postPage = value
      this.getData()
    }
  },
  //因为要在页面载入前执行，所以要放在 beforeMount 里面
  beforeMount: function() {
    this.getData();
  },
  components:{
    pagination
  }
};
</script>

<style scoped>
.PostList{
    background-color: #e1e1e1;
  }
  .posts {
    margin-top: 10px;
  }

  .PostList img {
    height: 30px;
    width: 30px;
    vertical-align: middle;
  }

  ul {
    list-style: none;
    width: 100%;
    max-width: 1344px;
    margin: 0 auto;
  }

  ul li:not(:first-child) {
    padding: 9px;
    font-size: 15px;
    font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, sans-serif !important;
    font-weight: 400;
    background-color: white;
    color: #333;
    border-top: 1px solid #f0f0f0;
  }

  li:not(:first-child):hover {
    background: #f5f5f5;;
  }

  li:last-child:hover {
    background: white;
  }

  li span {
    line-height: 30px;
  }

  .allcount {
    width: 70px;
    display: inline-block;
    text-align: center;
    font-size: 12px;
  }

  .reply_count {
    color: #9e78c0;
    font-size: 14px;
  }

  .put_good, .put_top {
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin-right: 10px;
  }

  .topiclist-tab {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
    margin-right: 10px;
  }

  .last_reply {
    text-align: right;
    min-width: 50px;
    display: inline-block;
    white-space: nowrap;
    float: right;
    color: #778087;
    font-size: 12px;
  }

  .toobar {
    height: 40px;
    background-color: #f5f5f5;
  }

  .toobar span {
    font-size: 14px;
    color: #80bd01;
    line-height: 40px;
    margin: 0 10px;
    cursor: pointer;
  }

  .toobar span:hover {
    color: #9e78c0;
  }

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    text-decoration: underline;
  }

  .loading {
    text-align: center;
    padding-top: 300px;
  }

</style>
