<template>
  <div class="home">
    <el-table
      :data="tableData"
      v-loading="loading"
      style="width: 100%"
      border
      class="etables"
      sort-orders="['ascending', 'descending', 'default']"
      @row-dblclick="changePage"
      highlight-current-row
      @current-change="changePageVal"
      @sort-change="sortChange"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="index" label width="50"></el-table-column>
      <el-table-column
        v-for="(item,index) in tableColumn"
        :key="index"
        :label="item.name"
        sortable="custom"
        :prop="item.prop"
        :resizable="!item.lock"
        :width="item.width"
        :formatter="item.formatter"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.index === tabClickIndex && tabClickLabel === item.name">
            <el-input
              size="small"
              v-model="scope.row[item.prop]"
              @blur="inputBlur"
              autofocus="autofocus"
            ></el-input>
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
        :total="pageTotal"
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
    },
    tableColumn: {
      type: Array
    },
    pageTotal:{
      type:Number
    }
  },
  data() {
    return {
      tabClickIndex: null,
      tabClickLabel: "",
      isshow: false,
      delData: [],
      rowData: {},
      showTabs: "2",
      show: false,
      currentPage: 1,
      childPageSize:10,
      loading: true,
      showTableIndex:0
      // tableColumn: [
      //   {
      //     name: "日期",
      //     width: "",
      //     prop: "date",
      //     show: true,
      //     lock: false,
      //     sort: true
      //   },
      //   {
      //     name: "姓名",
      //     width: "",
      //     prop: "name",
      //     show: true,
      //     lock: true,
      //     sort: true
      //   },
      //   {
      //     name: "地址",
      //     width: "",
      //     prop: "address",
      //     show: true,
      //     lock: true,
      //     sort: true
      //   }
      // ]
    };
  },
  mounted() {
    console.log(this.dataurl);
    this.getTabledata();
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    handleSizeChange(val) {
      this.childPageSize = val;
      console.log(`每页 ${val} 条`);
      this.sendData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.sendData()
      // sessionStorage.setItem("currentPage", val);
    },
    getTabledata() {
      if (this.dataurl) {
        this.$axios
          .get(`${this.dataurl}`, {
            params: {}
          })
          .then(function(res) {
            this.tableData = res.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    changePageVal(currentRow) {
      this.rowData = currentRow;
      this.showTableIndex = currentRow.index;
      this.sendData();
      console.log(currentRow)
    },
    changePage(row) {
      this.rowData = row;
      this.showTabs = "1";
      this.sendData();
    },
    sendData() {
      //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
      this.$emit("func", this.rowData, this.showTabs, this.delData,this.showTableIndex,this.childPageSize,this.currentPage);
    },
    sendDel() {
      this.$emit("del", this.delData);
    },
    showInput(row, column, cell, event) {
      this.isshow = !this.isshow;
    },
    inputBlur() {
      this.tabClickIndex = null;
      this.tabClickLabel = "";
    },
    sortChange(col) {
      console.log(col);
    },
    tableRowClassName({row,rowIndex}){
      row.index = rowIndex;
    }
  },
  components: {}
};
</script>

<style>
</style>

