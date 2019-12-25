import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const state={
  headTag:[],
  // 菜单
  menuList:[
      {menuName:"导航一",url:"/1",icon:"",child:[
          {menuName:"菜单一",url:"/1-1",icon:""},
          {menuName:"菜单二",url:"/1-2",icon:""},
          {menuName:"菜单三",url:"/1-3",icon:""},
          {menuName:"菜单四",url:"/1-4",icon:"",child:[
              {menuName:"三级菜单1",url:"/1-4-1",icon:""},
              {menuName:"三级菜单2",url:"/1-4-2",icon:""}
           ]}
        ]},
      {menuName:"导航二",url:"/2",icon:""},
      {menuName:"导航三",url:"/3",icon:""},
      {menuName:"导航四",url:"/4",icon:""}
    ],
  // 表格当前页
  currentPage:1
}
const mutations= {
  addTag (state,val) {
    state.headTag.push(val);
  },
  changecurrentPage(state,val){
    state.currentPage = val;
  }
}
export default new Vuex.Store({
  state,
  mutations
});
