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
        <el-main style="line-height:80px">
          <!-- 主要内容区 -->
          <div>
            <el-row :span="24">
              <!--数据库表格 -->
              <el-table :data="tableData" style="width:100%">
                <el-table-column type="selection" width="55" label="全选"></el-table-column>
                <el-table-column prop="id" label="序号"></el-table-column>
                <el-table-column prop="database" label="数据库"> </el-table-column>
                <el-table-column prop="state" label="数据库状态"> </el-table-column>
                <el-table-column prop="action" label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="importRelation(scope.$index, scope.row)">导入关系</el-button>
                    <el-button size="mini"  @click="exportRelation(scope.row)">导出关系</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row>
              <el-col :span="4" style="float:left;text-align:left">
                <el-button
                  type="primary"
                  @click="selectAll(WordTable)"
                >{{selectAllBtn}}</el-button>
              </el-col>
              <el-col :span="12" style="float:right;text-align:right">
                <el-button
                  type="primary"
                  @click="addKgBtn()"
                >新增知识图谱</el-button>
                <el-button  type="danger" plain @click="deleteWordBtn()">删除</el-button>
                <el-button type="primary" @click="getExcel(WordTable)">导出</el-button>
              </el-col>
            </el-row>
          </div>
          <!-- 弹出窗口 -->
          <!--新增知识图谱按钮-->
          <el-dialog title="新增知识图谱" :visible.sync="VisibleAddKg" class="dialog">
            <el-form>
              <el-form-item label="新增数据库名称:">
                <el-button type="primary" @click="addinput">继续添加</el-button>
              </el-form-item>
              <el-form-item>
                <el-col :span="24" v-for="(word,index) in inputNewWords" :key="index">
                  <el-row :gutter="20" class="margins">
                    <el-col :span="14">
                      <el-input v-model="inputNewWords[index]" autocomplete="off"></el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-button type="danger" plain @click="delinput(index)">删除</el-button>
                    </el-col>
                  </el-row>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addWord">确定</el-button>
                <el-button @click="VisibleAddKg = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
          <!--删除按钮-->
          <el-dialog title="删除数据库" :visible.sync="VisibleDelWord"
            style="width:50%;text-align:center">
            删除不可恢复，您确定要删除数据库{{ShowinfoSeleted}}
            <el-button  type="primary" @click="deleteWords">确定</el-button>
            <el-button  @click="VisibleDelWord = false">取消</el-button>
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
      vocabulary: [{ id: 0, name: "" }], //词表列表
      vocabularyid: 0, //选中词表
      searchText: "", //搜素关键词
      WordTable: [], //词汇列表
      VisibleNewDialog: false,
      VisibleDelDialog: false,
      VisibleAddKg: false,
      //================
      vcbform: { name: "" }, //新增词表
      inputNewWords: [""],
      VisibleDelWord: false,
      WordsModify: "", //要
      RowSeleted: [], //当前选中行
      IdSeleted: [], //当前选中id集合
      ShowinfoSeleted: [], //当前选中单词集合
      selectAllBtn: "全选",
    };
  },
  mounted() {//钩子函数
    this.getVcabularyInfo();
  },
  methods: {
    //获取词表名称id
    getVcabularyInfo() {
      this.axios
        .get("/aaa", {
          params: {
            type: 0
          }
          // 0:专用词，1：敏感词
        })
        .then(resp => {
          this.vocabulary = resp.data.data;
        })
        .catch(err => {});
    },
    //获取词语列表
    getWordInfo() {
      this.axios
        .get("/bbb", {
          params: {
            id: this.vocabularyid,
            key: this.searchText
          }
        })
        .then(resp => {
          this.WordTable = resp.data.data;
          this.WordTable.edit = false;
        })
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });
    },
    //新增词表
    newVocaburaly() {
      this.axios
        .post(
          "/vocabulary/addnew?name=" + this.vcbform.name 
          //name: this.vcbform.name,
        )
        .then(this.getVcabularyInfo, (this.VisibleNewDialog = false))
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });
    },
    //检查需要先选中词表的操作
    // checkVocaburalyId() {
    //   if (this.vocabularyid > 0) {
    //     return true;
    //   } else {
    //     this.$msgbox({
    //       type: "warning",
    //       message: "请先选择词表"
    //     });
    //     return false;
    //   }
    // },

    //删除词表
    delVocaburaly() {
      this.axios
        .delete("/ccc" + this.vocabularyid)
        .then(this.getVcabularyInfo, (this.VisibleDelDialog = false))
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });
    },
    //新增词汇
    addKgBtn(){
      this.VisibleAddKg=true;
    },
    addWord() {
      this.axios
        .post(
          "/ddd" +
            this.vocabularyid +
            "&words=" +
            this.inputNewWords
        )
        .then(data => {
          (this.VisibleAddKg = false),
            (this.inputNewWords = [""]),
            this.getWordInfo();
        })
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });

      this.getWordInfo();
      //getWordInfo
    },
    addinput() {
      let cope = "";
      this.inputNewWords.push(cope);
    },
    delinput(index) {
      this.inputNewWords.splice(index, 1);
    },
    handleSelectionChange(val) {
      //val 为选中数据的集合
      this.RowSeleted = val;
    },
    //删除词汇
    deleteWordBtn(row) {
      console.log("row", row);
      if (!row) {
        this.IdSeleted = [];
        this.ShowinfoSeleted = [];
        this.RowSeleted.forEach((item, index) => {
          this.IdSeleted = this.IdSeleted.concat(item.id);
          this.ShowinfoSeleted = this.ShowinfoSeleted.concat(item.word);
          this.ShowinfoSeleted.slice(-1);
        });
      } else {
        this.ShowinfoSeleted = '"' + row.word + '"';
        this.IdSeleted.push(row.id);
      }
      console.log("删除数据库", this.IdSeleted);
      this.VisibleDelWord = true;
    },
    deleteWords() {
      this.axios
        .delete(
          "/eee" + this.IdSeleted.join(",")
        )
        .then(data => {
          this.RowSeleted = [];
          this.IdSeleted = [];
          this.ShowinfoSeleted = "";
          this.getWordInfo();
        })
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });
      this.VisibleDelWord = false;
    },
    //全选词汇
    selectAll(rows) {
      if (this.selectAllBtn.startsWith("全选")) {
        rows.forEach(row => {
          this.$refs.refWordTable.toggleRowSelection(row, true);
        });
        this.selectAllBtn = "取消全选";
      } else {
        rows.forEach(row => {
          this.$refs.refWordTable.toggleRowSelection(row, false);
        });
        this.selectAllBtn = "全选";
      }
    },
    //查询删除
    testinput() {
      console.log("输入" + this.searchText);
      if(this.searchText===''||this.searchText==null){
            return ;} 
      this.WordTable=this.WordTable.filter((item,index)=>item.word==this.searchText);            
    },
    reset(){ this.getWordInfo()},
    
    input(a) {
      this.searchText = a;
    },

    //导出
    getExcel(res) {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../excel/Export2Excel.js");
        const tHeader = ["id", "词汇", "更新时间"];
        const filterVal = ["id", "word", "update_time"];
        const list = this.RowSeleted;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "导出列表名称");
      });
    },
    //require后面加相对路径用于引入本地模块或json文件
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
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
</style scoped>