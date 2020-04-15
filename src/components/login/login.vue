<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      :label-position="labelPosition"
      label-width="80px"
      :model="formdata"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handLogin" class="login-btn" type="primary">登录</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 控制对齐方式
      labelPosition: 'top',
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 登录请求
    // 找到一部操作有结果的代码 await  同时接口异步操作的结果res
    // 找到距离异步操作有结果的代码最近的方法 前面加async
  async  handLogin () {
      console.log(this.formdata)
      const res = await this.$http.post("/api/login", this.formdata);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        //保存token值
        localStorage.setItem('token',data.token);
        this.$router.push({ name: "Home"});
        //     //提示成功
        this.$message.success(msg);
      } else {
        //  不成功提示
        this.$message.warning(msg);
      }
      // this.$http
      //   .post('/api/login', {
      //     username: this.formdata.username,
      //     password: this.formdata.password
      //   })
      //   .then(res => {
      //     console.log('登录成功')
      //     console.log(res)
      //     const {
      //       // eslint-disable-next-line no-unused-vars
      //       data,
      //       meta: { msg, status }
      //     } = res.data
      //     if (status === 200) {
      //       this.$router.push({ name: 'Home' })
      //       // 提示成功
      //       this.$message.success(msg)
      //     } else {
      //       // 不成功提示
      //       this.$message.warning(msg)
      //     }
      //   })
    }
  }
}
</script>
<style scoped>
.login-wrap {
  height: 100%;
  background-color: #324152;
  /* 弹性盒子布局 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
}
.login-btn {
  width: 100%;
}
</style>
