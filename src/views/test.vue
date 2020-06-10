<template>
<div>  
    <el-button type="primary" @click="hello">hello</el-button>
    <el-dialog :visible.sync="ifvisible">获取结果: {{info}}
        <li v-for="value in vocabulary" :key="value.id">
            {{ value.name }}
        </li>
    </el-dialog>
    <el-button type="primary" @click="getVocabulary">getVocabulary</el-button>

    <el-radio-group v-model="vocabularyid" @change="getWordInfo">
     <el-radio v-for="value in vocabulary" :key="value.id" :label="value.id"> 
        {{value.name}}
     </el-radio>
    </el-radio-group>

            <el-input placeholder="请输入关键词在此搜索" v-model="searchText" size="small" clearable>                            
                        <el-button slot="prepend" >关键词</el-button>
                        </el-input>  

</div>
</template>

<script>
export default {
    data(){
        return{           
            ifvisible:false,
            info :'',
            vocabulary:[],
            vocabularyid :0,
            searchText :''
        }
    },
    mounted(){
        this.axios.post('/view',{
                moduleID : "sensitiveWords"
                // moduleID : "terminology"
            })
            .then(resp=>{
                this.vocabulary = JSON.parse(resp.data.data);
                Object.freeze(vocabulary)
            }).catch(err=>{
            });
    },
    methods:{
        hello(){
            this.getinfo = true ;
            this.axios.post('/viewtest')
                .then(resp=>{
                    this.info = resp.data;
                    this.ifvisible = true;
                }).catch(err=>{
                });
        },
        //获取词表信息
        getVocabulary(){
            this.getinfo = true ;
            this.axios.post('/view',{
                    moduleID : "sensitiveWords"
                   // moduleID : "terminology"
                })
                .then(resp=>{
                    this.info = resp.data.data;
                    this.ifvisible = true;
                }).catch(err=>{
                });
        },
        //获取
        getWordInfo(){
            console.log("选中" + this.vocabularyid);
        }
    },
    watch: {
    info (val) {
      debugger
      console.log('val:', val)
    }
}
}
</script>

