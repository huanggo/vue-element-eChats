<template>
     <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    //props 字符串数组
    //props 中的值的用法与data数据中一样
    //props 中的数据值 来源使用组件 传的值

    //props 中的数据也是该组件的属性
    props:['level1','level2']
}
</script>
<style>

</style>