<template>
   <el-container>
        <div>
        <link rel="stylesheet" href="./src/assets/css/semantic.css">
        <div id="dashboardpage" class="ui inverted blue segment">
            <h1>用户组件</h1>
            <p>我是一个网站用户</p>
            <div class="ui divider"></div>
            <div class="ui grid">
                <div class="eight wide column">
                    <div class="ui segment inverted orange">
                        <h1>用户展示</h1>
                        <p>一些信息</p>
                    </div>
                </div>
                <div class="eight wide column">
                    <div class="ui segment inverted orange">
                        <h1>用户展示</h1>
                        <p>一些信息</p>
                    </div>
                </div>
            </div>
            <!-- <el-row :span="24">
                <el-col :span="8">
                    <div id="visit"></div>
                </el-col>
                <el-col :span="8">
                    <div id="precision"></div>
                </el-col>
                <el-col :span="8">
                    <div id="interest"></div>
                </el-col>
            </el-row>
            <el-row :span="24">
                <el-col :span="8">
                    <div id="hotSpot"></div>
                </el-col>
                <el-col :span="8">
                    <div id="distribution"></div>
                </el-col>
                <el-col :span="8">
                    <div id="addWord"></div>
                </el-col>
            </el-row> -->
            <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
        </div>
    </div>
   </el-container>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "DashBoardPage",
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        mounted() {
            this.drawLine();
        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: {text: '在Vue中使用echarts'},
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            }
        }
    }
</script>

<style scoped>

</style>