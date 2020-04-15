<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <!-- 添加按钮 -->
    <el-row class="addrolebtn">
      <el-col>
        <el-button type="info">信息按钮</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="rolelist" style="width: 100%">
      <el-table-column type="expand" width="150">
        <template slot-scope="scope">
          <el-row v-for="(item1,i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag
                @close="deleRight(scope.row,item1.id)"
                closable
                type="success"
              >{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>

            <el-col :span="20">
              <el-row v-for="(item2,i) in item1.children" :key="i">
                <el-col :span="4">
                  <el-tag
                    @close="deleRight(scope.row,item2.id)"
                    closable
                    type="info"
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>

                <el-col :span="20">
                  <el-tag
                    @close="deleRight(scope.row,item3.id)"
                    closable
                    type="warning"
                    v-for="(item3,i) in item1.children"
                    :key="i"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- 无权限提示 -->
          <span v-if="scope.row.children.lenght===0">未分配权限</span>
        </template>
      </el-table-column>

      <el-table-column type="index" label="#" width="150"></el-table-column>

      <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>

      <el-table-column prop="roleDesc" label="角色描述" width="200"></el-table-column>

      <!-- <el-table-column prop="mobile" label="操作"></el-table-column> -->

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
            @click="showSetRightDia(scope.row)"
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改权限对话框 -->
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
      <!-- 树形结构 -->
      <!-- 
        data：数据源 []
        show-checkbox:选择框
        node-key:每个节点的唯一标识 通常的data数据源的key名id
        default-expanded-keys:默认展开[要展开的节点的id]
        default-checked-keys:[要选择的节点id]
        props:配置项 {label,chilren}
        label 节点的文字标题和children节点的子节点
        值都来源于data绑定的数据中的该数据的key名'label' 'children'
         :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
      -->
      <el-tree
      ref="tree"
        :data="treelist"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        default-expand-all
        :default-checked-keys="arrcheck"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRight">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      rolelist: [],
      //修改权限
      dialogFormVisibleRight: false,
      //树状结构数据
      treelist: [],
      defaultProps: {
        label: "authName",
        children: "children"
      },
      arrexpand: [],
      arrcheck: [],
      currRoleId:-1
    };
  },
  created() {
    this.getRolelist();
  },
  methods: {
    //确定
    async setRoleRight() {
      //获取全选的id的数组
       let arr1= this.$refs.tree.getCheckedKeys()
      //获取半选的id的数据
      let arr2=this.$refs.tree.getHalfCheckedKeys()
      let arr=[...arr1,...arr2]
      const res = await this.$http.post("/api/roles/"+this.currRoleId+"/rights",{rids:arr.join(',')});
      console.log(res);
      this.getRolelist();
      //关闭对话框
      this.dialogFormVisibleRight = false;
    },
    //修改/分配 权限-打开对话框
    async showSetRightDia(role) {
      //给currRoleid赋值
      this.currRoleId=role.id
      //权限id
      let arrtemp2 = [];
      role.children.forEach(item1 => {
        // arrtemp2.push(item1.id);
        item1.children.forEach(item2 => {
          // arrtemp2.push(item2.id);
          item2.children.forEach(item3 => {
            arrtemp2.push(item3.id);
          });
        });
      });

      this.arrcheck = arrtemp2;
      console.log(this.arrcheck);
      //获取树形结构的权限数据
      const res = await this.$http.get("/api/rights/tree");
      console.log(res);
      this.treelist = res.data.data;
      // var arrtemp1 = [];
      // this.treelist.forEach(item1 => {
      //   arrtemp1.push(item1.id);
      //   item1.children.forEach(item2 => {
      //     arrtemp1.push(item2.id);
      //     item2.children.forEach(item3 => {
      //       arrtemp1.push(item3.id);
      //     });
      //   });
      // });
      // this.arrexpand=arrtemp1
      this.dialogFormVisibleRight = true;
    },
    //取消权限
    async deleRight(role, rightid) {
      const res = await this.$http.delete(
        "/api/roles/" + role.id + "/rights/" + rightid
      );
     
      role.children = res.data.data;
      //  this.getRolelist()
    },
    async getRolelist() {
      // 发送token

      const res = await this.$http.get("/api/roles");
     
      this.rolelist = res.data.data;
    }
  }
};
</script>
<style>
.addrolebtn {
  margin-top: 20px;
}
</style>