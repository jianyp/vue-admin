<template>
  <div class="template-one">
    
    <div class="title">
      标题一
      <pass v-if="pass"></pass>
    </div>
    <div>
      <el-button type="primary" icon="el-icon-edit" size="mini">新增</el-button>
      <el-button type="primary" icon="el-icon-share" size="mini" :disabled="pass">修改</el-button>
      <el-button type="primary" icon="el-icon-delete" size="mini" :disabled="pass" @click="delRowData()">删除</el-button>
      <el-button type="primary" icon="el-icon-search" size="mini">查询</el-button>
      <el-button
        type="primary"
        icon="el-icon-d-arrow-left"
        size="mini"
        :disabled="changePagePrevBtn"
        @click="firstData()"
      >第一条</el-button>
      <el-button
        type="primary"
        icon="el-icon-share"
        size="mini"
        :disabled="changePagePrevBtn"
        @click="prevData()"
      >上一条</el-button>
      <el-button
        type="primary"
        icon="el-icon-delete"
        size="mini"
        :disabled="changePageNextBtn"
        @click="nextData()"
      >下一条</el-button>
      <el-button
        type="primary"
        icon="el-icon-d-arrow-right"
        size="mini"
        :disabled="changePageNextBtn"
        @click="lastData()"
      >末一条</el-button>
      <el-button type="primary" icon="el-icon-edit" size="mini">确定</el-button>
      <el-button type="primary" icon="el-icon-share" size="mini">取消</el-button>
      <el-button type="primary" icon="el-icon-delete" size="mini" @click="check()">
        <span v-if="!pass">审核</span>
        <span v-else>撤销审核</span>
      </el-button>

    </div>
    <div>
      <el-tabs type="border-card" v-model="editableTabsValue">
        <el-tab-pane name="1">
          <span slot="label">
            <i class="el-icon-date"></i> 基础信息
          </span>
          <div>
            <el-row :gutter="30">
              <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="input1">
                  <template slot="prepend">姓名</template>
                </el-input>
              </el-col>
              <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="input2">
                  <template slot="prepend">日期</template>
                </el-input>
              </el-col>
              <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="input3">
                  <template slot="prepend">地址</template>
                </el-input>
              </el-col>
            </el-row>
          </div>
          <div>
            <p>表格头</p>
            <el-button @click="addRow()">添加行</el-button>
            <el-button @click="removeRow()">删除行</el-button>
            <jcTable :tableData="tableData" :pageSize="10" dataurl="http://localhost:8086/kcxxsd/test" @del="sendDel"></jcTable>
          </div>
        </el-tab-pane>
        <el-tab-pane name="2" label="数据浏览">
          <p>表格头</p>
          <sjTable
            :tableData="tableData1"
            :pageSize="10"
            data-url="api/table"
            @func="getMsgFormSon"
            :tableColumn="tableColumn"
          ></sjTable>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import jcTable from "@/views/pages/table/templateonejc";
import sjTable from "@/views/pages/table/templateonesj";
import {getTable} from '@/api/api.js'

export default {
  data() {
    return {
      inputObj:{},
      input1: "",
      input2: "",
      input3: "",
      delData: "",
      pass:false,
      showtableIndex: 0,
      changePagePrevBtn: true,
      changePageNextBtn: false,
      editableTabsValue: "1",
       tableColumn: [
        {
          name: "日期",
          width: "",
          prop: "date",
          show: true,
          lock: false,
          sort: true
        },
        {
          name: "姓名",
          width: "",
          prop: "name",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "地址",
          width: "",
          prop: "address",
          show: true,
          lock: true,
          sort: true
        }
      ],
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ], //单身
      tableData1: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  mounted() {
    this.showtableData();
    this.countTableData();
    // this.$axios({
    //   method: "get",
    //   url: "http://localhost:8086/kcxxsd/test",
    //   data: {}
    // })
    //   .then(function(res) {
    //     alert(res);
    //     console.log(res);
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });
  },
  methods: {
    getMsgFormSon(val1, val2, val3) {
      this.input1 = val1.date;
      this.editableTabsValue = val2;
      this.delData = val3;
    },
    sendDel(val) {
      this.delData = val;
    },
    addRow() {
      let row = {
        id: Math.random(),
        date: "",
        name: "",
        address: ""
      };
      this.tableData.push(row);
      console.log(this.tableData);
    },
    removeRow() {
      if (this.delData) {
        this.delData.forEach(data => {
          this.tableData.forEach((val, i) => {
            if (data.id == val.id) {
              this.tableData.splice(i, 1);
            }
          });
        });
      }
    },
    prevData() {
      if (this.showtableIndex > 0) {
        this.showtableIndex--;
        this.changePageNextBtn = false;
        this.showtableData();
        if (this.showtableIndex == 0) {
          this.changePagePrevBtn = true;
        }
      }
    },
    nextData() {
      if (this.tableData1 && this.showtableIndex < this.tableData1.length - 1) {
        this.showtableIndex++;
        this.showtableData();
        this.changePagePrevBtn = false;
        if (this.showtableIndex == this.tableData1.length - 1) {
          this.changePageNextBtn = true;
        }
      } else {
        alert("已经是最后一条了");
      }
    },
    firstData() {
      this.showtableIndex = 0;
      this.showtableData();
      this.changePagePrevBtn = true;
      this.changePageNextBtn = false;
    },
    lastData() {
      this.showtableIndex = this.tableData1.length - 1;
      this.showtableData();
      this.changePagePrevBtn = false;
      this.changePageNextBtn = true;
    },
    showtableData() {
      if (this.tableData1.length > 0){
        this.input1 = this.tableData1[this.showtableIndex].date;
        this.input2 = this.tableData1[this.showtableIndex].name;
        this.input3 = this.tableData1[this.showtableIndex].address;
      } else {
        this.input1 = "";
        this.input2 = "";
        this.input3 = "";
      }
    },
    delRowData() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData1.splice(this.showtableIndex, 1);
          this.countTableData();
          console.log(this.showtableIndex);
          if (this.tableData1.length > 0) {
            if (this.showtableIndex == this.tableData1.length) {
              this.showtableIndex--;
            }
          }
          this.showtableData();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    countTableData() {
      if (this.tableData1.length < 2) {
        this.changePagePrevBtn = true;
        this.changePageNextBtn = true;
      }
    },
    check(){
      this.pass = !this.pass;
    }
  },
  components: {
    jcTable,
    sjTable,
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.template-one .title {
  font-size: 16px;
  text-align: center;
  position: relative;
}
</style>
