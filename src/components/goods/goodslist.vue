<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <!-- 搜索框 -->
    <el-row class="searchRow">
      <el-col>
        <el-input
          @clear="loadGoodList"
          clearable
          placeholder="请输入内容"
          v-model="searchValue"
          class="inputSearch"
        >
          <el-button @click="searchGoods" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" @click="$router.push({name:'goodsAdd'})" >添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <!-- 3.表格 -->
    <el-table height="450px" v-border stripe :data="list" style="width: 100%">
      <!-- 序号 -->
      <el-table-column type="index" label="#" width="60"></el-table-column>
     
      <el-table-column prop="goods_name" label="商品名称"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="100"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重置" width="80"></el-table-column>
      <el-table-column label="创建日期" width="120">
        <!-- template 内部要用数据 设置slot-scope 属性
        该属性的值是要用数据create_time的数据源 userlist-->
        <template slot-scope="scope" >
          <!-- slot-scope的userlist其实 el-table绑定的数据userlist
          userlist.row->数组的每个对象-->
          {{scope.row.add_time | fmtdate}}
        </template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            @change="changeMgState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
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
          <!-- check -->
          <!-- <el-button
            @click="showSetUserRoleDia(scope.row)"
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
          ></el-button> -->
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
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      query: "",
      pagenum: 1,
      pagesize: 2,
      //分页数据
      total: 1,
      searchValue:""
    };
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    //获取用户商品信息
    async getGoodsList() {
      let url =
        "/api/goods?query=" +
        this.searchValue +
        "&pagenum=" +
        this.pagenum +
        "&pagesize=" +
        this.pagesize;
      const res = await this.$http.get(url);
      console.log("商品列表")
      console.log(res);
      const {
        meta: { status, msg },
        data: { goods, total }
      } = res.data;
      if (status === 200) {
        // //给表格赋值

        this.list = goods;
        //给total赋值
        this.total = total;
        //提示
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
    },
    // 清空搜索框 重新获取数据
    loadGoodList() {
      this.getGoodsList();
    },
    //搜索
    searchGoods() {
      this.getGoodsList();
    },
    //添加商品
    showAddGoodsDia() {},
    // 分页相关方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      // this.pagenum=1
      this.getGoodsList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getGoodsList();
    }
  }
};
</script>
<style  scoped>
.inputSearch {
  width: 300px;
}
.searchRow {
  margin-top: 25px;
}
</style>