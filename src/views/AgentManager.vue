<template>
<div id="submit" class="box">
  <el-container>
        <el-header>
            <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>Agent管理</el-breadcrumb-item>
            <el-breadcrumb-item>Agent状态</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main style="line-height:80px">
            <!-- 主要内容区 -->
            <div >
            <el-row >
                <el-input placeholder="请输入agent名称在此搜索" v-model="input1" >
                    <el-button slot="prepend" >Agent</el-button>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>   
                </el-row> 
            <el-row >
                <el-col :span="8" style="float:left;text-align:left">
                    <el-radio-group  v-model="radio1">
                    <el-radio-button label="上海"></el-radio-button>
                    <el-radio-button label="北京"></el-radio-button>
                    <el-radio-button label="广州"></el-radio-button>
                    </el-radio-group>
                </el-col>
                <el-col :span="3" style="float:right"><!-- 新增agent -->
                    <el-button  type="primary" @click="newAgent = true" > 新增Agent</el-button> 
                      <el-dialog title="新增Agent" :visible.sync="newAgent" class="dialog-body">
                      <el-form model="newInfo" label-position="right" label-width="100px" >
                        <el-form-item label="名称:" placeholder="请输入agent名称" >
                          <el-input v-model="newInfo.name" style="width:50%"></el-input>
                        </el-form-item>
                        <el-form-item label="QA知识库:" >
                          <el-select v-model="value" placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="多轮对话场景:" >
                          
                          <el-select v-model="value" placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="词表:" >
                          <el-select v-model="value" placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="newAgent = false">取 消</el-button>
                        <el-button type="primary" @click="newAgent = false">确 定</el-button>
                      </div>
                    </el-dialog>
                </el-col>
            </el-row>

            <!-- 挂载表格 -->
            <el-row>
              <el-table :data="tableData" style="border:solid darkgray 1px;">
                  <el-table-column
                      prop="mount"
                      label="挂载内容"
                      width="500">
                  </el-table-column>
                  <el-table-column
                        prop="type"
                        label="类别"
                        width="280">
                  </el-table-column>
              </el-table>
              </el-row>
              <el-row style="float:right">
                <el-button type="primary" >修改</el-button>
                <el-button type="primary" >测试</el-button>
                <el-button type="primary" @click="deleteAgent = true">删除</el-button>
                <el-dialog
                  :visible.sync="deleteAgent"
                  :before-close="handleClose">
                  <span>您确认要删除agent吗？</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteAgent = false">取 消</el-button>
                    <el-button type="primary" @click="deleteAgent = false">确 定</el-button>
                  </span>
                </el-dialog>
              </el-row>

            <!-- </div> -->
            </div>
    
        </el-main>
    </el-container>
</div>
</template>

<script>
  export default {
    data() {
      return {
        deleteAgent: false ,
        newAgent:false,
        newInfo:{
          name:'',
          qaid:{0:''},
          sceneid:{0:''},
          vocabularyid:{0:''}
        }
      }
      ;
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
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

</style>
