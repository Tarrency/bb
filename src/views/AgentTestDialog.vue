<template>
  <el-dialog :visible.sync="visible.bol" :before-close="onClose">
    <!-- 主要内容区 -->
    <!-- 1.agent title -->
    <el-row type="flex" justify="center">
      <div class="title">测试：{{currentAgentName}}</div>
    </el-row>

    <!-- 2. 即时通讯 -->
    <el-row type="flex" justify="center">
      <div class="im">
        <JwChat
          :taleList="list"
          width="100%"
          @enter="onClickSend"
          v-model="inputMsg"
          :toolConfig="tool"
        />
      </div>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: 'AgentTestDialog',
  props: {
    currentAgentId: {
      //当前agent的id
      type: Number,
      required: true
    },
    currentAgentName: {
      //当前agent的名字
      type: String,
      required: true
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
      type: Array,
      required: true
    },

    //ui控制
    visible: {
      type: Object,
      default: { bol: false }
    }
  },
  watch: {
    visible() {
      console.log('watch visible', this.visible)
    },
  },
  data() {
    return {
      //im
      inputMsg: "", //当前输入的text
      list: [], //聊天历史
      tool: {
        show: ["history"],
        callback: this.toolEvent,
        showEmoji: false
      },
    };
  },
  created() {},
  methods: {
    /*
     * 发送
     * @params text 用户发送的测试文本
     * 回调agent的回答文本，插入对话列表
     */
    send(text) {
      this.axios
        .post("/aiie/predict", null, {
          params: {
            modelIds: [],
            modelType: 0,
            userText: text
          }
        })
        .then(resp => {
          console.log(resp);
          var msg = resp.data.data;
          if (!msg) msg = "机器人的回复"; //TODO 等接口可以调试就移除这个假数据
          this.pushRobotTextMsg(msg);
        })
        .catch(err => {
          console.log(err);
          const msg = "机器人的回复"; //TODO 等接口可以调试就移除这个假数据
          this.pushRobotTextMsg(msg);
        });
    },
    /*
     * 将文本封装为用户消息，推送到消息列表
     */
    pushUserTextMsg(text) {
      const msgObj = {
        date: "",
        text: { text: text },
        mine: true,
        name: "管理员",
        img: "user.svg"
      };
      this.list.push(msgObj);
    },
    /*
     * 将文本封装为机器人消息，推送到消息列表
     */
    pushRobotTextMsg(text) {
      const msgObj = {
        date: "",
        text: { text: text },
        mine: false,
        name: "测试",
        img: "robot.svg"
      };
      this.list.push(msgObj);
    },
    /*
     * 发送按钮
     */
    onClickSend() {
      const msg = this.inputMsg;
      if (!msg) return;
      //自己发送
      this.pushUserTextMsg(msg);
      //测试接口
      this.send(msg);
    },
    /*
     * IM 工具栏
     */
    toolEvent(type) {
      console.log("tools", type);
    },
    /*
     * 关闭本dialog
     */
    onClose(done) {
      //触发 onClose 事件
      //传递 el-dialog 的beforeClose的参数 done 给外界
      this.$emit('onClose', done)
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
.im {
  width: 100%;
  height: 100%;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  font-size: 14px;
  line-height: 150%;
  text-align: center;
}
</style>
