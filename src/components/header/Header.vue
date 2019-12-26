<template>
    <div class="header-bar">
        <span>Hanboard Demo</span>
        <i
          @click="handler();rotate()"
          class="iconfont icon-caidanzhankai1"
          :class="isRotate?'rotate':''"
        ></i>
        
        <div class="navbar">
          <a class="el-dropdown">
            <span class="el-dropdown-link">
              <i class="iconfont icon-wo"></i>
              当前用户：{{user}}
            </span>
          </a>
          
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="iconfont icon-quanping" @click="screenFull()"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>全屏</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="iconfont icon-pifu"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>切换皮肤</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="iconfont icon-guojihua"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>国际化</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="iconfont icon-renyuanguanli"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>在线人员</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="iconfont icon-xinfeng"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>消息</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown>
            <span class="el-dropdown-link">个人信息</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
</template>
<script>
import screenfull from "screenfull";
export default {
  data() {
    return {
      //判断展开/收起按钮是否旋转
      isRotate: true,
      user: "蹇勇朴",
    };
  },
  components:{
  },
  computed: {
    
  },
  methods: {
    //把isCollapse值传给nav.vue组件，实现左侧导航展开收起
    handler() {
      this.$store.commit("navToggle");
    },
    rotate() {
      this.isRotate = !this.isRotate;
    },
    screenFull() {
      screenfull.toggle();
    }
  }
};
</script>

<style>

/* 收起导航按钮样式 */
.icon-caidanzhankai1 {
  font-size: 20px;
  color: fff;
  cursor: pointer;
  transition: 0.3s;
}
.icon-caidanzhankai1:hover {
  color: #cccccc;
}

.rotate:before {
  display: inline-block;
  transform: rotateY(180deg);
  transition: .4s;
}

/* header右侧的功能模块样式 */
.navbar {
  float: right;
  border: none;
  box-sizing: border-box;
}
.el-dropdown {
  cursor: pointer;
  padding: 0 10px;
  line-height: 49px;
}
.el-dropdown:hover {
  background: #1578d4;
}
.el-dropdown-link {
  color: white;
}

</style>