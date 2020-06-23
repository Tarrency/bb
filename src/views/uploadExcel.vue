<template>
  <div>
    <el-container>
      <el-head title="导入EXCEL">
        <el-row>
          <el-upload action :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
            <button
              i="ios-cloud-upload-outline"
              :loading="uploadLoading"
              @click="handleUploadFile"
            >上传文件</button>
          </el-upload>
        </el-row>
        <el-row>
          <div v-if="file !== null">
            <i type="ios-stats"></i>
            {{ file.name }}
            <i
              v-show="showRemoveFile"
              type="ios-close"
              @click="handleRemove()"
            ></i>
          </div>
        </el-row>
      </el-head>
      <el-main>
        <el-row>
          <el-table :data="tableData" :loading="tableLoading">
            <el-table-column v-for="(item,i) of tableTitle" :key="i" :prop="item.key" :label="item.title"></el-table-column>
          </el-table>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Excel2Import from "../excel/Excel2Import";
export default {
  name: "uploadExcel",
  data() {
    return {
      uploadLoading: false,
      progressPercent: 0,
      showProgress: false,
      showRemoveFile: false,
      file: null,
      tableData: [],
      tableTitle: [],
      tableLoading: false
    };
  },
  methods: {
    initUpload() {
      this.file = null;
      this.showProgress = false;
      this.loadingProgress = 0;
      this.tableData = [];
      this.tableTitle = [];
    },
    handleUploadFile() {
      this.initUpload();
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
        // this.$Message.info('文件读取成功')
        const data = e.target.result;
        const { header, results } = Excel2Import.read(data, "array");
        const tableTitle = header.map(item => {
          return { title: item, key: item };
        });
        this.tableData = results;
        this.tableTitle = tableTitle;
        this.uploadLoading = false;
        this.tableLoading = false;
        this.showRemoveFile = true;
        console.log(this.tableData);
        console.log(this.tableTitle);
      };
    }
  },
  created() {},
  mounted() {}
};
</script>
