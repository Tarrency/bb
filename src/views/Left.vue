<template>
<div style="height:100%">
<el-row  style="height:100%">
 <el-col style="height:100%">
    <el-menu
      :default-active="onRoutes"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#ffd04b"
      @open="handleOpen"
      @close="handleClose"
      @click="selectItems"
      router
      style="height:100%;text-align: left;"     
      >            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>


    </el-menu>
  </el-col>
</el-row>
</div>
</template>


<script>
import bus from '../views/bus';
export default {
    data() {
        // 这里貌似可以默认items只有一个系统首页（反正只保留一个陌生人浏览页面）
        // 然后接着用异步获取当前用户的items（如果没有用户信息则不做改变）
        // 异步获取到后再更新items，这样就能够刷新了（为了放置抖动问题，最好第一行就是陌生人页面）
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-menu',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-edit',
                    index: 'QA',
                    title: 'QA知识管理',
                     subs:[
                      {
                            index: 'QAmanager',
                            title: '知识浏览/编辑/导入/导出'
                      }
                    ]
                },
                {
                    icon: 'el-icon-coin',
                    index: 'kg',
                    title: '知识图谱',
                    subs: [
                        {
                            index: 'KgManager',
                            title: '知识图谱导入/导出'
                        },{
                            index: 'KgEdit',
                            title: '知识图谱浏览/编辑'
                        }
                    ]
                },
                {
                    icon: 'el-icon-document',
                    index: 'voc',
                    title: '词表管理',
                    subs:[
                      {
                            index: 'vocabulary',
                            title: '专有词表'
                      },{
                            index: 'SensitiveVocab',
                            title: '敏感词表'
                        
                      }
                    ]
                },
               {
                    icon: 'el-icon-key',
                    index: 'agent',
                    title: 'Agent管理',
                    subs:[
                      {
                            index: 'agent',
                            title: 'Agent状态'
                      },{
                            index: '',
                            title: '测试'
                        
                      }
                    ]
                },
               {
                    icon: 'el-icon-data-line',
                    index: 'data',
                    title: '数据统计',
                    subs:[
                      {
                            index: 'dialogue',
                            title: '对话统计'
                      }
                    ]
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    },methods:{
      selectItems(index){
        this.$items.state.adminleftnavnum=index;
        //按钮选中之后设置当前的index为store里的值。
        }
    }
};
</script>

<style>

.left{
    border-right:0px;
    text-align:right;
    background: #001529;
    width: 5cm;
    background-color:#001529;
}
</style>