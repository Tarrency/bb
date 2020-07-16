<template>
<div id="login">
  <div class="login_container">
      <div class="home_bg">
     <img src="../../src/assets/back.png" alt="">
<div class="login_box">
  <div class="login_form">
   <el-form ref="loginFormref" :model="loginFormref" :rules="loginFormrules">
     <div class="title-container">
        <h3 class="title">对话系统</h3>
      </div>
  <el-form-item prop="username">
    <el-input v-model="loginFormref.username" prefix-icon="el-icon-user"></el-input>
  </el-form-item>
  <el-form-item prop="password">
    <el-input v-model="loginFormref.password" prefix-icon="el-icon-lock" type="password"></el-input>
  </el-form-item>
  
  <el-form-item class="btns">
    <el-button type="primary" @click="logintodashboard()"><p>登 录</p></el-button>
 
  </el-form-item>
  </el-form>
  </div>
  </div>
  </div>
  </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
    loginFormref: {
       username:'wangxijie',
       password:'123456'
    },
    responseResult: [],
    loginFormrules:{
      username:[{ required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
      password:[{ required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }],
    },
  
    };
  },
  methods: {
  logintodashboard() {
     this.$refs.loginFormref.validate((valid) => {
      console.log(valid);
      var _this = this
  console.log(this.$store.state);
      this.axios.post('/login', {
            username: this.loginFormref.username,
            password: this.loginFormref.password,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
               _this.$store.commit('login', _this.loginFormref)
        var path = this.$route.query.redirect
        this.$router.replace({path: path === '/' || path === undefined ? '/dashboard' : path})
     

            }
            else if(successResponse.data.code === 400){
              this.$message.error('用户信息不匹配');
            }
          })
          .catch(failResponse => {
          })

         
    });
    }
  }
};
</script>

<style>
.login_container {
  height: 100%;
}
.login_box{
  width:475px;
  height: 375px;
  background-color: rgb(251, 250, 252);
  border-radius:3px;
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
}
.login_form{
  position: absolute;
  top: 50px;
  bottom:10px;
  width: 100%;
  padding:0 50px;
  box-sizing:border-box;
}
.btns button{
  margin-top: 20px;
 display: flex;
  width: 100%;
  height: 50px;
  justify-content: center;
  margin-bottom:0px;

}
.btns p{
  display: block;
  font-size: 20px;
  text-align: center;
 margin:0 auto;


  
 
}
.title {
      font-size: 26px;
      color: black;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
     .home_bg{
        width: 100%;
        height: 100%
    }
    .home_bg img {
        width: 100%;
        height: 100%
    }

</style>