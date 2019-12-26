<template>
    <el-row class="tac">
      <!-- <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        active-text-color="#1890ff"
      >
        <label v-for="item in menuList" :key="item.index">
          <el-submenu :index="item.index" v-if="item.key">
            <template slot="title">
                <i class="el-icon-location"></i>
              <span>{{item.navName}}</span>
            </template>
            <el-menu-item :index="val.index" v-for="val in item.child" :key="val.index">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{val.navName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item :index="item.index" v-else>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.navName}}</span>
            </template>
          </el-menu-item>
        </label>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item index="1-3">选项3</el-menu-item>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu> -->

      <el-menu  default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        active-text-color="#1890ff" >
        <auto-Nav :menus="menus"></auto-Nav>
      </el-menu>
    </el-row>
</template>
<script>
import autoNav from "@/utils/autoNav"

export default {
  data() {
    return {
      menus: [
        {
          navName: "首页",
          to: "",
          icon:"el-icon-location",
          index: "1",
          key: true,
          child: [
            {
          navName: "导航二",
          to: "",
          icon:"el-icon-menu",
          index: "2",
          key: false,
          child: []
              },
            { navName: "选项一", to: "", index: "1-1", key: false, child: [] },
            { navName: "选项一", to: "", index: "1-2", key: false, child: [] },
            { navName: "选项一", to: "", index: "1-3", key: false, child: [] },
            {
              navName: "选项一",
              to: "",
              index: "1-4",
              key: true,
              child: [
                {
                  navName: "选项一",
                  to: "",
                  index: "1-4-1",
                  key: false,
                  child: []
                }
              ]
            }
          ]
        },
        
        {
          navName: "导航三",
          to: "",
          icon:"el-icon-document",
          index: "3",
          key: false,
          child: []
        },
        {
          navName: "导航四",
          to: "",
          icon:"el-icon-setting",
          index: "4",
          key: false,
          child: []
        }
      ]
    };
  },
  components:{
    autoNav
  },
  created() {},
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
