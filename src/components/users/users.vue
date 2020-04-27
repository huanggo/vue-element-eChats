<template>
  <el-card class="box-card">
    <!--1. 面包屑 -->
    <!-- 首页/用户管理/用户列表 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb> -->
     <my-bread level1="用户管理" level2="用户列表"></my-bread>
    <!--2.搜索  -->
    <el-row class="searchRow">
      <el-col>
        <el-input
          @clear="loadUserList"
          clearable
          placeholder="请输入内容"
          v-model="query"
          class="inputSearch"
        >
          <el-button @click="searchUser" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" @click="showAddUserDia">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 3.表格 -->
    <el-table :data="userlist" style="width: 100%">
      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column prop="username" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="email" label="商品价格(元)"></el-table-column>
      <el-table-column prop="mobile" label="商品重量"></el-table-column>
      <el-table-column label="创建日期">
        <!-- template 内部要用数据 设置slot-scope 属性
        该属性的值是要用数据create_time的数据源 userlist-->
        <template slot-scope="userlist">
          <!-- slot-scope的userlist其实 el-table绑定的数据userlist
          userlist.row->数组的每个对象-->
          {{userlist.row.create_time | fmtdate}}
        </template>
      </el-table-column>
      <!-- <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            @change="changeMgState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column> -->
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button
            @click="showEditUserDia(scope.row)"
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <!-- 删除 -->
          <el-button
            @click="showDeleUserMsgBox(scope.row.id)"
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
          <!-- check -->
          <el-button
            @click="showSetUserRoleDia(scope.row)"
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 4.分页 -->
    <!-- 
      @size-change:显示条数发生变化的时候触发
      @current-change:当前页改变的时候触发
      page-sizes:设置当前页是第几页
      page-size:显示多少条
      total:总共多少条
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 对话框 -->
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密 码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮 箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电 话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button @click="addUser" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input disabled v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮 箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电 话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button @click="editUser()" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">{{currUsername}}</el-form-item>
        <el-form-item label="角色" label-width="100px">
          <el-select v-model="currRoleId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option :label="item.roleName" :value="item.id" v-for="(item,i) in roles" :key="i"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
        <el-button type="primary" @click="setRol()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 2,
      // 表格绑定数据
      userlist: [],
      //分页数据
      total: 1,
      //添加对话框的属性
      dialogFormVisibleAdd: false,
      //编辑用户
      dialogFormVisibleEdit: false,
      //角色
      dialogFormVisibleRol: false,
      //添加用户宽度
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      //当前id
      currUserId: -1,
      //分配角色
      currRoleId: -1,
      //当前用户id
      curruserid:-1,
      currUsername: "",
      //保存所有角色数据
      roles: []
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //设置角色
    
   async setRol() {
      const res = await this.$http.put("/api/users/"+ this.curruserid+"/role",{
        rid:this.currRoleId
      });
      // this.$route.params.userid
      // this.$query.userid
      console.log(res)
     this.dialogFormVisibleRol = false;
    },
    //修改用户角色 打开对话框
    async showSetUserRoleDia(user) {
      this.currUsername = user.username;
      this.curruserid=user.id
      this.dialogFormVisibleRol = true;
      //获取角色
      const res1 = await this.$http.get("/api/roles/");
      this.roles = res1.data.data;
      //获取角色id
      const res = await this.$http.get("/api/users/" + user.id);
      console.log(res);
      this.currRoleId = res.data.data.rid;
      // const res = await this.$http.put(
      //   "/api/users/" + this.currUserId + "/state/" + user.mg_state
      // );
    },

    //修改用户状态
    async changeMgState(user) {
      console.log("修改");
      const res = await this.$http.put(
        "/api/users/" + this.currUserId + "/state/" + user.mg_state
      );
      console.log(res);
    },
    //编辑用户发送请求
    async editUser() {
      const res = await this.$http.put(
        "/api/users/" + this.currUserId,
        this.form
      );
      console.log(res);
      //关闭对话框
      this.dialogFormVisibleEdit = false;
      //更新视图
      this.getUserList();
    },
    //添加用户对话框
    showAddUserDia() {
      this.dialogFormVisibleAdd = true;
      this.form = {};
    },
    // 清空搜索框 重新获取数据
    loadUserList() {
      this.getUserList();
    },
    // 获取用户的列表的请求

    async getUserList() {
      // const AUTH_TOKEN = localStorage.getItem("token");

      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      let url =
        "/api/users?query=" +
        this.query +
        "&pagenum=" +
        this.pagenum +
        "&pagesize=" +
        this.pagesize;

      const res = await this.$http.get(url);
      console.log(res);
      const {
        meta: { status, msg },
        data: { users, total }
      } = res.data;
      if (status === 200) {
        // //给表格赋值

        this.userlist = users;
        //给total赋值
        this.total = total;
        //提示
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
    },
    // 分页相关方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      // this.pagenum=1
      this.getUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getUserList();
    },
    // 搜索用户
    searchUser() {
      //input绑定qiery的值
      this.getUserList();
    },
    //添加用户
    async addUser() {
      //关闭对话框
      this.dialogFormVisibleAdd = false;
      const res = await this.$http.post("/api/users", this.form);
      console.log(res);
      const {
        meta: { status, msg },
        data
      } = res.data;
      if (status === 201) {
        //提示成功
        this.$message.success(msg);

        //更新视图
        this.getUserList();
        //清空文本框
        this.form = {};
      } else {
        this.$message.success(msg);
      }
    },
    //删除用户 打开盒子
    showDeleUserMsgBox(userid) {
      this.$confirm("删除用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let url = "/api/users/" + userid;
          const res = await this.$http.delete(url);
          console.log(res);
          if (res.data.meta.status === 200) {
            //更新视图
            this.getUserList();
            //提示
            this.$message({
              type: "success",
              message: res.data.meta.msg
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑永华
    showEditUserDia(user) {
      this.dialogFormVisibleEdit = true;
      //获取当前id
      this.currUserId = user.id;
      //获取用户
      this.form = user;
    }
  }
};
</script>
<style  scoped>
.box-card {
  height: 100%;
}
.inputSearch {
  width: 300px;
}
.searchRow {
  margin-top: 25px;
}
</style>
