<template>
  <div>
    <el-container>
      <el-container>
        <el-header>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>QA知识管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <el-main style="line-height:80px">
          <!-- 主要内容区 -->
          <div>
            <el-row>
              <el-col :span="2" style="float:left">
                <span>问答库</span>
              </el-col>
              <el-col :span="8" style="float:left">
                <el-radio-group v-model="vocabularyid" @change="getWordInfo">
                  <el-radio-button
                    v-for="value in vocabulary"
                    :key="value.id"
                    :label="value.id"
                  >{{value.name}}</el-radio-button>
                </el-radio-group>
                <!-- <el-input value="1" /> -->
              </el-col>
              <el-col :span="8" style="float:right;text-align:right">
                <el-button type="primary" size="small" @click="VisibleNewDialog=true">新增问答库</el-button>

                <el-button size="small" @click="VisibleDelDialog=checkVocaburalyId()">删除问答库</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9" :offset="10">
                <el-input placeholder="请输入关键词在此搜索" v-model.trim="searchText" @input="input"
                  size="small"
                  clearable>
                  <el-button slot="prepend">关键词</el-button>
                  <!--复合型输入框，slot属性可指定是在输入框前面还是后置插入标签或按钮-->
                </el-input>
              </el-col>
              <el-col :span="5">
                <el-button type="primary" size="small" @click="testinput">查询</el-button>
                <el-button size="small">删除</el-button>
              </el-col>
            </el-row>
            <el-row>
              <!-- 单词表格 -->
              <el-table
                :data="WordTable"
                ref="refWordTable"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55" label="全选"></el-table-column>
                <el-table-column prop="id" label="id"></el-table-column>
                <el-table-column prop="question" label="问题">
                  <template slot-scope="scope">
                    <span v-if="!scope.row.edit">{{scope.row.quetion}}</span>
                    <el-input v-model="WordsModify" v-else>
                      <template slot="append">
                        <el-button @click="modifyQuestion(scope.$index,scope.row)">提交</el-button>
                      </template>
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="answer" label="回答">
                  <template slot-scope="scope">
                    <span v-if="!scope.row.edit">{{scope.row.answer}}</span>
                    <el-input v-model="WordsModify" v-else>
                      <template slot="append">
                        <el-button @click="modifyAnswer(scope.$index,scope.row)">提交</el-button>
                      </template>
                    </el-input>
                  </template>
                </el-table-column>
                 <el-table-column prop="type" label="类型">
                  <template slot-scope="scope">
                    <span v-if="!scope.row.edit">{{scope.row.type}}</span>
                     <el-input v-model="WordsModify" v-else>
                      <template slot="append">
                        <el-button @click="modifyType(scope.$index,scope.row)">提交</el-button>
                      </template>
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="word_update_time" label="更新时间">
                  <template slot-scope="scope">{{scope.row.word_update_time| dateFormat}}</template>
                </el-table-column>
                <el-table-column prop="action" label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="modifyWordBtn(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteWordBtn(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row>
              <el-col :span="4" style="float:left;text-align:left">
                <el-button type="primary" size="small" @click="selectAll(WordTable)">{{selectAllBtn}}</el-button>
              </el-col>
              <el-col :span="12" style="float:right;text-align:right">
                <el-button
                  type="primary"
                  size="small"
                  @click="VisibleAddWord= checkVocaburalyId()"
                >逐条新增</el-button>
                <el-button type="danger" size="small" plain @click="deleteWordBtn()">删除</el-button>
                <!-- =================== -->
                <el-button
                  type="primary"
                  size="small"
                  @click="VisibleAddWords= checkVocaburalyId()"
                >批量导入</el-button>
                <!-- ============================= -->
                <el-button type="primary" size="small" @click="getExcel(WordTable)">导出</el-button>
              </el-col>
            </el-row>
          </div>
          <!-- 弹出窗口 -->
          <!--新增词表按钮-->
          <el-dialog
            title="新增问答库名称"
            :visible.sync="VisibleNewDialog"
            style="width:50%;text-align:center"
          >
            <el-form :model="vcbform">
              <el-form-item>
                <el-input v-model="vcbform.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button  type="primary" @click="newVocaburaly">确定</el-button>
                <el-button  @click="VisibleNewDialog=false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
          <!--删除词表按钮-->
          <el-dialog
            title="删除问答库"
            :visible.sync="VisibleDelDialog"
            style="width:50%;text-align:center"
          >
            删除不可恢复，您确定要删除问答库“
            <nobr
              v-for="v in vocabulary"
              v-show="v.id == vocabularyid"
              :key="v.id"
            >{{v.name}}</nobr>
            ”?
            <br />
            <el-button style="float:right" type="primary" @click="delVocaburaly">确定</el-button>
            <el-button style="float:right" @click="VisibleDelDialog = false">取消</el-button>
          </el-dialog>
          <!--逐条新增按钮-->
          <el-dialog title="新增问答" :visible.sync="VisibleAddWord" class="dialog">
            <el-form>
              <el-form-item label="所属问答库：">
                <nobr v-for="v in vocabulary" v-show="v.id == vocabularyid" :key="v.id">{{v.name}}</nobr>
              </el-form-item>
              <el-form-item label="新增问题:">
                <el-col :span="24" v-for="(word,index) in inputQuestion" :key="index">
                  <el-row :gutter="20" class="margins">
                    <el-col :span="14">
                      <el-input v-model="inputQuestion[index]" autocomplete="off"></el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-button type="danger" plain @click="delinput(index)">删除</el-button>
                    </el-col>
                  </el-row>
                </el-col>
              </el-form-item>
              <el-form-item label="新增回答:">
                <el-col :span="24" v-for="(word,index) in inputAnswer" :key="index">
                  <el-row :gutter="20" class="margins">
                    <el-col :span="14">
                      <el-input v-model="inputAnswer[index]" autocomplete="off"></el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-button type="danger" plain @click="delinput(index)">删除</el-button>
                    </el-col>
                  </el-row>
                </el-col>
              </el-form-item>
               <el-form-item label="类型:">
                <el-col :span="24" v-for="(word,index) in inputType" :key="index">
                  <el-row :gutter="20" class="margins">
                    <el-col :span="14">
                      <el-input v-model="inputType[index]" autocomplete="off"></el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-button type="danger" plain @click="delinput(index)">删除</el-button>
                    </el-col>
                  </el-row>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addWord">确定</el-button>
                <el-button @click="VisibleAddWord = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
          <!--导入弹框-->
          <el-dialog title="导入问答" :visible.sync="VisibleAddWords" class="dialog">
            <el-form>
              <el-form-item label="所属问答库：">
                <nobr v-for="v in vocabulary" v-show="v.id == vocabularyid" :key="v.id">{{v.name}}</nobr>
              </el-form-item>
              <el-form-item>
                <el-upload action :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
                  <el-button type="primary" :loading="uploadLoading" @click="handleUploadFile">确定</el-button>
                </el-upload>
                <el-button @click="VisibleAddWords = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
          <!--删除按钮-->
          <el-dialog title="删除问答" :visible.sync="VisibleDelWord" style="width:50%;text-align:center">
            删除不可恢复，您确定要删除问题{{ShowinfoSeleted}}
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
      VisibleAddWord: false,
      //================
      VisibleAddWords: false,
      vcbform: { name: "" }, //新增词表
      //inputNewWords: [""],
      //新增问答
      inputQuestion: [""],
      inputAnswer: [""],
      inputType: [""],
      VisibleDelWord: false,
      WordsModify: "", //要
      RowSeleted: [], //当前选中行
      IdSeleted: [], //当前选中id集合
      ShowinfoSeleted: [], //当前选中单词集合
      selectAllBtn: "全选",
      //   ================
      uploadLoading: false,
      progressPercent: 0,
      showProgress: false,
      showRemoveFile: false,
      file: null,
      tableLoading: false
    };
  },
  mounted() {
    //钩子函数
    this.getVcabularyInfo();
  },
  methods: {
    //获取词表名称id
    getVcabularyInfo() {
      this.axios
        .get("/vocabulary/getlist", {
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
        .get("/vocabulary/search", {
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
          "/vocabulary/addnew?name=" + this.vcbform.name + "&type=0"
          //name: this.vcbform.name,
          //type : 0 // 0:专用词，1：敏感词
        )
        .then(this.getVcabularyInfo, (this.VisibleNewDialog = false))
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });
    },
    //检查需要先选中词表的操作
    checkVocaburalyId() {
      if (this.vocabularyid > 0) {
        return true;
      } else {
        this.$msgbox({
          type: "warning",
          message: "请先选择问答库"
        });
        return false;
      }
    },

    //删除词表
    delVocaburaly() {
      this.axios
        .delete("/vocabulary/delete?id=" + this.vocabularyid)
        .then(this.getVcabularyInfo, (this.VisibleDelDialog = false))
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });
    },
    //新增词汇
    addWord() {
      this.axios
        .post(
          "/vocabulary/addword?id=" +
            this.vocabularyid +
            "&words=" +
            this.inputQuestion+
            this.inputAnswer+
            this.inputType
        )
        .then(data => {
          (this.VisibleAddWord = false),
            (this.inputQuestion = [""]),
            (this.inputAnswer = [""]),
            (this.inputType = [""]),
            this.getWordInfo();
        })
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });

      this.getWordInfo();
      //getWordInfo
    },
    delinput(index) {
      this.inputQuestion.splice(index, 1);
    },
    handleSelectionChange(val) {
      //val 为选中数据的集合
      this.RowSeleted = val;
    },
    //修改确定按钮
    modifyWordBtn(index, row) {
      this.WordsModify = "";
      row.edit = !row.edit;
      this.$set(this.WordTable, index, this.WordTable[index]); //重新加载本行数据
    },
    //修改问题
    modifyQuestion(index, row) {
      console.log("修改问题", row.id, ":", this.WordsModify);
      this.axios
        .post("/vocabulary/modify", {
          wordID: row.id,
          newWord: this.WordsModify
        })
        .then(
          (row.edit = !row.edit),
          (row.word = this.WordsModify),
          (this.WordsModify = "")
        )
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });
      this.$set(this.WordTable, index, this.WordTable[index]); //重新加载本行数据
    },
    //修改答案
    modifyAnswer(index, row) {
      console.log("修改答案", row.id, ":", this.WordsModify);
      this.axios
        .post("/vocabulary/modify", {
          wordID: row.id,
          newWord: this.WordsModify
        })
        .then(
          (row.edit = !row.edit),
          (row.word = this.WordsModify),
          (this.WordsModify = "")
        )
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });
      this.$set(this.WordTable, index, this.WordTable[index]); //重新加载本行数据
    },
    //修改类型
    modifyType(index, row) {
      console.log("修改类型", row.id, ":", this.WordsModify);
      this.axios
        .post("/vocabulary/modify", {
          wordID: row.id,
          newWord: this.WordsModify
        })
        .then(
          (row.edit = !row.edit),
          (row.word = this.WordsModify),
          (this.WordsModify = "")
        )
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });
      this.$set(this.WordTable, index, this.WordTable[index]); //重新加载本行数据
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
      console.log("删除单词", this.IdSeleted);
      this.VisibleDelWord = true;
    },
    deleteWords() {
      this.axios
        .delete("./vocabulary/deleteWords?wordIDs=" + this.IdSeleted.join(","))
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
    testinput() {
      console.log("输入" + this.searchText);
    },

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
    // 导入
    initUpload() {
      this.file = null;
      this.showProgress = false;
      this.loadingProgress = 0;
      this.tableData = [];
      this.tableTitle = [];
    },
    handleUploadFile() {
      this.initUpload();
      this.getWordInfo();
    },
    handleRemove() {
      this.initUpload();
      this.$Message.info("上传的文件已删除！");
    },
    handleBeforeUpload(file) {
      const fileExt = file.name
        .split(".")
        .pop()
        .toLocaleLowerCase();
      if (fileExt === "xlsx" || fileExt === "xls") {
        this.readFile(file);
        this.file = file;
      } else {
        this.$Notice.warning({
          title: "文件类型错误",
          desc:
            "文件：" +
            file.name +
            "不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。"
        });
      }
      return false;
    },
    // 读取文件
    readFile(file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadstart = e => {
        this.uploadLoading = true;
        this.tableLoading = true;
        this.showProgress = true;
      };
      reader.onprogress = e => {
        this.progressPercent = Math.round((e.loaded / e.total) * 100);
      };
      reader.onerror = e => {
        this.$Message.error("文件读取出错");
      };
      reader.onload = e => {
        const data = e.target.result;
        const { header, results } = Excel2Import.read(data, "array");
        const tableTitle = header.map(item => {
          return { title: item, key: item };
        });
        this.uploadLoading = false;
        this.tableLoading = false;
        this.showRemoveFile = true;
        this.WordTable = [...this.WordTable, ...results];
        //====================
        this.VisibleAddWords = false;
      };
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
</style scoped>