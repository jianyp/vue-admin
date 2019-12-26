<template>
  <div class="home">
    <el-table
      :data="tableData"
      v-loading="loading"
      style="width: 100%"
      border
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column
        v-for="(item,index) in tableColumn"
        :key="index"
        :label="item.name"
        :sortable="item.sort"
        :prop="item.prop"
        :resizable="!item.lock"
        :width="item.width"
        :formatter="item.formatter"
      ></el-table-column>
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
  name: "jTable",
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
      currentPage: 1,
      loading: true,
      tableColumn: [
        {
          name: "日期",
          width: "120",
          prop: "date",
          show: true,
          lock: false,
          sort: true
        },
        {
          name: "姓名",
          width: "120",
          prop: "name",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "地址",
          width: "120",
          prop: "address",
          show: true,
          lock: true,
          sort: true
        }
      ]
    };
  },
  mounted() {
    console.log(this.dataurl);
    this.getTabledata();
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
          console.log(res);
          res.total
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: {}
};
</script>


<style>
</style>

