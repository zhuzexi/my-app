import router from "../router";

router.beforeEach((to, from, next) => {
  if (to.path == "/my") {
    //如果路由是my ，则进行开始判断用户登录没有
    if (localStorage.getItem("msg")) {
      console.log("我的")
      next()  // 放行
    } else {
      // router.push({path:"/my/login"})
      next("/my/login"); //否则跳转到登录页面
    }
  } else {//除了/my 其他都放行
    next();
  }
})
