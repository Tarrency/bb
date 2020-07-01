<template>
  <div id="userInfo">
    <el-container>
      <el-header>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="12">
            <div class="title">个人信息</div>
            <!-- <el-row> -->
            <!-- <el-col :span="4" style="margin:10px">
              <template>账号ID：{{id}}</template>
            </el-col>-->
            <!-- <el-col :span="12">
                <div class="info">
                <div>账号ID：</div>
                <div>创建日期：</div>
                <br />
                <br />
                <div>用户昵称：</div>
                <div>登录密码：</div>
                <div>手机号：</div>
                <div>电子邮箱：</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="title"></div>
              <div class="info">
                <div>1270018000</div>
                <div>1900-01-01</div>
                <br />
                <br />
                <div>哈喽沃德</div>
                <div>**********</div>
                <div>18600000000</div>
                <div>XX@example.com</div>
            </div>-->
            <!-- </el-col> -->
            <!-- </el-row> -->
            <!-- <el-row>
            <el-col :span="4">
              <span>创建日期：</span>
            </el-col>
            <el-col :span="6">{{dateFormat}}</el-col>
            </el-row>-->
            <el-row>
              <el-form label-width="80px" :model="information" style="margin:40px 0;">
                  <el-form-item label="账号id：">
                    <template>{{id}}</template>
                  </el-form-item>
                  <el-form-item label="创建日期:">
                    <template>{{createDate}}</template>
                  </el-form-item>
                  <el-form-item label="用户名称:">
                    <el-input v-model="information.name" v-bind:disabled="isDisabled"></el-input>
                  </el-form-item>
                  <el-form-item label="登录密码:">
                    <el-input v-model="information.code" v-bind:disabled="isDisabled"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号:">
                    <el-input v-model="information.phone" v-bind:disabled="isDisabled"></el-input>
                  </el-form-item>
                  <el-form-item label="电子邮箱:">
                    <el-input v-model="information.email" v-bind:disabled="isDisabled"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="el-icon" @click="updateinfo">修改信息</el-button>
                    <el-button type="primary" icon="el-icon" @click="save">保存</el-button>
                  </el-form-item>
                </el-form>
            </el-row>
          </el-col>
          <el-col :span="8">
            <!--  <div class="userimg">
            <img src="https://img.xiaopiu.com/userImages/img7159694579f0.jpeg" alt />
          </div>
            <el-button type="primary" icon="el-icon" @click="updateimg">上传头像</el-button>-->
            <div>
              <el-row>
                <el-upload
                  class="avatar-uploader"
                  action="后台接口地址"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :on-remove="handleRemove"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <span v-if="imageUrl" class="el-upload-action" @click.stop="handleRemove()">
                    <i class="el-icon-delete"></i>
                  </span>
                  <i v-else class="el-icon-upload2 avatar-uploader-icon" stop></i>
                </el-upload>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-button @click="routerTo('/dashboard')" type="text">返回主页</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "https://img.xiaopiu.com/userImages/img7159694579f0.jpeg",
      id: "123456",
      createDate: "1999-9-9",
      information: {
        name: "哈喽沃德",
        code: "9999",
        phone: "8888",
        email: "6666"
      },
      isDisabled:true,
    };
  },
  methods: {
    //上传头像
    // 移除图片
    routerTo(a) {
      this.$router.push(a);
    },
    handleRemove() {
      this.imageUrl = "";
    },
    // 上传成功回调
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data.url;
    },
    // 上传前格式和图片大小限制
    beforeAvatarUpload(file) {
      const type =
        file.type === "image/jpeg" ||
        "image/jpg" ||
        "image/webp" ||
        "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!type) {
        this.$message.error("图片格式不正确!(只能包含jpg，png，webp，JPEG)");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return type && isLt2M;
    },
    //修改保存信息
    updateinfo() {
       this.isDisabled=false
    },
    save() {
      this.axios
        .post("/aaa", {
          information: {
            name: "",
            code: "",
            phone: "",
            email: ""
          }
        })
        .then(this.isDisabled=true)
        .catch(err => {
          console.log("请求失败:" + err.status + "," + err.statusText);
        });
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
.title {
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
}

.info {
  margin-top: 50px;
  font-size: 30px;
  line-height: 50px;
}

.avatar-uploader {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 50px 200px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  /* background: url('https://img.xiaopiu.com/userImages/img7159694579f0.jpeg') no-repeat; */
  background-size: 100% 100%;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  position: relative;
  width: 120px;
  height: 120px;
  display: block;
}
.el-upload-action {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  font-size: 0;
  color: #fff;
  text-align: center;
  line-height: 120px;
}
.el-upload-action:hover {
  font-size: 20px;
  background-color: #000;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>