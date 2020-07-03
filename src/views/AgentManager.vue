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
        <div>
          <!-- 1.搜索agent -->
          <el-row>
            <el-input placeholder="请输入agent名称在此搜索" v-model="searchAgentName">
              <el-button slot="prepend">Agent</el-button>
              <el-button slot="append" icon="el-icon-search" @click="onSearchAgent"></el-button>
            </el-input>
          </el-row>
          <!-- 2. 选中agent -->
          <el-row>
            <el-col :span="8" style="float:left;text-align:left">
              <el-radio-group v-model="currentInfo.id" @change="onSelectAgent">
                <el-radio-button
                  v-for="item in agentList"
                  :key="item.agentId"
                  :label="item.agentId"
                  :value="item.agentName"
                >{{item.agentName}}</el-radio-button>
              </el-radio-group>
            </el-col>
            <el-col :span="3" style="float:right">
              <!-- 新增agent -->
              <el-button type="primary" @click="newAgent = true">新增Agent</el-button>
            </el-col>
          </el-row>

          <!-- 3. agent的挂载表格 -->
          <el-row>
            <el-table :data="currentAgentModels" style="border:solid darkgray 1px;">
              <el-table-column prop="modeData" label="挂载内容" width="500"></el-table-column>
              <el-table-column prop="modeType" label="类别" width="280"></el-table-column>
            </el-table>
          </el-row>
          <!-- 4. 对agent的操作 -->
          <el-row>
            <el-col :span="12">
              <el-row style="float:left">
                <nobr
                  v-if="selectExistAgent()"
                >Agent ID:{{currentInfo.id}}，创建于{{currentAgentCreateTime}}</nobr>
                <nobr v-if="!selectExistAgent()">请选择一个agent</nobr>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row style="float:right">
                <el-button
                  type="primary"
                  @click="changeAgent = true"
                  :disabled="!selectExistAgent()"
                >修改</el-button>
                <el-button
                  type="primary"
                  @click="testAgent.visible = true"
                  :disabled="!selectExistAgent()"
                >测试</el-button>
                <el-button
                  type="primary"
                  @click="deleteAgent = true"
                  :disabled="!selectExistAgent()"
                >删除</el-button>
              </el-row>
            </el-col>
          </el-row>

          <!-- 5. 新增agent以及挂载的dialog -->
          <el-dialog title="新增Agent" :visible.sync="newAgent" class="dialog-body">
            <el-form :model="newInfo" label-position="right" label-width="100px">
              <el-form-item label="名称:" placeholder="请输入agent名称">
                <el-input v-model="newInfo.name" style="width:50%"></el-input>
              </el-form-item>
              <el-form-item label="模型类型:">
                <el-select placeholder v-model="newInfo.modelType" @change="onNewModelType">
                  <el-option
                    v-for="item in modelType2Label"
                    :key="item.type"
                    :label="item.label"
                    :value="item.type"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="模型:">
                <el-button
                  type="primary"
                  @click="newAgentMount.visible = true"
                  :disabled="newAgentMountDisable"
                >+ 请添加挂载</el-button>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="newAgent = false">取 消</el-button>
              <el-button type="primary" @click="onAddAgent">确 定</el-button>
            </div>
          </el-dialog>
          <agent-mount-dialog
            :controller="newAgentMount"
            :model-type="newInfo.modelType"
            :model-ids="newInfo.modelIds"
          ></agent-mount-dialog>

          <!-- 6. 修改agent的dialog -->
          <el-dialog title="修改Agent" :visible.sync="changeAgent" class="dialog-body">
            <el-form :model="currentInfo" label-position="right" label-width="100px">
              <el-form-item label="id:">
                <nobr v-model="currentInfo.id" style="width:50%">{{currentInfo.id}}</nobr>
              </el-form-item>
              <el-form-item label="名称:" placeholder="请输入agent名称">
                <el-input v-model="currentInfo.name" style="width:50%">{{currentInfo.name}}</el-input>
              </el-form-item>
              <el-form-item label="模型类型:">
                <el-select placeholder v-model="currentInfo.modelType" @change="onChangeModelType">
                  <el-option
                    v-for="item in modelType2Label"
                    :key="item.type"
                    :label="item.label"
                    :value="item.type"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="模型:">
                <el-button
                  type="primary"
                  @click="changeAgentMount.visible = true"
                  :disabled="changeAgentMountDisable"
                >+ 请添加挂载</el-button>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="changeAgent = false">取 消</el-button>
              <el-button type="primary" @click="onChangeAgent">确 定</el-button>
            </div>
          </el-dialog>
          <agent-mount-dialog
            :controller="changeAgentMount"
            :model-type="currentInfo.modelType"
            :model-ids="currentInfo.modelIds"
          ></agent-mount-dialog>

          <!-- 7. 删除agent -->
          <el-dialog :visible.sync="deleteAgent" :before-close="handleClose">
            <span>您确认要删除agent吗？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="deleteAgent = false">取 消</el-button>
              <el-button type="primary" @click="onDeleteAgent">确 定</el-button>
            </span>
          </el-dialog>

          <!-- 8. 测试 -->
          <agent-test-dialog
            :controller="testAgent"
            :current-agent-id="currentInfo.id"
            :current-agent-name="currentInfo.name"
            :model-type="currentInfo.modelType"
            :model-ids="currentInfo.modelIds"
            @onClose="handleClose"
          ></agent-test-dialog>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AgentTestDialog from "./AgentTestDialog";
import AgentMountDialog from "./AgentMountDialog";
export default {
  components: {
    AgentTestDialog,
    AgentMountDialog
  },
  data() {
    return {
      searchAgentName: "", //需要搜索的agent名字
      agentList: [], //所有可选的agent
      currentAgentModels: [], //当前agent挂载的所有模型 [{modelId,modelType,modeData}]
      currentAgentCreateTime: "",
      currentInfo: {
        id: -1, //当前agent的id
        name: "",
        modelType: -1,
        modelIds: [], //[String] 模型的id是string
        createTime: -1
      }, //当前agent,供修改
      newInfo: {
        name: "",
        modelType: -1,
        modelIds: [] //[String] 模型的id是string
      },

      //以下是静态数据，不要修改
      modelType2Label: [
        { type: 0, label: "QA" },
        { type: 1, label: "知识图谱" },
        { type: 2, label: "多轮对话" },
        { type: 3, label: "词表" }
      ],

      //以下是ui控制域
      deleteAgent: false,
      testAgent: { visible: false },

      newAgent: false,
      newAgentMount: {
        visible: false
      },
      newAgentMountDisable: true,

      changeAgent: false,
      changeAgentMount: {
        visible: true //修改agent时，一定已经有合法的modelType了，可以直接显示
      },
      changeAgentMountDisable: true
    };
  },
  computed: {},
  created() {
    this.onSearchAgent(null);
  },
  methods: {
    /*
     * 是否已选中某个agent
     */
    selectExistAgent() {
      return this.currentInfo.id != -1;
    },
    /*
     * 搜索 agent
     */
    onSearchAgent(e) {
      console.log("搜索 " + this.searchAgentName);
      this.axios
        .get("/agent/getlist", {
          params: {
            adminID: 1, //TODO 因为登录业务没有完成,这里需要当前登录的管理员的id
            agentName: this.searchAgentName
          }
        })
        .then(resp => {
          console.log(resp);
          const data = resp.data.data;
          if (!data) return;
          this.agentList = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /*
     * 显示 agent
     */
    onSelectAgent(e) {
      //1.缓存agentInfo供修改
      if (this.agentList != null) {
        let agent = this.agentList.find(it => {
          return it.agentId === this.currentInfo.id;
        });
        if (agent != null) {
          this.currentInfo.id = agent.agentId;
          this.currentInfo.name = agent.agentName;
          this.currentInfo.modelType = agent.modelType;
          this.currentInfo.modelIds = agent.modelIds;
          this.currentInfo.createTime = agent.agentCreateTime;

          this.currentAgentCreateTime = new Date(
            agent.agentCreateTime
          ).toLocaleDateString();
          console.log(this.currentInfo);
        }
      }

      //2.查询挂载信息
      this.axios
        .post("/aiie/getModels", null, {
          params: {
            agentId: this.currentInfo.id
          }
        })
        .then(resp => {
          console.log(resp);
          const data = resp.data.data;
          if (!data) return;
          this.handleAgent(data);
        })
        .catch(err => {
          console.log(err);
          //TODO 用了假数据，记得去掉
          let data = {
            "0": {
              modelId: 16,
              modeType: 0,
              modeData: "commonsenseQA"
            },
            "1": {
              modelId: 17,
              modeType: 0,
              modeData: "commonsenseQA"
            },
            "2": {
              modelId: 18,
              modeType: 0,
              modeData: "commonsenseQA"
            }
          };
          this.handleAgent(data);
        });
    },
    mapModelType2Name(modelType) {
      const item = this.modelType2Label.find(it => {
        return it.type === modelType;
      });
      return item.label;
    },
    /*
     * 保存model信息,并写入currentInfo以供修改
     * data: models of agent [{modelId, modeData, modeType}]
     */
    handleAgent(data) {
      this.currentInfo.modelIds = [];
      this.currentAgentModels = Object.values(data).map(it => {
        this.currentInfo.modelIds.push(it.modelId);
        return {
          modelId: it.modelId,
          modeType: this.mapModelType2Name(it.modeType),
          modeData: it.modeData
        };
      });
    },

    /*
     * 添加 agent
     */
    onAddAgent() {
      this.newAgent = false;
      this.axios
        .put("/agent/addnew", null, {
          params: {
            adminID: 1, //TODO 因为登录业务没有完成,这里需要当前登录的管理员的id
            agentName: this.newInfo.name,
            modelType: this.newInfo.modelType,
            modelIds: this.newInfo.modelIds
          }
        })
        .then(resp => {
          console.log(resp);
          this.onSearchAgent(null);
        })
        .catch(err => {
          console.log(err);
        });
    },
    /*
     * 修改 agent
     */
    onChangeAgent() {
      this.changeAgent = false;
      this.axios
        .put("/agent/change", null, {
          params: {
            adminID: 1, //TODO 因为登录业务没有完成,这里需要当前登录的管理员的id
            agentID: this.currentInfo.id,
            agentName: this.currentInfo.name,
            modelType: this.currentInfo.modelType,
            modelIds: this.currentInfo.modelIds
          }
        })
        .then(resp => {
          console.log(resp);
          this.onSelectAgent(null);
        })
        .catch(err => {
          console.log(err);
        });
    },
    /*
     * 删除 agent
     */
    onDeleteAgent() {
      this.deleteAgent = false;
      this.axios
        .delete("/agent/delete", {
          params: {
            adminID: 1, //TODO 因为登录业务没有完成,这里需要当前登录的管理员的id
            agentID: this.currentInfo.id
          }
        })
        .then(resp => {
          let data = resp.data.data;
          console.log(resp);
          this.onSearchAgent(null);
        })
        .catch(err => {
          console.log(err);
        });
    },
    validModelType(modelType) {
      return modelType >= 0 && modelType <= 3;
    },
    /*
     * 修改模型
     * 选中模型类型时，根据模型类型读取该类型的所有模型，以供选择
     */
    onChangeModelType(e) {
      const type = this.currentInfo.modelType;
      const validModelType = this.validModelType(type);
      this.changeAgentMountDisable = !validModelType;
      console.log(type, this.changeAgentMount);
    },
    /*
     * 新建模型
     * 选中模型类型时，根据模型类型读取该类型的所有模型，以供选择
     */
    onNewModelType(e) {
      const type = this.newInfo.modelType;
      const validModelType = this.validModelType(type);
      this.newAgentMountDisable = !validModelType;
      console.log(type, this.newAgentMount);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
</style>
