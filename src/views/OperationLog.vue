<template>
    <div class="dialoguestatistics">
        <div class="panel">
            
            <el-row>
                <el-col :span="18">
                    <el-breadcrumb separator="/" >
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item><a href="/">系统设置</a></el-breadcrumb-item>
                        <el-breadcrumb-item><a href="/">系统日志</a></el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>                
                <el-col :span="6" >
                    <el-button @click="routerTo('/dashboard')" type="text">返回主页</el-button>
                </el-col>
            </el-row>

            <el-table :data="tableData" stripe border height="550" style="width:100%;" v-loading="loading" element-loading-text="正在拼命加载中" :eader-row-style="{'background':'#efefef'}">
                <el-table-column label="操作类型" width="180">
                    <template slot-scope="scope">
                        <div>用户登录</div>
                    </template>
                </el-table-column>
                <el-table-column label="日志信息">
                    <template slot-scope="scope">
                        <div>文件[/www/wwwroot/yuhaowei.com/webcarry/appstore/hayday/views.py]保存成功!'</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作日期">
                    <template slot-scope="scope">
                        <div>2020-04-07 23:06:29</div>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" icon="el-icon"  @click="updateinfo" style="margin-top: 50px">导出日志文件</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                    operatype:'用户登录',
                    operainfo: '文件[/www/wwwroot/yuhaowei.com/webcarry/appstore/hayday/views.py]保存成功!',
                    datetime: '2020-04-07 23:06:29'
                }]
            }
        },
        methods: {
                routerTo (val) {
                this.$router.push({path: val})
                }
        }
    }
</script>

<style scoped>
.el-row{
  text-align: center;
  vertical-align: top;
}
</style>