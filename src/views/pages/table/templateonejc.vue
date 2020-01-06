<template>
  <div class="home">
    <el-table
      :data="tableData"
      v-loading="loading"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      border
      class="etables"
      :default-sort="{prop: 'date', order: 'descending'}"
      @row-dblclick="changePage"
      @cell-click="tabClick"
      @select="selectRow"
      @select-all="selectRow"
    >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      type="index"
      label="项次"
      width="50">
    </el-table-column>
      <el-table-column
        v-for="(item,index) in tableColumn"
        :key="index"
        :label="item.name"
        :sortable="item.sort"
        :prop="item.prop"
        :resizable="!item.lock"
        :width="item.width"
        :formatter="item.formatter"
      >
      <template slot-scope="scope">
        <span v-if="scope.row.index === tabClickIndex && tabClickLabel === item.name">
          <el-input size="small" v-model="scope.row[item.prop]" @blur="inputBlur" autofocus="autofocus"></el-input>
        </span>
         <span v-else>{{scope.row[item.prop]}}</span>
      </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "jcTable",
  props: {
    name: {
      type: String
    },
    tableData: [Object, Array],
    pageSize: {
      type: Number
    },
    dataurl: {
      type: String
    }
  },
  data() {
    return {
      tabClickIndex:null,
      tabClickLabel:"",
      isshow:false,
      delData:[],
      rowData:{},
      showTabs:"",
      show:false,
      currentPage: 1,
      loading: true,
      tableColumn: [
        {
          name: "日期",
          width: "800",
          prop: "date",
          show: true,
          lock: false,
          sort: true
        },
        {
          name: "姓名",
          width: "800",
          prop: "name",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "地址",
          width: "800",
          prop: "address",
          show: true,
          lock: true,
          sort: true
        }
      ]
    };
  },
  mounted(){
    console.log(this.dataurl);
    this.getTabledata();
    setTimeout(()=>{
        this.loading = false
      },1000)
   
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      sessionStorage.setItem("currentPage", val);
    },
    getTabledata() {
      this.$axios
        .get("/user", {
          params: {
            ID: 12345
          }
        })
        .then(function(res){
          this.tableData = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changePage(row){
      this.rowData = row;
      this.showTabs = "1";
      this.sendData();
    },
    sendData(){
        //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
        this.$emit('func',this.rowData,this.showTabs,this.delData)
    },
    sendDel(){
      this.$emit('del',this.delData)
    },
    showInput(row, column, cell, event){
      this.isshow = !this.isshow;
    },
    selectRow(selection,row){
      this.delData = selection;
      this.sendDel()
    },
    tabClick(row,col){
      this.tabClickIndex = row.index;
      this.tabClickLabel = col.label;
      console.log(this.tabClickLabel)
      console.log(this.tabClickIndex)
    },
    tableRowClassName({row,rowIndex}){
      row.index = rowIndex
      console.log(row)
      console.log(rowIndex)
    },
    inputBlur() {
      this.tabClickIndex = null
      this.tabClickLabel = ''
    }


  },
  components: {}
};
</script>


<style>

</style>

