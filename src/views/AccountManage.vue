<template>
    <div class="dialoguestatistics">
        <div class="panel">          
            <el-row class="el-header">
                <el-col :span="8">
                    <el-breadcrumb separator="/" >
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>系统设置</el-breadcrumb-item>
                        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>                
                <el-col :span="6" >
                    <el-button @click="routerTo('/dashboard')" type="text">返回主页</el-button>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <div class="title">个人信息</div>
                    <el-row>
                        <el-col :span="12">
                            <div class="info">
                                <div>账号ID：</div>
                                <div>创建日期：</div>
                                <br>
                                <br>
                                <div>用户昵称：</div>
                                <div>登录密码：</div>
                                <div>手机号：</div>
                                <div>电子邮箱：</div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="title"> </div>
                            <div class="info">
                                <div>1270018000</div>
                                <div>1900-01-01</div>
                                <br>
                                <br>
                                <div>哈喽沃德</div>
                                <div>**********</div>
                                <div>18600000000</div>
                                <div>XX@example.com</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-button type="primary" icon="el-icon"  @click="updateinfo" style="margin-top: 50px">修改信息</el-button>
                </el-col>
                <el-col :span="12">
                    <div class="userimg">
                        <img src="https://img.xiaopiu.com/userImages/img7159694579f0.jpeg" alt="">
                    </div>
                    <el-button type="primary" icon="el-icon"  @click="updateimg">上传头像</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.el-header{
  text-align: right; 
  font-size: 18px;
  padding: 20px
}
    .panel {
        margin: 0 auto;
        margin-top: 50px;
        width: 1200px;
        height: 750px;
        background-color: #fff;
        padding: 10px;
        padding-top: 20px;
        box-shadow: 0 1px 2px 0 rgba(31, 45, 61, 0.1);
        border-radius: 4px;
        box-sizing: border-box;
        position: relative;
    }
    .title{
        font-size: 30px;
        font-weight: bold;
        margin-top: 20px;
    }

    .info {
        margin-top: 50px;
        font-size: 30px;
        line-height: 50px;
    }
    div .userimg img{
        width: 200px;
        height: 200px;
        margin-top: 100px;
        margin-bottom: 50px;
    }
</style>