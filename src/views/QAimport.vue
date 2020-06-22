<template>
<div>
    <el-container>
    
        <el-container>
            <el-header>
                <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>QA知识管理</el-breadcrumb-item>
                <el-breadcrumb-item>批量导入</el-breadcrumb-item>
                </el-breadcrumb>
               
            </el-header>
            <el-main style="line-height:80px">
                <!-- 主要内容区 -->
                <div>
                    <el-row>
                        <el-col :offset="6">
                            <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
                        </el-upload>
                        </el-col>
                    </el-row>
                <el-row> 
                    <!-- 单词表格 -->
                    <el-table :data="WordTable"  ref="refWordTable" @selection-change="handleSelectionChange" >
                        <el-table-column  type="selection"  width="55"  label="全选">
                        </el-table-column>
                        <el-table-column    prop="id"    label="id">
                        </el-table-column>
                        <el-table-column    prop="word"    label="问题">
                            <template slot-scope="scope"  >
                               <span v-if="!scope.row.edit"> {{scope.row.word}}</span>
                               <el-input  v-model="WordsModify" v-else>
                                    <template slot="append">
                                        <el-button @click="modifyWord(scope.$index,scope.row)"> 提交</el-button>
                                    </template>
                               </el-input>
                            </template>                                        
                        </el-table-column> 
                        <el-table-column    prop="answer"    label="回答">
                            <template slot-scope="scope"  >
                               <span v-if="!scope.row.edit"> {{scope.row.word}}</span>
                            </template>                                        
                        </el-table-column> 
                        <el-table-column    prop="answer"    label="类型">
                            <template slot-scope="scope"  >
                               <span v-if="!scope.row.edit"> {{scope.row.word}}</span>
                            </template>                                        
                        </el-table-column> 
                        <el-table-column    prop="word_update_time"  label="更新时间">
                            <template slot-scope="scope"> {{scope.row.word_update_time| dateFormat}}</template>
                        </el-table-column> 
                        <el-table-column    prop="action"    label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini"  @click="modifyWordBtn(scope.$index, scope.row)">编辑</el-button>
                                <el-button size="mini" type="danger" @click="deleteWordBtn(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>

                <el-row>
                    <el-col :span="12" style="float:right;text-align:right">
                        <el-button style="folat:right" type="primary" size="small">导入</el-button>
                         <el-button style="folat:right" type="danger" plain size="small" @click="deleteWordBtn()">删除</el-button>
                        <el-button style="folat:right" type="primary" size="small" @click="back">返回</el-button>
                    </el-col>
                </el-row>
                </div>

                <!-- 弹出窗口 -->
                <!--新增按钮-->
                <el-dialog title="新增问题" :visible.sync="VisibleAddWord" class="dialog">  
                    <el-form>
                        <el-form-item label="所属问答库：" >
                            <nobr v-for="v in vocabulary" v-show="v.id == vocabularyid" :key="v.id">{{v.name}}</nobr>
                        </el-form-item>
                        <el-form-item label="新增问题:" >
                            <el-button type="primary" @click="addinput">继续添加</el-button>                               
                        </el-form-item>
                        <el-form-item>
                            <el-col :span="24" v-for="(word,index) in inputNewWords" :key="index">
                                <el-row :gutter="20" class="margins">
                                    <el-col :span="14">
                                        <el-input v-model="inputNewWords[index]" autocomplete="off" ></el-input>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-button type="danger" plain @click="delinput(index)">删除</el-button>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addWord">确定</el-button>
                        <el-button  @click="VisibleAddWord = false" >取消</el-button> 
                    </el-form-item>
                    </el-form>      
                </el-dialog> 
                <!--删除按钮-->
                <el-dialog title="删除单词" :visible.sync="VisibleDelWord"  style="width:50%;text-align:center">
                    删除不可恢复，您确定要删除问题{{ShowinfoSeleted}}<br/>
                    <el-button style="folat:right" type="primary" @click="deleteWords">确定</el-button>
                     <el-button style="folat:right" @click="VisibleDelWord = false" >取消</el-button>                               
                </el-dialog>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>
let moment = require("moment");
export default {
    data(){
        return{
            vocabulary : [{id:0,name:''}] , //词表列表
            vocabularyid :0, //选中词表
            searchText : '', //搜素关键词
            WordTable : [] ,//词汇列表
            VisibleNewDialog :false,
            VisibleDelDialog :false,
            VisibleAddWord :false,
            vcbform: { name : ''} ,//新增词汇列表
            inputNewWords :[""],
            VisibleDelWord : false,
            WordsModify : '', //要
            RowSeleted : [], //当前选中行
            IdSeleted :[], //当前选中id集合
            ShowinfoSeleted : [],//当前选中单词集合
            selectAllBtn : '全选',
        };
    },
    mounted(){
        this.getVcabularyInfo()
    },
    methods:{
        //获取词表名称id
        getVcabularyInfo(){
        this.axios.get('/vocabulary/getlist',{params:{
                type: 0}
                // 0:专用词，1：敏感词
            })
            .then(resp=>{
                this.vocabulary =resp.data.data;
            }).catch(err=>{
            });
        },
        //获取词语列表
        getWordInfo(){         
            this.axios.get('/vocabulary/search',{params:{
                    id : this.vocabularyid,
                    key : this.searchText}
                }).then(resp=>{
                        this.WordTable = resp.data.data
                        this.WordTable.edit = false
                }).catch(err=>{
                        console.log('请求失败:'+err.status+','+err.statusText);
                });
        },
        //新增词表  
        newVocaburaly(){
            
            this.axios.post('/vocabulary/addnew?name='+this.vcbform.name+'&type=0'           
                    //name: this.vcbform.name,
                    //type : 0 // 0:专用词，1：敏感词
                ).then( 
                    this.getVcabularyInfo,
                    this.VisibleNewDialog = false
                )
                .catch(err=>{
                        console.log('请求失败:'+err.status+','+err.statusText);
                });
        },
        //检查需要先选中词表的操作
        checkVocaburalyId (){
            if(this.vocabularyid > 0){
                return true
            }else{
                this.$msgbox({
                    type: 'warning',
                    message: '请先选择词表'
                })
                return false
            }
        },

        //删除词表
        delVocaburaly(){
                this.axios.delete('/vocabulary/delete?id='+this.vocabularyid
                ).then(
                    this.getVcabularyInfo,
                    this.VisibleDelDialog = false
                )
                .catch(err=>{
                        console.log('请求失败:'+err.status+','+err.statusText);
                });
        },
        //新增词汇
        addWord(){
            this.axios.post('/vocabulary/addword?id='+this.vocabularyid
                    +"&words="+this.inputNewWords
                   // id : this.vocabularyid,
                   // words : this.inputNewWords
                ).then( data=>{
                    this.VisibleAddWord = false,
                    this.inputNewWords = [""],
                    this.getWordInfo()
                }).catch(err=>{
                        console.log('请求失败:'+err.status+','+err.statusText);
                });
                
            this.getWordInfo()
            //getWordInfo
        },
        addinput(){
                    let cope = "";
                    this.inputNewWords.push(cope);
        },
        delinput(index) {
                    this.inputNewWords.splice(index, 1);
                },
        handleSelectionChange(val) {
            //val 为选中数据的集合
                this.RowSeleted = val;
            },
        //修改词汇
        modifyWordBtn(index,row){
            this.WordsModify="";
            row.edit = !row.edit ;
            this.$set(this.WordTable,index,this.WordTable[index]);//重新加载本行数据
        },
        modifyWord(index,row){
            console.log('修改单词',row.id,':',this.WordsModify)
            this.axios.post('/vocabulary/modify',{
                    wordID : row.id,
                    newWord : this.WordsModify
                }).then(
                    row.edit = !row.edit ,
                    row.word = this.WordsModify,
                    this.WordsModify = ""
                )
                .catch(err=>{
                        console.log('请求失败:'+err.status+','+err.statusText);
                });
            this.$set(this.WordTable,index,this.WordTable[index])//重新加载本行数据
        },
        //删除词汇
        deleteWordBtn(row){ 
            console.log('row',row)
            if(row == null) {
                this.IdSeleted=[]
                this.ShowinfoSeleted=[]
                this.RowSeleted.forEach((item,index)=>{
                    this.IdSeleted=this.IdSeleted.concat(item.word_id)
                    this.ShowinfoSeleted = this.ShowinfoSeleted.concat(item.word)
                    this.ShowinfoSeleted.slice(-1)
                })
            }else{
                this.ShowinfoSeleted = '"'+row.word+'"'
                this.IdSeleted.push(row.id)
            }
            console.log('删除单词',this.IdSeleted)
            this.VisibleDelWord = true
        },
        deleteWords(){ 
            this.axios.delete('./vocabulary/deleteWords?wordIDs='
                            +this.IdSeleted.join(','),         
            ).then( data =>{
                this.RowSeleted = []
                this.IdSeleted = []
                this.ShowinfoSeleted = ""
                this.getWordInfo()
            }).catch(err=>{
                    console.log('请求失败:'+err.status+','+err.statusText);
            });            
            this.VisibleDelWord = false
        },
        //全选词汇
        selectAll(rows){
            if(this.selectAllBtn.startsWith('全选')){
                rows.forEach(row => {
                    this.$refs.refWordTable.toggleRowSelection(row, true)
                }) 
                this.selectAllBtn='取消全选'
            }else{
                rows.forEach(row => {
                    this.$refs.refWordTable.toggleRowSelection(row, false)
                }) 
                this.selectAllBtn='全选'
            }
            
        },
        testinput(){
            console.log('输入'+this.searchText)
        },

        input(a){
            this.searchText=a
           
        },
        back(){
            this.$router.push('/QAmanager')
        },

        //导出
        getExcel(res) {
            require.ensure([], () => {
                const { export_json_to_excel } = require('../excel/Export2Excel.js')
                const tHeader = ['id', '问题','更新时间']  
                const filterVal = ['word_id', 'word','update_time']
                const list =  this.RowSeleted
                const data = this.formatJson(filterVal, list)
                export_json_to_excel(tHeader, data, '导出列表名称')
            })
        },
        //require后面加相对路径用于引入本地模块或json文件
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
    }
}
</script>

<style scoped>
.el-header{
  text-align: right; 
  font-size: 18px;
  padding: 20px
}
.el-main{
  border:solid darkgray 1px;
}


.dialog {
    width:50%;
    text-align:center;
    float: center;
}


</style scoped>