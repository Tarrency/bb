<template>
<div>
    <el-container>
        <el-container>
            <el-header>
                <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>知识图谱管理</el-breadcrumb-item>
                <el-breadcrumb-item>知识图谱导入导出</el-breadcrumb-item>
                </el-breadcrumb>
            </el-header>
            <el-main>
                <el-row :span="24">
                    <el-table :data="tableData"  style="width: 100%" >
                        <el-table-column  type="selection"  width="55" lable="序号">
                        </el-table-column>
                        <el-table-column    prop="database"    label="数据库">
                        </el-table-column>
                        <el-table-column    prop="state"    label="数据库状态">
                        </el-table-column> 
                        <el-table-column    prop="action"    label="操作">
                            <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">导入关系</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">导出关系</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </el-row>

                 <el-row>
                    <el-col :span="4" style="float:left;text-align:left">
                        <el-button style="folat:left" type="primary">全选</el-button>
                    </el-col>
                    <el-col :span="12" style="float:right;text-align:right">
                        <el-button style="folat:right" type="primary">新增知识图谱</el-button>
                        <el-button style="folat:right" type="danger" plain>删除</el-button>
                        <el-button style="folat:right" type="primary">导出</el-button>
                    </el-col>
                </el-row>
                
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