<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
    <!--2.搜索  -->
    <el-row class="searchRow">
      <el-col :span="24" class="searchArea">
        <el-button type="success" @click="addGoodsCate">添加分类</el-button>
      </el-col>
    </el-row>
    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 级联选择器 -->
        <el-form-item label="分类" label-width="120px">
         {{selectedOptions}}
         <el-cascader
          expand-trigger="hover"
          change-on-select
          clearable
          :options="caslist"
          v-model="selectedOptions"
          :props="defaultProp"
          >
         </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button @click="addCate()" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <el-table height="450px" v- border stripe :data="list" style="width: 100%">
      <el-table-column label="级别">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level===0">一级</span>
          <span v-if="scope.row.cat_level===1">一级</span>
          <span v-if="scope.row.cat_level===2">一级</span>
        </template>
      </el-table-column>

      <el-table-column prop="goods_name" label="是否有效" >
         <template slot-scope="scope">
            <span v-if="scope.row.cat_deleted===false">有效</span>
            <span v-else-if="scope.row.cat_deleted===true">无效</span>
         </template>
      </el-table-column>
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
        
        </template>
      </el-table-column>
    </el-table>
<!-- 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </el-card>
</template>
<script>
//引入element-tree-grid
// var ElTreeGrid=require('element-tree-grid')
export default {
  data() {
    return {
      //是否打开对话框
      dialogFormVisibleAdd: false,
      form: {},
      list: [],
      selectedOptions:[],
      caslist:[],
      defaultProp:{},
      //总页
       total:1,
       pagenum: 1,
      pagesize: 2,
    };
  },
  components:{
    // ElTreeGrid
  },
  methods: {
    //添加分类 显示对话框
    async addGoodsCate() {
      this.dialogFormVisibleAdd = true;
    },
    // 添加分类发送请求
    async addCate() {},
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
  }
};
</script>
<style scoped>
.searchRow {
  margin-top: 20px;
 
}
</style>