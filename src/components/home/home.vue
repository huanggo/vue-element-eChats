<template>
  <el-container class="container">
    <el-header class="Header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img class="logoimg" src="../../assets/logo.png" alt="无法显示图片" />
          </div>
        </el-col>
        <el-col :span="18" class="middle">
          <h3>电商后台管理系统</h3>
        </el-col>
        <el-col :span="2" >
          <div class="grid-content bg-purple">
            <a class="loginout" @click.prevent="handleSingnout" href="#">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!-- 侧边栏导航 -->
        <!--router 开启路由模式 -->
        <el-menu :router="true" :unique-opened="true">
          <el-submenu :index="''+item1.order" v-for="(item1,index) in menus" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="(item2,index) in item1.children" :key="index">
              <i class="el-icon-success"></i>
              <span>{{item2.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      menus: []
    };
  },
  //获取token
  //if token 有-》继续渲染组件
  //token没有-》登录
  beforeCreate() {
    const token = localStorage.getItem("token");
    if (!token) {
      // this.$router.push({name:'Login'})
    }
  },
  created() {
    this.getMenus();
  },
  methods: {
    //获取导航数据
    async getMenus() {
      const res = await this.$http.get("/api/menus");
      console.log(res);
      this.menus=res.data.data
    },
    //退出
    handleSingnout() {
      //清除token
      localStorage.clear();
      //提示
      this.$message.success("退出");
      //登录
      this.$router.push({ name: "Login" });
    }
  }
};
</script>
<style  scoped>
.container {
  height: 100%;
}
.Header {
  background-color: #b3c0d1;
}
.aside {
  background-color: #d3dcd6;
}
.main {
  height: 100%;
  background-color: #e9eef3;
}
/* 头部样式 */
.logoimg {
  height: 50px;
}
.middle {
  text-align: center;
}
.loginout {
  text-decoration: none;
  line-height: 20px;
}
</style>