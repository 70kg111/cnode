import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article'
import PostList from '../components/PostList'
import UserInfo from '../components/UserInfo'
import SlideBar from '../components/SlideBar'

Vue.use(Router)

export default new Router({
  routes: [
    //这里先定义一个根组件，就是刚打开就显示的页面，首页
    {
      name:'root',
      path:'/',
      components:{
        main:PostList
      }
    },
    {
      //路由的名称，用在Article上的路由，点击显示的内容页
      name:'post_content',
      //这个id是用PostList组件中点击帖子标题后传递过来的对应的post.id
      path:'/topic/:id&author=:name',
      components:{
        main:Article,
        slidebar:SlideBar
      }
    },
    {
      //点击人物头像显示的个人主页
      name:'user_info',
      path:'/userinfo/:name',
      components:{
        main:UserInfo,
      }
    }
  ]
})
