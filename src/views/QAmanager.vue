<template>
  <div>
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
              <el-radio-group v-model="QAlibraryid" @change="getQAInfo">
                <el-radio-button
                  v-for="value in QAlibrary"
                  :key="value.id"
                  :label="value.id"
                >{{value.name}}</el-radio-button>
              </el-radio-group>
            </el-col>
            <el-col :span="8" style="float:right;text-align:right">
              <el-button type="primary" size="small" @click="VisibleNewDialog=true">新增问答库</el-button>
              <el-button size="small" @click="VisibleDelDialog=checkQAlibraryId()">删除问答库</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9" :offset="10">
              <el-input
                placeholder="请输入关键词在此搜索"
                v-model.trim="searchText"
                @input="input"
                size="small"
                clearable
              >
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
            <el-table :data="QATable" ref="refQATable" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" label="全选"></el-table-column>
              <el-table-column prop="id" label="id"></el-table-column>
              <el-table-column prop="Question" label="问题">
                <template slot-scope="scope">
                  <span v-if="!scope.row.edit">{{scope.row.Quetion}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="Answer" label="回答">
                <template slot-scope="scope">
                  <span v-if="!scope.row.edit">{{scope.row.Answer}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="Type" label="类型">
                <template slot-scope="scope">
                  <span v-if="!scope.row.edit">{{scope.row.Type}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="word_update_time" label="更新时间">
                <template slot-scope="scope">{{scope.row.word_update_time| dateFormat}}</template>
              </el-table-column>
              <el-table-column prop="action" label="操作">
                <template slot-scope="scope">
                  <!-- <el-button size="mini" @click="modifyWordBtn(scope.$index, scope.row)">编辑</el-button> -->
                  <el-button size="mini" @click="modifyBtn()">编辑</el-button>
                  <el-button size="mini" type="danger" @click="deleteQABtn(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row>
            <el-col :span="4" style="float:left;text-align:left">
              <el-button type="primary" size="small" @click="selectAll(QATable)">{{selectAllBtn}}</el-button>
            </el-col>
            <el-col :span="12" style="float:right;text-align:right">
              <el-button type="primary" size="small" @click="VisibleAddQA= checkQAlibraryId()">逐条新增</el-button>
              <el-button type="danger" size="small" plain @click="deleteQABtn()">删除</el-button>
              <!-- =================== -->
              <el-button type="primary" size="small" @click="VisibleAddQAs= checkQAlibraryId()">批量导入</el-button>
              <el-button type="primary" size="small" @click="getExcel(QATable)">导出</el-button>
            </el-col>
          </el-row>
        </div>
        <!-- 弹出窗口 -->
        <!--新增问答库按钮-->
        <el-dialog
          title="新增问答库名称"
          :visible.sync="VisibleNewDialog"
          style="width:50%;text-align:center"
        >
          <el-form :model="QAform">
            <el-form-item>
              <el-input v-model="QAform.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="newQAlibrary">确定</el-button>
              <el-button @click="VisibleNewDialog=false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 编辑按钮 -->
        <el-dialog title="修改问答" :visible.sync="VisibleAddQA" class="dialog">
          <el-form :model="QAmodify">
            <el-form-item label="所属问答库：">
              <nobr v-for="v in QAlibrary" v-show="v.id == QAlibraryid" :key="v.id">{{v.name}}</nobr>
            </el-form-item>
            <!-- <el-form-item label="修改问题:" :prop="newQuestion"> -->
            <el-form-item label="修改问题:">
              <el-col :span="24">
                <el-input v-model="QAmodify.ModQuestion" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="修改回答:">
              <el-col :span="24">
                <el-input v-model="QAmodify.ModAnswer" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="修改类型:">
              <el-col :span="24">
                <el-input v-model="QAmodify.ModType" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="modifyQA">确定</el-button>
              <el-button @click="VisibleModify = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!--删除问答库按钮-->
        <el-dialog
          title="删除问答库"
          :visible.sync="VisibleDelDialog"
          style="width:50%;text-align:center"
        >
          <el-form>
            <el-form-item>
              删除不可恢复，您确定要删除问答库“
              <nobr
                v-for="v in QAlibrary"
                v-show="v.id == QAlibraryid"
                :key="v.id"
              >{{v.name}}</nobr>
              ”?
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="deleteLibrary">确定</el-button>
              <el-button @click="VisibleDelDialog = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!--逐条新增按钮-->
        <el-dialog title="新增问答" :visible.sync="VisibleAddQA" class="dialog">
          <el-form :model="inputQA">
            <el-form-item label="所属问答库：">
              <nobr v-for="v in QAlibrary" v-show="v.id == QAlibraryid" :key="v.id">{{v.name}}</nobr>
            </el-form-item>
            <el-form-item label="新增问题:" >
              <!-- <el-col :span="24" v-for="(question,index) in inputQuestion" :key="index">
                <el-input v-model="inputQuestion[index]" autocomplete="off"></el-input>
              </el-col>-->
              <el-col :span="24">
                <el-input v-model="inputQA.Question" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="新增回答:" >
              <el-col :span="24">
                <el-input v-model="inputQA.Answer" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="类型:" >
              <el-col :span="24">
                <el-input v-model="inputQA.Type" autocomplete="off"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addQA">确定</el-button>
              <el-button @click="VisibleAddQA = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!--导入弹框-->
        <el-dialog title="导入问答" :visible.sync="VisibleAddQAs" class="dialog">
          <el-form>
            <el-form-item label="所属问答库：">
              <nobr v-for="v in QAlibrary" v-show="v.id == QAlibraryid" :key="v.id">{{v.name}}</nobr>
            </el-form-item>
            <el-form-item>
              <el-upload action :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
                <el-button type="primary" :loading="uploadLoading" @click="handleUploadFile">确定</el-button>
              </el-upload>
              <el-button @click="VisibleAddQAs = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!--删除按钮-->
        <el-dialog title="删除问答" :visible.sync="VisibleDelQA" style="width:50%;text-align:center">
          <el-form>
            <el-form-item>删除不可恢复，您确定要删除问题{{ShowQuestionSeleted}}</el-form-item>
            <el-form-item>
              <el-button type="primary" @click="deleteQA">确定</el-button>
              <el-button @click="VisibleDelQA = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Excel2Import from "../excel/Excel2Import";
let moment = require("moment");
export default {
  data() {
    return {
      QAlibrary: [{ id: 0, name: "" }], //问答库列表
      QAlibraryid: 0, //选中问答库
      searchText: "", //搜素关键词
      QATable: [], //问答列表
      VisibleNewDialog: false,
      VisibleDelDialog: false,
      VisibleAddQA: false,
      //================
      VisibleAddQAs: false,
      QAform: { name: "" }, //新增问答库
      //新增问答
      inputQA: {
        Question: "",
        Answer: "",
        Type: ""
      },
      QAmodify:{
        ModQuestion: "",
        ModAnswer: "",
        ModType: "",
      },
      //修改编辑
      // inputQuestion: [""],
      // inputAnswer: [""],
      // inputType: [""],
      VisibleDelQA: false,
      // QuestionModify: "",
      // AnswerModify: "",
      // TypeModify: "",
      VisibleModify: false,
      RowSeleted: [], //当前选中行
      IdSeleted: [], //当前选中id集合
      ShowQuestionSeleted: [], //当前选中问题集合
      ShowAnswerSeleted: [],
      ShowTypeSeleted: [],
      selectAllBtn: "全选",
      //upload
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
    this.getQALibInfo();
  },
  methods: {
    //获取问答库名称
    getQALibInfo() {
      this.axios
        .get("/QAknowledge/getKnowledge", {
          params: {}
        })
        .then(resp => {
          this.QAlibrary = resp.data.data;
        })
        .catch(err => {});
    },
    //获取问答列表
    getQAInfo() {
      this.axios
        .get("/QAknowledge/getlist", {
          params: {
            id: this.QAlibraryid,
            queryKey: this.searchText
          }
        })
        .then(resp => {
          this.QATable = resp.data.data;
          this.QATable.edit = false;
        })
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });
    },
    //新增问答库
    newQAlibrary() {
      this.axios
        .post("/QAknowledge/create?QAKBName=" + this.QAform.name)
        .then(this.getQALibInfo, (this.VisibleNewDialog = false))
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });
    },
    //检查需要先选中问答库的操作
    checkQAlibraryId() {
      if (this.QAlibraryid > 0) {
        return true;
      } else {
        this.$msgbox({
          type: "warning",
          message: "请先选择问答库"
        });
        return false;
      }
    },
    //删除问答库
    deleteLibrary() {
      this.axios
        .delete("/QAknowledge/deleteBase?ids=" + this.QAlibraryid)
        .then(this.getQALibInfo, (this.VisibleDelDialog = false))
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });
    },
    //新增问答
    addQA() {
      this.axios
        .post("/QAknowledge/addKnowledge", {
          KBID: this.QAlibraryid,
          knowledge: this.inputQA
        })
        .then(data => {
          (this.VisibleAddQA = false), (this.inputQA = [""]), this.getQAInfo();
        })
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });

      this.getQAInfo();
      //getQAInfo
    },
    delinput(index) {
      this.inputQA.splice(index, 1);
    },
    handleSelectionChange(val) {
      //val 为选中数据的集合
      this.RowSeleted = val;
    },
    //编辑
    modifyBtn() {
      this.VisibleModify = true;
    },
    //修改确定按钮
    // modifyQA(index, row) {
    //   this.WordsModify = "";
    //   row.edit = !row.edit;
    //   this.$set(this.QATable, index, this.QATable[index]); //重新加载本行数据
    // },
    //修改问答确定按钮
    modifyQA(index, row) {
      console.log("修改问题", row.id, ":", this.QuestionModify);
      this.axios
        .post("/QAknowledge/updateKnowledge", {
          Id: row.id,
          // newData:this.QAmodify,
          // newQuestion: this.QAmodify.newQuestion,
          newQuestion: this.ModQuestion,
          newAnswer: this.ModAnswer,
          newType: this.ModType
        })
        .then(
          (row.edit = !row.edit),
          (row.Question = this.QAmodify.ModQuestion),
          (this.QAmodify.ModQuestion = ""),
          (row.Answer = this.QAmodify.ModAnswer),
          (this.QAmodify.ModAnswer = ""),
          (row.Type = this.QAmodify.ModType),
          (this.QAmodify.ModType = ""),
          this.$set(this.QATable, index, this.QATable[index]), //重新加载本行数据
          (this.VisibleModify = false)
        )
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });
      this.$set(this.QATable, index, this.QATable[index]); //重新加载本行数据
    },
    //删除问答
    deleteQABtn(row) {
      console.log("row", row);
      if (!row) {
        this.IdSeleted = [];
        this.ShowQuestionSeleted = [];
        this.ShowAnswerSeleted = [];
        this.ShowTypeSeleted = [];
        this.RowSeleted.forEach((item, index) => {
          this.IdSeleted = this.IdSeleted.concat(item.id);
          this.ShowQuestionSeleted = this.ShowQuestionSeleted.concat(
            item.Question
          );
          this.ShowQuestionSeleted.slice(-1);
          this.ShowAnswerSeleted = this.ShowAnswerSeleted.concat(item.Answer);
          this.ShowAnswerSeleted.slice(-1);
          this.ShowTypeSeleted = this.ShowTypeSeleted.concat(item.Type);
          this.ShowTypeSeleted.slice(-1);
        });
      } else {
        this.ShowQuestionSeleted = '"' + row.Question + '"';
        this.ShowAnswerSeleted = '"' + row.Answer + '"';
        this.ShowTypeSeleted = '"' + row.Type + '"';
        this.IdSeleted.push(row.id);
      }
      console.log("删除单词", this.IdSeleted);
      this.VisibleDelQA = true;
    },
    deleteQA() {
      this.axios
        .delete("/QAknowledge/deleteKnowledge?Ids=" + this.IdSeleted.join(","))
        .then(data => {
          this.RowSeleted = [];
          this.IdSeleted = [];
          this.ShowQuestionSeleted = "";
          this.ShowAnswerSeleted = "";
          this.ShowTypeSeleted = "";
          this.getQAInfo();
        })
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });
      this.VisibleDelQA = false;
    },
    //全选词汇
    selectAll(rows) {
      if (this.selectAllBtn.startsWith("全选")) {
        rows.forEach(row => {
          this.$refs.refQATable.toggleRowSelection(row, true);
        });
        this.selectAllBtn = "取消全选";
      } else {
        rows.forEach(row => {
          this.$refs.refQATable.toggleRowSelection(row, false);
        });
        this.selectAllBtn = "全选";
      }
    },
    testinput() {
      console.log("输入" + this.searchText);
      if (this.searchText === "" || this.searchText == null) {
        return;
      }
      this.WordTable = this.WordTable.filter((item, index) =>
        item.forEach(itm => itm == this.searchText)
      );
    },

    input(a) {
      this.searchText = a;
    },
    //导出
    getExcel(res) {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../excel/Export2Excel.js");
        const tHeader = ["id", "问题", "回答", "类型", "更新时间"];
        const filterVal = ["id", "Question", "Answer", "Type", "update_time"];
        const list = this.RowSeleted;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "导出问答列表");
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
      this.getQAInfo();
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
        this.QATable = [...this.QATable, ...results];
        //====================
        this.VisibleAddQAs = false;
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