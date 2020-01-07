<template>
  <div class="layout">
    <div class="header">
      <div class="header-left left">
        <div style="font-size:28px;text-align:left;font-weight:bold;"><span style="color:white;">BangPu-MES</span></div>
        <!-- <span>log</span> -->
        <div class="el-icon-s-fold" :class="isCollapse?'rotate':''" @click="menuHander()" style=""></div>
      </div>
      <div class="header-right right">
        <div>
          <span class="el-icon-user-solid"></span>
        </div>
        <div>
          <span class="el-icon-search"></span>
        </div>
        <div>
          <span class="el-icon-rank fullscreen" @click="screenFull()"></span>
        </div>
        <div>
          <span class="el-icon-message"></span>
        </div>
        <div class="userMenu">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{user}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>切换用户</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="aside">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :router="true"
        @select="handleSelect"
      >
        <navMenu :menuList="menuList"></navMenu>
      </el-menu>
    </div>
    <div class="main" :class="isCollapse?'close':''">
      <div class="head-tags">
        <el-tabs
          v-model="$store.state.editableTabsValue"
          type="card"
          closable
          @tab-remove="removeTab"
          @tab-click="select"
        >
          <el-tab-pane
            v-for="item in $store.state.editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          ></el-tab-pane>
        </el-tabs>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import navMenu from "@/components/navMenu/navMenu";
import screenfull from "screenfull";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      isCollapse: false,
      user: "xxx"
    };
  },
  computed: {
    ...mapState({
      menuList: state => state.menuList
    })
  },
  created() {},
  methods: {
    // 导航展开收齐
    menuHander() {
      this.isCollapse = !this.isCollapse;
    },
    // 全屏按钮功能
    screenFull() {
      if (screenfull.isEnabled) {
        screenfull.toggle();
      }
    },
    // 导航选中方法
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 快捷导航移除方法
    removeTab(targetName) {
      let tabs = this.$store.state.editableTabs;
      let activeName = this.$store.state.editableTabsValue;
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
      this.$store.state.editableTabsValue = activeName;
      this.$store.state.editableTabs = tabs.filter(
        tab => tab.name !== targetName
      );
      // 跳转到当前激活tabs的对应路由页面
      if(this.$store.state.editableTabs.length == 0){
        this.$router.push({path:"/layoutindex"})
      }else{
        this.$router.push({ path: this.$store.state.editableTabsValue });
      }
      

    },
    select(tag) {
      console.log(tag);
      this.$router.push({ path: tag.name });
    }
  },
  components: {
    navMenu
  }
};
</script>


<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  height: 100%;
  overflow-y: auto;
}
.el-menu--collapse {
  height: 100%;
}

html,
body,
#app,
.layout,
.layout .main {
  height: 100%;
}
.layout .header {
  padding: 0 20px;
  position: absolute;
  height: 50px;
  line-height: 54px;
  background: rgb(24, 144, 255);
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: 99;
}
.layout .aside {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 50px;
}
.layout .aside > div {
  height: 100%;
}
.layout .header-right span {
  font-size: 18px;
  color: white;
  cursor: pointer;
}
.layout .header-right > div {
  margin-left: 8px;
  padding: 0 8px;
  cursor: pointer;
  transition: 0.3s;
}
.layout .header-right > div:hover {
  background: #167ad6;
}

.layout .header-right {
  display: flex;
}
.layout .header-left {
  position: relative;
  width: 220px;
}
.layout .header-left > div:last-child {
  position: absolute;
  font-size: 26px;
  right: 0;
  top: 12px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.layout .main {
  padding-top: 50px;
  padding-left: 250px;
  padding-right: 10px;
  transition: 0.4s;
  overflow-y: auto;
}
.close {
  padding-left: 70px !important;
}
.rotate {
  transform: rotateY(180deg);
}
.fullscreen {
  transform: rotate(45deg);
}
/*-----  header end  -----*/
.head-tags {
  padding-top: 10px;
}
.userMenu .el-dropdown{
  line-height: 48px;
}
</style>

