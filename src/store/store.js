import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const state={
  headTag:[],
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
    ]
}
const mutations= {
  addTag (headTag,val) {
  headTag.push(val);
}
}
export default new Vuex.Store({
  state,
  mutations
});
