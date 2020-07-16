<template>
  <div id="app">
    <div v-if="$route.meta.keepAlive">

    <el-container >
        <el-aside>
          <left></left><!-- 侧边栏 -->
        </el-aside>
        <el-container>
            <el-header class="header"><!-- 顶部 -->
            <el-row>
              <el-col :span="1" >
                <i class="el-icon-s-fold"></i>
                <el-button type="text" style="color:black;height:50px;"></el-button>
              </el-col>
              <el-col  :span="4" :offset="16">
                <i class="el-icon-s-tools"></i>
                <el-button @click="routerTo('/userinfo')"
                type="text" style="color:black;height:50px;">用户信息</el-button>
              </el-col>
            </el-row>
            </el-header>
            <el-main><!-- 主内容区 -->
            
   
　　　　　　<router-view/>

            </el-main>
        </el-container>
    </el-container>

             
        </div>
     <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import leftmenu from './views/Left.vue';

export default {
  components: {
     left: leftmenu
   },
   methods: {
    routerTo (val) {
      this.$router.push({path: val})
    }
  }

}

</script>
<style>
.header{
  height:50px;
  border-bottom:2px solid silver;
  background-color:#fff;
  text-align:right;
}
.el-main {
  background-color:#fff;

}
</style>
