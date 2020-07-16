<template>
<div id="indexpage">
    <div>
        <div>
            <div class="home_bg">
                <img src="../../src/assets/back.png" alt="">
                <div class="title1">
                    <p>智能问答系统</p>
                </div>
                 
                <div class="title2">
                  <i class="el-icon-cloudy" style="font-size: 25px; color:white; margin-left:570px" > 无需机器学习专业知识，全流程可视化便捷操作</i>
                </div>
                <div class="btn1">
                    <el-button type="primary" style="font-size: 35px; margin-top: 70px" @click="routerTologin" round>登 录</el-button>
                </div>
            </div>
        </div>
      

 <div class="container home_bar">               
   <el-row :gutter="20">
  
     <el-col :span="8" >
       <el-card :body-style="{ padding: '70px' }">
        <img src="../../src/assets/1.png" class="image">
          <div style="padding: 14px;">
            <div class="ziti1">
                        <p>核心技术</p>
                    </div>
                    <div class="ziti2">
                        <p>拥有丰富的经验积累和专业核心技术，为精准和深度的智能问答提供坚实基础</p>
                    </div>
                  </div>
               </el-card>
              </el-col>

         <el-col  :span="8" :offset="0">
             <el-card :body-style="{ padding: '70px' }">
               <img src="../../src/assets/2.png" class="image">
                 <div style="padding: 14px;">
                  <div class="ziti1">
                        <p>应有尽有</p>
                    </div>
                     <div class="ziti2">
                        <p>一站式解决不同场景下的对话模型训练需求，全流程可视化操作，轻松实现智能对话机器学习模型</p>
                     </div>
                  </div>
               </el-card>
           </el-col>

   <el-col :span="8" :offset="0" >
    <el-card :body-style="{ padding: '70px' }">
     <img src="../../src/assets/3.png" class="image">
      <div style="padding: 14px;">
        <div class="ziti1">
                        <p>行业领先</p>
                    </div>
                    <div class="ziti2">
                        <p>强大的机器学习模型，结合多场景的文本语料，将智能问答的准确度提升到行业领先水平</p>
                    </div>
                 </div>
                </el-card>
             </el-col>

          </el-row>    
    </div>

 </div>
 </div>
</template>

<script>
    export default {
        name: "IndexPage",
methods:{
  routerTologin(){
   this.$router.push({ path:'/login'});
  }
 }

        
    }
</script>

<style scoped>

    .home_bg{
        width: 100%;
    }
    .home_bg img {
        width: 100%;
        margin-left: -2px;
        margin-top: -203px;
    }
    .title1 {
        position: absolute;
        top: 200px;
        width: 100%;
    }
    .title1 p {
        font-size: 110px;
        color: rgba(255, 255, 255, 1);
        line-height: 90%;
        text-align: center;
        font-weight: 700;
        font-style: italic;
        top: 50%;
        transform: translateY(-50%);
        transform-origin: 0 center;
    }

 

    .title2 {
        position: absolute;
        top: 400px;
        width: 100%;
    }
    .title2 p {
        margin-left:120px;
        font-size: 20px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
    }
    div .btn1{
        position: absolute;
        top: 500px;
        width: 100%;
        text-align: center;
    }

    div .btn1 button {
        width: 200px;
    }
    .home_bar {
        margin-top: 200px;
    }
    .ziti1 p{
        color: #505050;
        text-align: center;
        word-break: normal;
        line-height: 70%;
        outline: 0;
        font-size:30px;
    }

    .ziti2 p{
        color: #505050;
        font-size: 20px;
        text-align: center;
        word-break: normal;
        line-height: 150%;
        outline: 0;
    }

.el-card{
  margin-left: 30px;
  margin-right: 30px;
  height: 400px;
  margin-top: -200px;
  
}

.image{
  margin-top: -10px;

      margin-left: 120px;
 width: 30%;
height: 30%;
}
</style>