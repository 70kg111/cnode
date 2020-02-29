<template>
  <div class="autherinfo">
    <div class="authersummay">
      <div class="topbar">作者</div>
      <router-link :to="{name:'user_info',params:{ name: userinfo.loginname}}">
        <img v-bind:src="userinfo.avatar_url">
        <!-- 名字 -->
        <span>{{userinfo.author.loginname}}</span>
      </router-link>
    </div>

    <div class="recent_topics">
      <div class="topbar">作者最近主题</div>
      <ul>
        <li v-for="list in topiclimitby5">
          <router-link :to="{name:'post_conent',params:{id:list.id,name:list.author.loginname}}">
            {{list.title}}
          </router-link>
        </li>
      </ul>
    </div>

    <div class="recent_replies">
      <div class="topbar">作者最近回复</div>
    </div>
    <ul>
        <li v-for="list in replylimitby5">
          <router-link :to="{name:'post_conent',params:{id:list.id,name:list.author.loginname}}">
            {{list.title}}
          </router-link>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: "SlideBar",
  data:function(){
      return {
          userinfo:{}
      }
  },
  methods:{
        getData(){
            this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
            .then(res=>{
                this.userinfo = res.data.data
            })
            .catch(function(err){
                console.log(err)
            })
        }
    },
    beforeMount:function(){
      this.getData()
    },
    //因为显示的最近主题与创建主题最多是五条，所以用计算属性过滤一下
    computed:{
      topiclimitby5(){
        if(this.userinfo.recent_topics > 5){
          //slice 就是截取数组0到5的长度
          return this.userinfo.recent_topics.slice(0,5)
        }
      },
      replylimitby5(){
        if(this.userinfo.recent_replies > 5){
          //slice 就是截取数组0到5的长度
          return this.userinfo.recent_replies.slice(0,5)
        }
      }
    }
};
</script>

<style scoped>
.authersummay,
.recent_replies,
.recent_topics {
  background-color: #fff;
}
.autherinfo {
  width: 328px;
  float: right;
  margin-top: 0;
}
li {
  padding: 3px 0;
}
.recent_replies ul,
.recent_topics ul {
  margin-top: 0px;
  margin-bottom: 0px;
  list-style: none;
  padding-left: 14px;
}

ul a {
  font-size: 12px;
  text-decoration: none;
  color: #778087;
}

.topbar {
  padding: 10px;
  background-color: #f6f6f6;
  height: 16px;
  font-size: 12px;
  margin-top: 10px;
}

img {
  height: 48px;
  width: 48px;
  border-radius: 3px;
  margin: 10px;
}

.loginname {
  width: 100px;
  float: right;
  margin-top: 22px;
  margin-right: 159px;
  font-size: 14px;
}

.loginname a {
  text-decoration: none;
  color: #778087;
}

.authersummay .topbar {
  margin-top: 0px;
}
</style>
