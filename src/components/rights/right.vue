<template>
  <el-card>
    <!-- 面包屑 -->
    <!-- 首页/用户管理/用户列表 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>-->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>

    <!-- 表格 -->
    <el-table class="tab" height="400px" :data="rightlist" border style="width: 100%">
      <el-table-column type="index" label="#" width="100"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>

      <el-table-column prop="level" label="层级">
        <template slot-scope="scope">
           <span v-if="scope.row.level==='0'">一级</span>
           <span v-if="scope.row.level==='1'">二级</span>
           <span v-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      rightlist: []
    };
  },
  created() {
    this.getRightlist();
  },
  methods: {
    async getRightlist() {
      // 发送token

      const res = await this.$http.get("/api/rights/list");
      console.log(res);
      this.rightlist = res.data.data;
    }
  }
};
</script>
<style>
.tab{
    margin-top:20px;
}
</style>