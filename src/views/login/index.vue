<template>
  <div class="login-page">
    <div class="login-box">
      <el-form label-width="80px" :model="loginForm">
        <el-form-item>
          <p class="login-title">后台管理系统</p>
        </el-form-item>
        <el-form-item>
          <i class="el-icon-user"></i>
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item >
          <i class="el-icon-unlock"></i>
          <el-input v-model="loginForm.password" type="password" @keyup.enter.native="submitLogin(loginForm)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLogin(loginForm)">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
  import {Login} from '@/api/api.js'
    export default {

        data(){
          return{
              loginForm:{

              }
          }
        },
        computed:{

        },
        methods:{
            submitLogin(params){
                Login(params).then(res=>{
                    localStorage.setItem("token",res.token)
                }).catch(err=>{console.log(err)})

            }
        },
        components:{
        }
    };
</script>


<style>
  .login-page{
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .login-box{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 60%;
    max-width: 500px;
    transform: translate(-50%,-50%);
  }
 .login-page .el-button{
   width: 100%;
   font-size: 18px;
 }
  .login-box {
    padding-top: 30px;
    padding-bottom: 30px;
    padding-right: 80px;
    box-shadow: 0 0 20px #cccccc;
  }
  .login-title{
    text-align: center;
    font-size: 28px;
  }

  /*重置element组件样式*/
  .login-box .el-input__inner{
    height: 50px;
    line-height: 50px;
    padding-left: 50px;
  }
  .el-form-item{
    position: relative;
  }
  .el-form-item i{
    position: absolute;
    z-index: 99;
    font-size: 26px;
    top: 12px;
    left: 10px;
    color: gray;
  }
</style>

