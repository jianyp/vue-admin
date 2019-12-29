<template>
  <div>
<!--    <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :router="true">-->
<!--      <el-submenu index="1">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-location"></i>-->
<!--          <span slot="title">导航一</span>-->
<!--        </template>-->
<!--          <el-menu-item index="1-1">选项1</el-menu-item>-->
<!--          <el-menu-item index="1-2">选项2</el-menu-item>-->
<!--          <el-menu-item index="1-3">选项3</el-menu-item>-->
<!--        <el-submenu index="1-4">-->
<!--          <span slot="title">选项4</span>-->
<!--          <el-menu-item index="1-4-1">选项1</el-menu-item>-->
<!--        </el-submenu>-->
<!--      </el-submenu>-->
<!--      <el-menu-item index="2">-->
<!--        <i class="el-icon-menu"></i>-->
<!--        <span slot="title">导航二</span>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="3">-->
<!--        <i class="el-icon-document"></i>-->
<!--        <span slot="title">导航三</span>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="4">-->
<!--        <i class="el-icon-setting"></i>-->
<!--        <span slot="title">导航四</span>-->
<!--      </el-menu-item>-->
<!--    </el-menu >-->

      <!-- 根据实际情况做修改 -->

      <el-submenu  v-for="(item,index) in menuList" :key="item.menuName"  v-if="item.child" :index="item.url">
        <template slot="title">
          <i  class="el-icon-location"></i>
          <span>{{item.menuName}}</span>
        </template>
        <navMenu  :menuList="item.child"></navMenu>
      </el-submenu>

      <el-menu-item  v-for="(item,index) in menuList" :key="item.url" v-if="item.child==undefined"  :index="item.url" @click="addTags(item)">
        <i  class="el-icon-location"></i>
        <span>{{item.menuName}}</span>
      </el-menu-item>

  </div>
</template>
<script>

    export default {
        name:"navMenu",
        props: {
            menuList:{
                type: Array
            }
        },
        data(){
            return{
               
            }
        },
        created(){
        },
        methods:{
          addTags(val){
            // 添加头部快捷导航，判断去重
            let flag = false;
            let obj =  {
                  title: val.menuName,
                  name: val.url,
              }
            if(this.$store.state.editableTabs.length>0){
              this.$store.state.editableTabs.forEach(item=>{
                console.log("val"+val.menuName)
                if(item.name == val.url){
                  flag = true
                }
              })
            }
            console.log(flag)
            if(!flag){
              this.$store.commit("addTag",obj)
            }
            this.$store.state.editableTabsValue = val.url;
            console.log(this.$store.state.editableTabs)
          }
         
        }
    };
</script>
<style>

</style>
