<template>
<div>
    <el-container>
    
        <el-container>
            <el-header>
                <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>词表管理</el-breadcrumb-item>
                <el-breadcrumb-item>专有词表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-header>
            <el-main style="line-height:80px">
                <!-- 主要内容区 -->
                <div >
                <el-row>                    
                    <el-col :span="8" style="float:left;text-align:left">
                        <el-radio-group  v-model="radio1">
                        <el-radio-button label="上海"></el-radio-button>
                        <el-radio-button label="北京"></el-radio-button>
                        <el-radio-button label="广州"></el-radio-button>
                        </el-radio-group>
                    </el-col>
                    <el-col :span="8" style="float:right;text-align:right">
                        <el-button type="primary">新增词表</el-button>
                        <el-button>删除词表</el-button>
                    </el-col>
                </el-row>
                <el-row  style="float:right;">
                    <el-col :span="16">
                        <el-input placeholder="请输入关键词在此搜索" v-model="input1" size="small" >                            
                        <el-button slot="prepend" >关键词</el-button>
                        </el-input>  
                    </el-col> 
                    <el-col :span="8">
                        <el-button type="primary" size="small">查询</el-button>
                        <el-button  size="small">删除</el-button>
                    </el-col>
                </el-row> 
                <el-row>
                    <el-table :data="tableData"  style="width: 100%" >
                        <el-table-column  type="selection"  width="55">
                        </el-table-column>
                        <el-table-column    prop="id"    label="id">
                        </el-table-column>
                        <el-table-column    prop="word"    label="词汇">
                        </el-table-column> 
                        <el-table-column    prop="updatetime"    label="更新时间">
                        </el-table-column> 
                        <el-table-column    prop="action"    label="操作">
                            <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </el-row>

                <el-row>
                    <el-col :span="4" style="float:left;text-align:left">
                        <el-button style="folat:left" type="primary">全选</el-button>
                    </el-col>
                    <el-col :span="12" style="float:right;text-align:right">
                        <el-button style="folat:right" type="primary">新增</el-button>
                        <el-button style="folat:right" type="danger" plain>删除</el-button>
                        <el-button style="folat:right" type="primary">导入</el-button>
                        <el-button style="folat:right" type="primary">导出</el-button>
                    </el-col>
                </el-row>
                </div>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.el-header{
  text-align: right; 
  font-size: 18px;
  padding: 20px
}
.el-main{
  border:solid darkgray 1px;
}
</style scoped>