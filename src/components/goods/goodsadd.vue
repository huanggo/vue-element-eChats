<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <!-- 提示 -->
    <el-alert class="alert" title="添加商品信息" type="success" center show-icon></el-alert>
    <!-- 步骤条 -->
    <el-steps :active="1*active" finish-status="success" simple style="margin-top: 20px">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 最外层 from -->
    <el-form
      label-position="top"
      label-width="80px"
      :model="form"
      style="height: 300px;overflow:auto;"
    >
      <el-tabs @tab-click="tabChange()" v-model="active" tab-position="left">
        <el-tab-pane name="1" label="基本信息">
          <!-- 基本信息 -->
          <el-form-item label="商品名称:">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格:">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量:">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量:">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <!-- 商品的分类 -->
          <el-form-item>
            <el-cascader
              clearable
              v-model="selectedOptions"
              :options="options"
              :props="defaultProp"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数">
          <!-- 显示的是该三级分类的商品参数 -->
          <el-form-item v-for="(item1,i) in arrDyparams" :key="i" :label="item1.attr_name">
            <!-- 复选框 -->
            <el-checkbox-group v-model="item1.attr_vals">
              <el-checkbox border="" v-for="(item2,i) in item1.attr_vals" :key="i" :label="item2"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">角色管理</el-tab-pane>
        <el-tab-pane name="4" label="商品图片">角色管理</el-tab-pane>
        <el-tab-pane name="5" label="商品内容">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      active: "1",
      //添加商品的表单数据
      form: {
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: "",
        attrs: ""
      },
      //   级联选择器
      options: [],
      selectedOptions: [],
      defaultProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      //动态参数的数据数组
      arrDyparams: [],
      //复选框
      checkList: []
    };
  },
  created() {
    this.getGoodCate();
  },
  methods: {
    // 点击不同的tabs
    async tabChange() {
      //如果点击的是第二tab 同时 三级分类 要有值
      if (this.active === "2") {
        if (this.selectedOptions.length !== 3) {
          //提示
          this.$message.warning("请选择商品的三级分类");
          return;
        }
        //获取数据
        //id->分类id
        const res = await this.$http.get(
          "/api/categories/" + this.selectedOptions[2] + "/attributes?sel=many"
        );
        console.log("kkk");
        console.log(res);
        this.arrDyparams = res.data.data;
        // attr_vals
        this.arrDyparams.forEach(item2 => {
          if (item2.attr_vals.length !== 0) {
            item2.attr_vals = item2.attr_vals.trim().split(",");
          }
        
        });
        //arrDyparams每个对象attr_vals 字符串-》数组->v-for
        // this.arrDyparams.forEach(item => {
        //   if (item.attr.vals.length !== 0) {
        //     // console.log(item.attr.vals);
        //     // item.attr.vals = item.attr.vals.trim().split(',');
        //   }
        // });
        console.log();
      }else if(this.active === "3"){
        
      }
    },
    //   级联选择器选中 出发的方法
    handleChange() {},
    //获取三级分类信息
    async getGoodCate() {
      const res = await this.$http.get("/api/categories?type=3");
      this.options = res.data.data;
    }
  }
};
</script>
<style  scoped>
.alert {
  margin-top: 20px;
}
</style>