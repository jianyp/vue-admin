<template>
  <div class="home">
    <el-table
      :data="tableData"
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
      <span class="demonstration">完整功能</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="$store.state.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
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
    tableData: [Object, Array]
  },
  data() {
    return {
      currentPage:4, 
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
  mounted(){
    console.log(this.$store.state.currentPage)
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
      this.$store.commit('changecurrentPage',val);
    }
  },
  components: {}
};
</script>


<style>
</style>

