<template>
  <div>
    <el-container>
      <el-container>
        <el-header>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>知识图谱管理</el-breadcrumb-item>
            <el-breadcrumb-item>知识图谱导入导出</el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <el-main style="line-height:80px">
          <!-- 主要内容区 -->
          <div>
            <el-row :span="24">
              <!--数据库表格 -->
              <el-table :data="KgTable" ref="refKgTable" style="width:100%">
                <el-table-column type="selection" width="55" label="全选"></el-table-column>
                <el-table-column prop="id" label="序号"></el-table-column>
                <el-table-column prop="database" label="数据库">
                  <template slot-scope="scope">
                    <span v-if="!scope.row.edit">{{scope.row.database}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="state" label="数据库状态">
                  <template slot-scope="scope">
                    <span v-if="!scope.row.edit">{{scope.row.state}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="action" label="操作">
                  <template slot-scope="scope">
                    <div class="demo-front">
                      <el-upload action>
                        <el-button size="mini" @click="importRelation(scope.$index, scope.row)">导入关系</el-button>
                      </el-upload>
                    </div>
                    <div class="demo-front">
                      <el-upload action>
                        <el-button size="mini" @click="importEntity(scope.$index, scope.row)">导入实体</el-button>
                      </el-upload>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row>
              <el-col :span="4" style="float:left;text-align:left">
                <el-button type="primary" @click="selectAll(KgTable)">{{selectAllBtn}}</el-button>
              </el-col>
              <el-col :span="12" style="float:right;text-align:right">
                <el-button type="primary" @click="addKgBtn()">新增知识图谱</el-button>
                <el-button type="danger" plain @click="deleteKgBtn()">删除</el-button>
                <el-button type="primary" @click="getExcel(KgTable)">导出</el-button>
              </el-col>
            </el-row>
          </div>
          <!-- 弹出窗口 -->
          <!--新增知识图谱按钮-->
          <el-dialog title="新增知识图谱" :visible.sync="VisibleAddKg" class="dialog">
            <el-form :model="inputKg">
              <el-form-item label="新增数据库名称:">
                <!-- <el-col :span="24" v-for="(word,index) in inputNewWords" :key="index">
                <el-row :gutter="20" class="margins">-->
                <el-col :span="24">
                  <el-input v-model="inputKg.inputBase" autocomplete="off"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="新增数据库状态:">
                <el-col :span="24">
                  <el-input v-model="inputKg.inputState" autocomplete="off"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addKg">确定</el-button>
                <el-button @click="VisibleAddKg = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
          <!--删除按钮-->
          <el-dialog title="删除数据库" :visible.sync="VisibleDelKg" style="width:50%;text-align:center">
            删除不可恢复，您确定要删除数据库{{ShowKgSeleted}}
            <el-button type="primary" @click="deleteKg">确定</el-button>
            <el-button @click="VisibleDelKg = false">取消</el-button>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Excel2Import from "../excel/Excel2Import";
let moment = require("moment");
export default {
  data() {
    return {
      KgTable: [], //数据库列表
      VisibleNewDialog: false,
      VisibleDelDialog: false,
      VisibleAddKg: false,
      //================
      inputKg: {
        inputBase: "",
        inputState: ""
      },
      VisibleDelKg: false,
      RowSeleted: [], //当前选中行
      IdSeleted: [], //当前选中id集合
      ShowKgSeleted: [], //当前选中单词集合
      ShowStateSelected: [],
      selectAllBtn: "全选",
    };
  },
  mounted() {
    //钩子函数
    this.getKgInfo();
  },
  methods: {
    //获取知识图谱列表
    getKgInfo() {
      this.axios
        .get("/bbb", {
          params: {
            id: this.vocabularyid,
            key: this.searchText
          }
        })
        .then(resp => {
          this.KgTable = resp.data.data;
          this.KgTable.edit = false;
        })
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });
    },

    //新增数据库
    addKgBtn() {
      this.VisibleAddKg = true;
    },
    addKg() {
      this.axios
        .post("/ddd" + this.vocabularyid + "&words=" + this.inputNewWords)
        .then(data => {
          (this.VisibleAddKg = false), (this.inputKg = [""]), this.getKgInfo();
        })
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });

      this.getKgInfo();
    },

    handleSelectionChange(val) {
      //val 为选中数据的集合
      this.RowSeleted = val;
    },
    //删除数据库
    deleteKgBtn(row) {
      console.log("row", row);
      if (!row) {
        this.IdSeleted = [];
        this.ShowKgSeleted = [];
        this.ShowStateSelected = [];
        this.RowSeleted.forEach((item, index) => {
          this.IdSeleted = this.IdSeleted.concat(item.id);
          this.ShowKgSeleted = this.ShowinfoSeleted.concat(item.database);
          this.ShowStateSelected = this.ShowStateSelected.concat(item.state);
          this.ShowKgSeleted.slice(-1);
          this.ShowStateSelected.slice(-1);
        });
      } else {
        this.ShowKgSeleted = '"' + row.database + '"';
        this.ShowStateSelected = '"' + row.state + '"';
        this.IdSeleted.push(row.id);
      }
      console.log("删除数据库", this.IdSeleted);
      this.VisibleDelKg = true;
    },
    deleteKg() {
      this.axios
        .delete("/eee" + this.IdSeleted.join(","))
        .then(data => {
          this.RowSeleted = [];
          this.IdSeleted = [];
          this.ShowKgSeleted = "";
          this.ShowStateSelected = "";
          this.getKgInfo();
        })
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });
      this.VisibleDelKg = false;
    },
    //全选词汇
    selectAll(rows) {
      if (this.selectAllBtn.startsWith("全选")) {
        rows.forEach(row => {
          this.$refs.refKgTable.toggleRowSelection(row, true);
        });
        this.selectAllBtn = "取消全选";
      } else {
        rows.forEach(row => {
          this.$refs.refKgTable.toggleRowSelection(row, false);
        });
        this.selectAllBtn = "全选";
      }
    },
  
    //导出
    getExcel(res) {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../excel/Export2Excel.js");
        const tHeader = ["id", "数据库", "数据库状态"];
        const filterVal = ["id", "database", "state"];
        const list = this.RowSeleted;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "导出列表名称");
      });
    },
    //require后面加相对路径用于引入本地模块或json文件
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
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
.demo-front {
  display: inline-block;
}
</style scoped>