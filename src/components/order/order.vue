<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread level1="订单管理" level2="订单列表"></my-bread>
    <!-- 3.表格 -->
    <el-table height="450px" :data="list" style="width: 100%">
      <el-table-column type="index" label="#" width="40"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="order_price" label="订单价格"></el-table-column>
      <el-table-column prop="order_pay" label="是否付款" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.order_pay==='0'">已付款</el-tag>
          <el-tag v-if="scope.row.order_pay==='1'" type="danger">未付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="100"></el-table-column>
      <el-table-column label="下单时间" width="90">
        <template slot-scope="scope">{{scope.row.create_time | fmtdate}}</template>
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
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹框 -->
    <el-dialog title="修改订单地址" :visible.sync="dialogFormVisibleOrder">
      <el-form :model="form">
        <el-form-item label="省市区" label-width="120px">
          <el-cascader
          expand-trigger="hover"
          clearable
          :options="catlist"
          v-model="selectedOptions"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" label-width="120px">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleOrder = false">取 消</el-button>
        <el-button type="primary" @click="setRol()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
import catlist from "@/assets/city_data2017_element.js";
export default {
  data() {
    return {
      list: [],
      dialogFormVisible: false,
      form: {
        address: "成都"
      },
      catlist: [],
      selectedOptions: [],
      dialogFormVisibleOrder:false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$http.get("/api/orders?pagenum=1&pagesize=10");
      this.list = res.data.data.goods;
    },
    showEditUserDia(user) {
      this.catlist=catlist;
      console.log("ddd",catlist.childer)
      this.dialogFormVisibleOrder=true;
    }
  }
};
</script>
<style  scoped>
</style>