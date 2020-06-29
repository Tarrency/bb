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
              <el-radio-group v-model="currentAgentId" @change="onSelectAgent">
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
                <nobr>{{currentAgentId}}, 创建于{{currentAgentCreateTime}}</nobr>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row style="float:right">
                <el-button type="primary" @click="changeAgent = true">修改</el-button>
                <el-button type="primary">测试</el-button>
                <el-button type="primary" @click="deleteAgent = true">删除</el-button>
              </el-row>
            </el-col>
          </el-row>

          <!-- 5. 新增agent以及挂载的dialog -->
          <el-dialog title="新增Agent" :visible.sync="newAgent" class="dialog-body">
            <el-form :model="newInfo" label-position="right" label-width="100px">
              <el-form-item label="名称:" placeholder="请输入agent名称">
                <el-input v-model="newInfo.name" style="width:50%"></el-input>
              </el-form-item>
              <el-form-item label="QA知识库:">
                <el-button type="primary" @click="newAgentMountQA = true">+ 请添加挂载</el-button>
              </el-form-item>
              <el-form-item label="多轮对话场景:">
                <el-button type="primary" @click="newAgentMountScene = true">+ 请添加挂载</el-button>
              </el-form-item>
              <el-form-item label="知识图谱:">
                <el-button type="primary" @click="newAgentMountKG = true">+ 请添加挂载</el-button>
              </el-form-item>
              <el-form-item label="词表:">
                <el-button type="primary" @click="newAgentMountWD = true">+ 请添加挂载</el-button>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="newAgent = false">取 消</el-button>
              <el-button type="primary" @click="onAddAgent">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="挂接对论对话" :visible.sync="newAgentMountScene" class="dialog-body">
            <el-checkbox-group v-model="newInfo.sceneid">
              <el-checkbox
                v-for="item in sceneList"
                :key="item.id"
                :label="item.id"
                :value="item.name"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
              <el-button @click="newAgentMountScene = false">取 消</el-button>
              <el-button type="primary" @click="newAgentMountScene = false">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="挂接QA知识库" :visible.sync="newAgentMountQA" class="dialog-body">
            <el-checkbox-group v-model="newInfo.qaid">
              <el-checkbox
                v-for="item in QAList"
                :key="item.id"
                :label="item.id"
                :value="item.name"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
              <el-button @click="newAgentMountQA = false">取 消</el-button>
              <el-button type="primary" @click="newAgentMountQA = false">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="挂接知识图谱" :visible.sync="newAgentMountKG" class="dialog-body">
            <el-checkbox-group v-model="newInfo.kgid">
              <el-checkbox
                v-for="item in KGList"
                :key="item.id"
                :label="item.id"
                :value="item.name"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
              <el-button @click="newAgentMountKG = false">取 消</el-button>
              <el-button type="primary" @click="newAgentMountKG = false">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="挂接词表" :visible.sync="newAgentMountWD" class="dialog-body">
            <el-checkbox-group v-model="newInfo.vocabularyid">
              <el-checkbox
                v-for="item in vocabularyList"
                :key="item.id"
                :label="item.id"
                :value="item.name"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
              <el-button @click="newAgentMountWD = false">取 消</el-button>
              <el-button type="primary" @click="newAgentMountWD = false">确 定</el-button>
            </div>
          </el-dialog>

          <!-- 6. 修改agent的dialog -->
          <el-dialog title="修改Agent" :visible.sync="changeAgent" class="dialog-body">
            <el-form :model="currentInfo" label-position="right" label-width="100px">
              <el-form-item label="id:">
                <nobr v-model="currentInfo.id" style="width:50%">{{currentInfo.id}}</nobr>
              </el-form-item>
              <el-form-item label="名称:" placeholder="请输入agent名称">
                <el-input v-model="currentInfo.name" style="width:50%">{{currentInfo.name}}</el-input>
              </el-form-item>
              <el-form-item label="QA知识库:">
                <el-button type="primary" @click="changeAgentMountQA = true">+ 请添加挂载</el-button>
              </el-form-item>
              <el-form-item label="多轮对话场景:">
                <el-button type="primary" @click="changeAgentMountScene = true">+ 请添加挂载</el-button>
              </el-form-item>
              <el-form-item label="知识图谱:">
                <el-button type="primary" @click="changeAgentMountKG = true">+ 请添加挂载</el-button>
              </el-form-item>
              <el-form-item label="词表:">
                <el-button type="primary" @click="changeAgentMountWD = true">+ 请添加挂载</el-button>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="changeAgent = false">取 消</el-button>
              <el-button type="primary" @click="onChangeAgent">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="挂接对论对话" :visible.sync="changeAgentMountScene" class="dialog-body">
            <el-checkbox-group v-model="currentInfo.sceneid">
              <el-checkbox
                v-for="item in sceneList"
                :key="item.id"
                :label="item.id"
                :value="item.name"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
              <el-button @click="changeAgentMountScene = false">取 消</el-button>
              <el-button type="primary" @click="changeAgentMountScene = false">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="挂接QA知识库" :visible.sync="changeAgentMountQA" class="dialog-body">
            <el-checkbox-group v-model="currentInfo.qaid">
              <el-checkbox
                v-for="item in QAList"
                :key="item.id"
                :label="item.id"
                :value="item.name"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
              <el-button @click="changeAgentMountQA = false">取 消</el-button>
              <el-button type="primary" @click="changeAgentMountQA = false">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="挂接知识图谱" :visible.sync="changeAgentMountKG" class="dialog-body">
            <el-checkbox-group v-model="currentInfo.kgid">
              <el-checkbox
                v-for="item in KGList"
                :key="item.id"
                :label="item.id"
                :value="item.name"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
              <el-button @click="changeAgentMountKG = false">取 消</el-button>
              <el-button type="primary" @click="changeAgentMountKG = false">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="挂接词表" :visible.sync="changeAgentMountWD" class="dialog-body">
            <el-checkbox-group v-model="currentInfo.vocabularyid">
              <el-checkbox
                v-for="item in vocabularyList"
                :key="item.id"
                :label="item.id"
                :value="item.name"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
              <el-button @click="changeAgentMountWD = false">取 消</el-button>
              <el-button type="primary" @click="changeAgentMountWD = false">确 定</el-button>
            </div>
          </el-dialog>

          <!-- 7. 删除agent -->
          <el-dialog :visible.sync="deleteAgent" :before-close="handleClose">
            <span>您确认要删除agent吗？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="deleteAgent = false">取 消</el-button>
              <el-button type="primary" @click="onDeleteAgent">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchAgentName: "", //需要搜索的agent名字
      agentList: [], //所有可选的agent
      currentAgentId: "", //当前agent的id
      currentAgentModels: [], //当前agent挂载的所有模型 [{modelId,modelType,modeData}]
      currentAgentCreateTime: "",
      currentInfo: {
        id: 1,
        name: "",
        qaid: [], //QA
        sceneid: [], //多轮对话
        kgid: [], //知识图谱
        vocabularyid: [] //词表
      }, //当前agent,供修改
      newInfo: {
        name: "",
        qaid: [], //QA
        sceneid: [], //多轮对话
        kgid: [], //知识图谱
        vocabularyid: [] //词表
      },
      QAList: [{ id: 1, name: "hhh" }], //QA
      sceneList: [{ id: 1, name: "hhh" }], //多轮对话
      KGList: [{ id: 1, name: "hhh" }], //知识图谱
      vocabularyList: [{ id: 1, name: "hhh" }], //词表

      //以下是ui控制域
      deleteAgent: false,

      newAgent: false,
      newAgentMountQA: false,
      newAgentMountKG: false,
      newAgentMountWD: false,
      newAgentMountScene: false,

      changeAgent: false,
      changeAgentMountQA: false,
      changeAgentMountKG: false,
      changeAgentMountWD: false,
      changeAgentMountScene: false
    };
  },
  created() {
    this.onSearchAgent(null);
  },
  methods: {
    /*
     * 搜索 agent
     */
    onSearchAgent(e) {
      console.log(this.searchAgentName);
      this.axios
        .get("/agent/getlist", {
          params: {
            adminID: 1, //TODO 因为登录业务没有完成,这里需要当前登录的管理员的id
            agentName: this.searchAgentName
          }
        })
        .then(resp => {
          this.agentList = resp.data.data;
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
          return it.agentId === this.currentAgentId;
        });
        if (agent != null) {
          this.currentInfo.id = agent.agentId;
          this.currentInfo.name = agent.agentName;
          this.currentAgentCreateTime = new Date(agent.agentCreateTime).toLocaleDateString();
        }
      }

      //2.查询挂载信息
      this.axios
        .get("/aiie/getModels", {
          params: {
            agentId: this.currentAgentId
          }
        })
        .then(resp => {
          let data = resp.data.data;
          this.handleAgent(data);
        })
        .catch(err => {
          console.log(err);
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
    /*
     * 保存model信息,并写入changeAgent以供修改
     * data: models of agent
     */
    handleAgent(data) {
      function mapModelType2Name(modelType) {
        let m = {
          "0": "QA",
          "1": "多轮对话",
          "2": "知识图谱",
          "3": "知识库"
        };
        return m[modelType];
      }
      let save2currentAgnet = (type, model) => {
        switch (type) {
          case 0:
            //QA
            this.currentInfo.qaid.push(model);
            break;
          case 1:
            //多轮对话
            this.currentInfo.sceneid.push(model);
            break;
          case 2:
            //知识图谱
            this.currentInfo.kgid.push(model);
            break;
          case 3:
            //词表
            this.currentInfo.vocabularyid.push(model);
            break;
          default:
            break;
        }
      };
      this.currentInfo.qaid = [];
      this.currentInfo.sceneid = [];
      this.currentInfo.kgid = [];
      this.currentInfo.vocabularyid = [];
      console.log(this.currentInfo);
      this.currentAgentModels = Object.values(data).map(function(it) {
        let model = {
          id: it.modelId,
          name: it.modeData
        };
        save2currentAgnet(it.modeType, model);
        return {
          modelId: it.modelId,
          modeType: mapModelType2Name(it.modeType),
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
            agentDatabase: JSON.stringify({
              agentName: this.newInfo.name,
              QA: this.newInfo.qaid.join(","),
              scene: this.newInfo.sceneid.join(","),
              voc: this.newInfo.vocabularyid.join(","),
              kg: this.newInfo.kgid.join(",")
            })
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
            agentID: this.currentAgentId,
            agentDatabase: JSON.stringify({
              agentName: this.newInfo.name,
              QA: this.newInfo.qaid.join(","),
              scene: this.newInfo.sceneid.join(","),
              voc: this.newInfo.vocabularyid.join(","),
              kg: this.newInfo.kgid.join(",")
            })
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
            agentID: this.currentAgentId
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
