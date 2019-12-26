
<template>
  <fragment>
    <template v-for="menu in menus">
      <el-submenu v-if="menu.child && menu.child.length > 0" :index="menu.index" :key="menu.index">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.navName}}</span>
        </template>
        <auto-Nav :menus="menu.child"></auto-Nav>
      </el-submenu>
      <el-menu-item v-else :index="menu.index" @click="addTag(menu)" :key="menu.index">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.navName}}</span>
      </el-menu-item>
    </template>
  </fragment>
</template>
<script>
export default {
  name: 'autoNav', 
  props: {
    menus: {
      type: Array,
      default: function () {
        return [];
      },
      required: false
    }
  },
  methods: {
    handleRouter(menu) {
      // 跳转路由
      this.$router.push(menu.route);
    },
    addTag(menu){
      this.$emit("getMenu",menu);
    }
  }
}
</script>

<style >
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  margin-right: 0 !important;
}
</style>