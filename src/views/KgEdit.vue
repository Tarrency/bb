<template>
  <div>
    <el-container>
      <el-header>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>知识图谱管理</el-breadcrumb-item>
          <el-breadcrumb-item>知识图谱浏览编辑</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main style="line-height:80px">
        <div>
          <el-row>
            <el-col :span="9">
              <el-input size="small" placeholder="请输入内容" v-model="input1">
                <template slot="prepend">按节点查询</template>
              </el-input>
            </el-col>
            <el-col :span="9">
              <el-select size="small" v-model="value" placeholder="请选择数据库">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" size="small" @click="testinput">查询</el-button>
              <el-button size="small"  @click="reset">取消</el-button>
            </el-col>
          </el-row>
          <el-row>
            <!-- 单词表格 -->
            <el-col :span="8">
              <el-row size="small" style="line-height:20px" >节点列表</el-row>
              <el-row>
                <el-table
                  :data="NodeList"
                  @selection-change="handleSelectionChange"
                  size="small"
                >
                  <el-table-column type="selection" width="55" label="全选"></el-table-column>
                  <el-table-column prop="id" label="id"></el-table-column>
                  <el-table-column prop="type" label="类型"></el-table-column>
                  <el-table-column prop="name" label="名称"></el-table-column>
                </el-table>
              </el-row>
              <el-row style="float:left">
                <el-button type="primary" size="small" @click="detail">查看详情</el-button>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row size="small" style="line-height:20px">节点类型</el-row>
              <el-row>
                <el-table :data="NodeType" size="small" >
                  <el-table-column prop="property" label="属性"></el-table-column>
                  <el-table-column prop="content" label="内容"></el-table-column>
                </el-table>
              </el-row>
              <el-row>
                <el-col style="float:right;margin:16px 0;" text-align="right">
                  <el-button type="primary" size="small" @click="clear">清空</el-button>
                  <el-button type="primary" size="small" @click="rebuild">新建</el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row size="small" style="line-height:20px">关联节点</el-row>
              <el-row>
                <el-table
                  :data="relatives"
                  size="small"
                >
                  <el-table-column prop="relation" label="关系"></el-table-column>
                  <el-table-column prop="id" label="id"></el-table-column>
                  <el-table-column prop="name" label="名称"></el-table-column>
                </el-table>
              </el-row>
              <el-row>
                <el-col style="float:right">
                  <el-button type="primary" size="small" @click="modify">修改</el-button>
                  <el-button type="primary" size="small" @click="remove">删除</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
    data(){
        return {
            options:[],
            NodeList: [],
            NodeType: [],
            relatives: [],
        }
    },
    methods:{

    }
}
</script>
<style scoped>
.el-header {
  text-align: right;
  font-size: 18px;
  padding: 20px;
}
.el-main {
  border: solid darkgray 1px;
}

.dialog {
  width: 50%;
  text-align: center;
  float: center;
}
</style scoped>