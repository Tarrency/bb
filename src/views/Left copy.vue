<template>
<div style="height:100%">
<el-row  style="height:100%">
 <el-col style="height:100%">
    <el-menu
      default-active="$route.path"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#ffd04b"
      @open="handleOpen"
      @close="handleClose"
      style="height:100%;text-align: left;"     
      >
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
         <template slot="title">
          <i class="el-icon-edit"></i>
          <span>QA知识管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">知识浏览/编辑/导入/导出</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-coin"></i>
          <span>知识图谱</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">知识图谱导入/导出</el-menu-item>
          <el-menu-item index="3-2">知识图谱浏览/编辑</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

       <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>词表管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/DashBoard">专有词表</el-menu-item>
          <el-menu-item index="4-2">敏感词表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
       <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-key"></i>
          <span>Agent管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">Agent状态</el-menu-item>
          <el-menu-item index="5-2">测试</el-menu-item>
        </el-menu-item-group>
      </el-submenu>    
      
    <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-data-line"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="6-1">对话统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>  
    
    <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-data-line"></i>
          <span>爬虫管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="7-1">爬虫列表</el-menu-item>
          <el-menu-item index="7-2">新建爬虫</el-menu-item>
        </el-menu-item-group>
      </el-submenu>


    </el-menu>
  </el-col>
</el-row>
</div>
</template>


<script>
export default {
   
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>

.left{
    border-right:0px;
    text-align:right;
    background: #001529;
    width: 5cm;
    background-color:#001529;
}
</style>