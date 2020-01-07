import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const state={
  headTag:[],
  token:"",
  // 菜单
  menuList:[
      {menuName:"首页",url:"/0",icon:"el-icon-location",child:[]},
      {menuName:"基础信息",url:"/1",icon:"el-icon-location",child:[
          {menuName:"菜单一",url:"/1-1",icon:"el-icon-location",child:[]},
          {menuName:"菜单二",url:"/1-2",icon:"el-icon-location",child:[]},
          {menuName:"菜单三",url:"/1-3",icon:"el-icon-location",child:[]},
          {menuName:"菜单四",url:"/1-4",icon:"el-icon-location",child:[
              // {menuName:"三级菜单1",url:"/1-4-1",icon:"",child:[]},
              // {menuName:"三级菜单2",url:"/1-4-2",icon:"",child:[]}
           ]}
        ]},
      {menuName:"工艺信息",url:"/2",icon:"el-icon-location",child:[]},
      {menuName:"合同管理",url:"/3",icon:"el-icon-location",child:[]},
      {menuName:"生产管理",url:"/4",icon:"el-icon-location",child:[]},
      {menuName:"质量管理",url:"/5",icon:"el-icon-location",child:[]},
      {menuName:"设备管理",url:"/6",icon:"el-icon-location",child:[]},
      {menuName:"采购管理",url:"/7",icon:"el-icon-location",child:[]},
      
      {menuName:"仓库管理",url:"",icon:"el-icon-location",child:[
        {menuName:"仓库信息设置",url:"/8-1",icon:"el-icon-location",child:[]},
        {menuName:"物料库存查看",url:"/8-2",icon:"el-icon-location",child:[]},
        {menuName:"物料库存锁定",url:"/8-3",icon:"el-icon-location",child:[]},
        {menuName:"产品入库",url:"/8-4",icon:"el-icon-location",child:[]},
        {menuName:"产品出库",url:"/8-5",icon:"el-icon-location",child:[]},
        {menuName:"产品报废",url:"/8-6",icon:"el-icon-location",child:[]},
        {menuName:"调拨入库",url:"/8-7",icon:"el-icon-location",child:[]},
        {menuName:"调拨出库",url:"/8-8",icon:"el-icon-location",child:[]},
        {menuName:"物料拆解",url:"/8-9",icon:"el-icon-location",child:[]},
        {menuName:"物料组装",url:"/8-10",icon:"el-icon-location",child:[]}
      ]}
      // {menuName:"系统设置",url:"/4",icon:"el-icon-location",child:[]},
    ],
    // 头部快捷导航
    editableTabsValue:sessionStorage.getItem("editableTabsValue") ||"1",
    editableTabs:sessionStorage.getItem("editableTabs")||[],
    // 弹出框表格选中数据
    selectRowData:[]
}

const mutations= {
  addTag(state,obj) {
    state.editableTabs.push(obj);
  },
  loginSuccess(state,val){
    state.token = val;
  },
  saveTag(state){
    sessionStorage.setItem("editableTabsValue",state.editableTabsValue);
    sessionStorage.setItem("editableTabs",state.editableTabs);
  },
  selectRow(state,val){
    state.selectRowData = val;
  }
}
export default new Vuex.Store({
  state,
  mutations
});
