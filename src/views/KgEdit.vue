<template>
  <div>
    <el-container>
      <el-header>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>知识图谱管理</el-breadcrumb-item>
          <el-breadcrumb-item>知识图谱浏览编辑</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main style="line-height:80px">
        <!-- <el-main> -->
        <div>
          <el-row>
            <el-col :span="9">
              <el-input size="small" placeholder="请输入内容" v-model.trim="inputKey">
                <template slot="prepend">按节点查询</template>
              </el-input>
            </el-col>
            <el-col :span="9">
              <el-select size="small" v-model="value" placeholder="请选择数据库">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" size="small" @click="testinput">查询</el-button>
              <el-button size="small" @click="reset">取消</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div id="test" :style="{width: '300px', height: '300px'}"></div>
              <div class="kg" id="kg_show" :style="{width: '300px', height: '300px'}">这是一个图</div>
            </el-col>
          </el-row>
          <!-- 单词表格 -->
          <el-row>
            <el-row style="line-height:20px;">
              <el-col :span="4" :offset="11">节点列表</el-col>
            </el-row>
            <el-row>
              <el-table :data="NodeList" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" label="全选"></el-table-column>
                <el-table-column prop="id" label="id"></el-table-column>
                <el-table-column prop="type" label="类型">
                  <template slot-scope="scope">
                    <span v-if="!scope.row.edit">{{scope.row.type}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="名称">
                  <template slot-scope="scope">
                    <span v-if="!scope.row.edit">{{scope.row.name}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row :span="8" style="float:right;text-align:right">
              <el-button type="primary" size="small" @click="detail">查看详情</el-button>
            </el-row>
          </el-row>
          <el-row>
            <div v-show="VisibleType">
              <el-row style="line-height:20px">
                <el-col :span="4" :offset="11">节点类型</el-col>
              </el-row>
              <el-row>
                <el-table :data="NodeType">
                  <el-table-column prop="property" label="属性">
                    <template slot-scope="scope">
                      <span v-if="!scope.row.edit">{{scope.row.property}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="content" label="内容">
                    <template slot-scope="scope">
                      <span v-if="!scope.row.edit">{{scope.row.content}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
              <el-row>
                <el-col :span="8" style="float:right;text-align:right">
                  <el-button type="primary" size="small" @click="clear">清空</el-button>
                  <el-button type="primary" size="small" @click="rebuild">新建</el-button>
                </el-col>
              </el-row>
            </div>
          </el-row>
          <el-row>
            <div v-show="VisibleRelation">
              <el-row style="line-height:20px">
                <el-col :span="4" :offset="11">关联节点</el-col>
              </el-row>
              <el-row>
                <el-table :data="relatives">
                  <el-table-column prop="relation" label="关系">
                    <template slot-scope="scope">
                      <span v-if="!scope.row.edit">{{scope.row.relation}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ids" label="id"></el-table-column>
                  <el-table-column prop="names" label="名称">
                    <template slot-scope="scope">
                      <span v-if="!scope.row.edit">{{scope.row.names}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
              <el-row>
                <el-col :span="8" style="float:right;text-align:right">
                  <el-button type="primary" size="small" @click="modify">修改</el-button>
                  <el-button type="primary" size="small" @click="remove">删除</el-button>
                </el-col>
              </el-row>
            </div>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      options: [],
      NodeList: [],
      NodeType: [],
      relatives: [],
      VisibleType: false,
      VisibleRelation: false,
      inputKey: "", //搜索关键词
      value: [""] //选择数据库
    };
  },
  mounted() {
    this.drawkg();
    this.drawTest();
  },
  methods: {
    detail() {
      this.VisibleType = true;
      this.VisibleRelation = true;
    },
    drawTest() {
      let test = this.$echarts.init(document.getElementById("test"));
      test.setOption({
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    drawkg() {
      this.axios
        .get("/aaa")
        .then(res => {
          this.draw(res);
        })
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });
    },
    draw(webkitDep) {
      let myChart = this.$echarts.init(document.getElementById("kg_show"));
      myChart.setOption({
        legend: [
          {
            x: "left", //图例位置
            //data:['人物', '组织', '科技产品', '工程', '称号', '荣誉',
            //    '品牌', '业务', '事件', '技术', '其他']     //关系图中需要与series中的categories的name保持一致
            data: webkitDep.legend_data
          }
        ],
        series: [
          {
            type: "graph",
            layout: "force",
            animation: false,
            label: {
              position: "right",
              formatter: "{b}"
            },
            label: {
              show: true
            },
            draggable: true, //指示节点是否可以拖动
            data: webkitDep.nodes.map(function(node, idx) {
              node.id = idx;
              return node;
            }),
            categories: webkitDep.categories,
            force: {
              edgeLength: 80,
              repulsion: 1500,
              gravity: 0.2
            },
            edges: webkitDep.links,
            edgeLabel: {
              //线条的边缘标签
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12,
                  color: "#000000"
                },
                formatter: function(param) {
                  // 标签内容
                  console.log(param);
                  return param.data.name;
                }
              }
            },
            roam: true,
            lineStyle: {
              normal: {
                show: true,
                width: 2,
                color: "source", //决定边的颜色是与起点相同还是与终点相同
                curveness: 0.1 //边的曲度，支持从 0 到 1 的值，值越大曲度越大。
              }
            },
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [5, 12], //边两端的标记大小
            symbolSize: 30 //节点大小
          }
        ]
      });
    },
    //查询
    testinput() {},
    //取消重置
    reset() {},
    handleSelectionChange(val) {
      //val 为选中数据的集合
      this.RowSeleted = val;
    },
    //节点类型清空
    clear() {},
    //节点类型新建
    rebuild() {},
    //关联节点修改
    modify() {},
    //关联节点清除
    remove() {}
  }
};
// var myChart = echarts.init(document.getElementById("kg_show"));
// myChart.showLoading();
// $.get("/kg", function(webkitDep) {
//   console.log(webkitDep);
//   myChart.hideLoading();
//   option = {
//     legend: [
//       {
//         x: "left", //图例位置
//         //data:['人物', '组织', '科技产品', '工程', '称号', '荣誉',
//         //    '品牌', '业务', '事件', '技术', '其他']     //关系图中需要与series中的categories的name保持一致
//         data: webkitDep.legend_data
//       }
//     ],
//     series: [
//       {
//         type: "graph",
//         layout: "force",
//         animation: false,
//         label: {
//           position: "right",
//           formatter: "{b}"
//         },
//         label: {
//           show: true
//         },
//         draggable: true, //指示节点是否可以拖动
//         data: webkitDep.nodes.map(function(node, idx) {
//           node.id = idx;
//           return node;
//         }),
//         categories: webkitDep.categories,
//         force: {
//           edgeLength: 80,
//           repulsion: 1500,
//           gravity: 0.2
//         },
//         edges: webkitDep.links,
//         edgeLabel: {
//           //线条的边缘标签
//           normal: {
//             show: true,
//             textStyle: {
//               fontSize: 12,
//               color: "#000000"
//             },
//             formatter: function(param) {
//               // 标签内容
//               console.log(param);
//               return param.data.name;
//             }
//           }
//         },
//         roam: true,
//         lineStyle: {
//           normal: {
//             show: true,
//             width: 2,
//             color: "source", //决定边的颜色是与起点相同还是与终点相同
//             curveness: 0.1 //边的曲度，支持从 0 到 1 的值，值越大曲度越大。
//           }
//         },
//         edgeSymbol: ["circle", "arrow"],
//         edgeSymbolSize: [5, 12], //边两端的标记大小
//         symbolSize: 30 //节点大小
//       }
//     ]
//   };
//   myChart.setOption(option);
// });
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
.kg {
  position: absolute;
  /*left: 25%;*/
  height: 100%;
  width: 100%;
  background: #ffffff;
  white-space: pre-wrap;
}
</style scoped>