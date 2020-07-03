<template>
  <el-dialog :title="title" :visible.sync="controller.visible" class="dialog-body">
    <el-checkbox-group v-model="modelIds">
      <el-checkbox
        v-for="item in modelList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >{{item.name}}</el-checkbox>
    </el-checkbox-group>
    <div slot="footer" class="dialog-footer">
      <el-button @click="controller.visible = false">取 消</el-button>
      <el-button type="primary" @click="onConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "AgentMountDialog",
  props: {
    title: {
      //名字
      type: String, //[String]
      default: "挂载模型"
    },
    modelType: {
      //当前agent的模型类型
      // 0: "QA"
      // 1: "知识图谱"
      // 2: "多轮对话"
      // 3: "词表"
      type: Number,
      required: true
    },
    modelIds: {
      //当前挂载到agent的所有模型的id
      type: Array, //[string]
      required: true
    },

    //ui控制
    controller: {
      type: Object,
      default: {
        visible: false
      }
    }
  },
  watch: {
    /*
     * 观察modelType，每次它改变都要刷新 待选择模型列表 modelList
     */
    modelType() {
      console.log(this.modelList);
      this.loadModelByType();
      console.log(this.modelList);
    }
  },
  data() {
    return {
      //待选择的模型列表，包含了相对于modelType的所有模型
      modelList: [] //[{ id: string, name: string }]
    };
  },
  methods: {
    /*
     * 加载待选择模型
     */
    loadModelByType() {
      this.modelList = [];
      switch (this.modelType) {
        case 0:
          this.modelList = [{ id: "1", name: "QA" }];
          break;
        case 1:
          this.modelList = [{ id: "1", name: "知识图谱" }];
          break;
        case 2:
          this.modelList = [{ id: "1", name: "多轮对话" }];
          break;
        case 3:
          this.modelList = [{ id: "1", name: "词表" }];
          break;
        default:
          break;
      }
    },
    onConfirm() {
      this.controller.visible = false;
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 24px;
  font-weight: bold;
  line-height: 110%;
}
</style>
