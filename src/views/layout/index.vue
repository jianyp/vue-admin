<template>
    <div class="layout">
      <div class="header">
        <div class="header-left left">
          <span>log</span>
          <div class="el-icon-s-fold" :class="isCollapse?'rotate':''" @click="menuHander()"></div>
        </div>
        <div class="header-right right">
          <div><span class="el-icon-user-solid"></span></div>
          <div><span class="el-icon-search"></span></div>
          <div><span class="el-icon-rank fullscreen" @click="screenFull()"></span></div>
          <div><span class="el-icon-message"></span></div>
        </div>
      </div>
      <div class="aside">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo"  :collapse="isCollapse" :router="true" @select="handleSelect">
          <navMenu :menuList="menuList"></navMenu>
        </el-menu>
      </div>
      <div class="main" :class="isCollapse?'close':''">
        <div class="head-tags">
          <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab"  @tab-click="toComponent">
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
            </el-tab-pane>
          </el-tabs>
        </div>
        <router-view/>
      </div>
    </div>
</template>

<script>
  import navMenu from "@/components/mainnav/mainnav";
  import screenfull from 'screenfull'
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
    export default {

        data(){
          return{
              isCollapse:false,
              editableTabsValue:"2",
              editableTabs: [],
              tabIndex: 2
          }
        },
        computed:{
            ...mapState({
                menuList: state => state.menuList,
            })
        },
        methods:{
            menuHander(){
                this.isCollapse = !this.isCollapse;
            },
            screenFull(){
                if (screenfull.isEnabled) {
                    screenfull.toggle();
                }
            },
            handleSelect(key, keyPath){
                console.log(key, keyPath);
                this.addTab(key);
            },
            removeTab(targetName) {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }
                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            },
            addTab(targetName) {
                let newTabName = ++this.tabIndex + '';
                this.editableTabs.push({
                    title: targetName,
                    name: newTabName,
                    url:targetName
                });
                this.editableTabsValue = newTabName;
            },
            toComponent(targetName){
              console.log(targetName)
                this.$router.push({path:targetName.label})
            }
        },
        components:{
            navMenu
        }
    };
</script>


<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    height: 100%;
  }
  .el-menu--collapse{
    height: 100%;
  }
  html,body,#app,.layout,.layout .main{
    height: 100%;
  }
  .layout .header{
    padding: 0 20px;
    position: absolute;
    height: 60px;
    line-height: 60px ;
    background: rgb(24,144,255);
    top: 0;
    left: 0;
    right: 0;
  }
  .layout .aside{
    position: absolute;
    left: 0;
    bottom: 0;
    top: 60px;
  }
  .layout .aside>div{
    height: 100%;
  }
  .layout .header-right span{
    font-size: 24px;
    color: white;
    cursor: pointer ;
  }
  .layout .header-right>div+div{
    margin-left: 20px;
  }

  .layout .header-right{
    display: flex;
  }
  .layout .header-left{
    position: relative;
    width: 220px;
  }
  .layout .header-left>div:last-child{
    position: absolute;
    font-size: 26px;
    right: 0;
    top: 17px;
    color: white;
    cursor: pointer;
    transition: .3s;
  }

  .layout .main{
    padding-top: 60px;
    padding-left: 250px;
    transition: .4s;
  }
  .close{
    padding-left: 70px !important;
  }
  .rotate{
    transform: rotate(180deg);
  }
  .fullscreen{
    transform: rotate(45deg);
  }
/*-----  header end  -----*/


</style>

