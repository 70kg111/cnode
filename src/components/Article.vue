<template>
  <div class="article">
    <!-- 头部（标题 + 作者） -->
    <div class="topic_header">
      <div class="topic_title">{{post.title}}</div>
      <ul>
        <li>发布于 {{ post.create_at | formatDate }}</li>
        <li>| 作者 {{ post.author.loginname }}</li>
        <li>| {{ post.visit_count }} 次浏览</li>
        <li>| 来自 {{ post | tabFormatter }}</li>
      </ul>

      <!-- 文本内容 -->
      <div v-html="post.content" class="topic_content"></div>
    </div>

    <!-- 回复页面 -->
    <div id="reply">
      <div class="topbar">回复</div>
      <!-- 回复的具体内容 -->
      <div v-for="(reply,index) in post.replies" class="replySec">
        <div class="replyUp">
          <!-- 头像 -->
          <!-- 名字和头像是可以点击后到个人页面的，所有就加上路由 -->
          <router-link :to="{name:'user_info',params:{ name: reply.author.loginname}}">
            <img v-bind:src="reply.author.avatar_url">
          <!-- 名字 -->
            <span>{{reply.author.loginname}}</span>
          </router-link>
          <!-- 楼层 -->
          <span>{{index + 1}}楼</span>
        </div>
        <p v-html="reply.content"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  data(){
    return {
      post: {} //代表当前文章页的所有内容。所有属性
    };
  },
  //获取数据
  methods: {
    getArticleData() {
      this.$http
        .get("https://cnodejs.org/api/v1/topic/" + this.$route.params.id)
        .then(res => {
          if (res.data.success == true) {
            this.post = res.data.data;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  //仍然是在页面加载前将数据显示出来
  beforeMount() {
    this.getArticleData();
  },
  //监听路由的变化，实现slideBar组件中链接的跳转
  watch:{
    '$route'(to,from){
      this.getArticleData()
    }
  }
};
</script>

<style>
@import url("../assets/github-markdown.css");


.topbar {
  padding: 10px;
  background-color: #f6f6f6;
  height: 16px;
  font-size: 12px;
  margin-top: 10px;
}
.article:not(:first-child) {
  margin-right: 340px;
  margin-top: 15px;
}
#reply,
.topic_header {
  background-color: #fff;
}
#reply {
  margin-top: 15px;
}
#reply img {
  width: 30px;
  height: 30px;
  position: relative;
  bottom: -9px;
}
#reply a,
#reply span {
  font-size: 13px;
  color: #666;
  text-decoration: none;
}
.replySec {
  border-bottom: 1px solid #e5e5e5;
  padding: 0 10px;
}
.loading {
  text-align: center;
  padding-top: 300px;
}
.replyUp a:nth-of-type(2) {
  margin-left: 0px;
  display: inline-block;
}
.topic_header {
  padding: 10px;
}
.topic_title {
  font-size: 20px;
  font-weight: bold;
  padding-top: 8px;
}
.topic_header ul {
  list-style: none;
  padding: 0px 0px;
  margin: 6px 0px;
}
.topic_header li {
  display: inline-block;
  font-size: 12px;
  color: #838383;
}
.topic_content {
  border-top: 1px solid #e5e5e5;
  padding: 0 10px;
}
.markdown-text img {
  width: 92% !important;
}
</style>
