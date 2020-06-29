<template>
  <div id="submit" class="box">
    <el-container>
      <el-header>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>Agent管理</el-breadcrumb-item>
          <el-breadcrumb-item>测试</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main style="line-height:80px">
        <!-- 主要内容区 -->
        <div>
          <!-- 1.agent title -->
          <el-row type="flex" justify="center">
            <div class="title">{{currentAgentName}}测试</div>
          </el-row>

          <!-- 2. 即时通讯 -->
          <el-row type="flex" justify="center">
            <div class="im">
              <JwChat :taleList="list" width="100%" @enter="bindEnter" v-model="inputMsg" :toolConfig="tool" />
            </div>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentAgentId: "", //当前agent的id
      currentAgentName: "",
      inputMsg: "",//当前输入的text
      list: [],//聊天历史
      tool: {
        show: ["history"],
        callback: this.toolEvent,
        showEmoji: false
      }
    };
  },
  created() {},
  methods: {
    /*
     * 发送
     */
    send(text) {
      this.axios
        .post("/aiie/predict", null, {
          params: {
            modelIds:[],
            modelType:0,
            userText: text,
          }
        })
        .then(resp => {
          console.log(resp);
        })
        .catch(err => {
          console.log(err);
        });
    },
    toUserTextMsg(text) {
      return {
        date: "",
        text: { text: text },
        mine: true,
        name: "管理员",
        img: "user.svg"
      };
    },
    toRobotTextMsg(text) {
      return {
        date: "",
        text: { text: text },
        mine: false,
        name: "测试",
        img: "robot.svg"
      };
    },
    bindEnter() {
      const msg = this.inputMsg;
      if (!msg) return;
      //自己发送
      const msgObj = this.toUserTextMsg(msg);
      this.list.push(msgObj);
      //测试接口
      send(msg);
    },
    toolEvent(type) {
      console.log("tools", type);
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
.title {
  font-size: 24px;
  font-weight: bold;
  line-height:110%;
}
.im {
  width: 860px;
  height: 100%;
  left: 354px;
  top: 224px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  font-size: 14px;
  line-height: 150%;
  box-shadow: 0px 13px 13px 0px rgba(0, 0, 0, 0.5);
  text-align: center;
}
.divider {
  width: 100%;
  height: 1px;
  left: 354px;
  top: 670px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(153, 153, 153, 0.4857142857142857);
  font-size: 14px;
  line-height: 150%;
  text-align: center;
}
.im-content {
  height: 75%;
}
.im-input {
  height: 25%;
}
</style>
