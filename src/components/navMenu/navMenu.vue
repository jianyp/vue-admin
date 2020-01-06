<template>
  <!-- <fragment>
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

  </fragment> -->
  <fragment>
    <template v-for="list in this.menuList">
      <el-submenu
        index="1"
        v-if="list.child.length>0"
        :key="list.url"
        :index="list.url"
      >
        <template slot="title" style="padding-left:10px">
          <i :class="list.icon"></i>
          <span slot="title">{{list.menuName}}</span>
        </template>
        <navMenu :menuList="list.child"></navMenu>
      </el-submenu>
      <el-menu-item
        v-else
        :index="list.url"
        :key="list.menuName"
        @click="addTags(list)"
      >
        <i :class="list.icon"></i>
        <span>{{list.menuName}}</span>
      </el-menu-item>
    </template>
  </fragment>
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
