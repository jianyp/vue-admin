<template>
  <div class="template-one">
    <div class="title">
      物料库存锁定表
      <pass v-if="pass"></pass>
    </div>
    <div class="tool-btn">
      <el-button type="primary" icon="el-icon-edit" size="mini" @click="addData()">新增</el-button>
      <el-button type="primary" icon="el-icon-share" size="mini" :disabled="pass">修改</el-button>
      <el-button type="primary" icon="el-icon-delete" size="mini" :disabled="pass" @click="delRowData()">删除</el-button>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="queryData()">查询</el-button>
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
      <el-button type="primary" icon="el-icon-delete" size="mini" @click="checkPass()">
       <span v-if="!pass">审 核</span>
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
                <el-input placeholder="锁定单号" v-model="kcxxsda001">
                  <template slot="prepend">锁定单号</template>
                </el-input>
              </el-col>
              <el-col :span="8">
                <el-input placeholder="锁定日期" v-model="kcxxsda002">
                  <template slot="prepend">锁定日期</template>
                </el-input>
              </el-col>
            </el-row>

            <el-row :gutter="30">
              <el-col :span="8">
                <el-row>
                  <el-col :span="15">
                    <el-input placeholder="锁定人员" v-model="kcxxsda003">
                      <template slot="prepend">锁定人员</template>
                    </el-input>
                  </el-col>
                  <el-col :span="9">
                    <el-input placeholder="人员名称" v-model="kcxxsda004"></el-input>
                  </el-col>
                </el-row>
              </el-col>

              <el-col :span="8">
                <el-row>
                  <el-col :span="15">
                    <el-input placeholder="锁定部门" v-model="kcxxsda005">
                      <template slot="prepend">锁定部门</template>
                    </el-input>
                  </el-col>
                  <el-col :span="9">
                    <el-input placeholder="部门名称" v-model="kcxxsda006"></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

            <el-row :gutter="30">
              <el-col :span="8">
                <el-input placeholder="单据类别" v-model="kcxxsda015">
                  <template slot="prepend">单据类别</template>
                </el-input>
              </el-col>
              <el-col :span="8">
                <el-input placeholder="备注信息" v-model="kcxxsda007">
                  <template slot="prepend">备注信息</template>
                </el-input>
              </el-col>
            </el-row>
          </div>
          <div>
            <p>表格头</p>
            <el-button @click="addRow()">添加行</el-button>
            <el-button @click="removeRow()">删除行</el-button>
            <!-- 单身表格 -->
            <jcTable
              :tableData="tableData"
              :pageSize="10"
              data-url="http://localhost:8086/kcxxsd/test"
              @del="sendDel"
              :tableColumnB="tableColumnB"
            ></jcTable>
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

export default {
  data() {
    return {
      kcxxsda001: "",
      kcxxsda002: "",
      kcxxsda003: "",
      kcxxsda004: "",
      kcxxsda005: "",
      kcxxsda006: "",
      kcxxsda007: "",
      kcxxsda015: "",
      delData: "",
      showtableIndex: 0,
      changePagePrevBtn: true,
      changePageNextBtn: false,
      newBtn: false,
      editBtn: false,
      pass:false,
      editableTabsValue: "1",
      // kcxxsda: { kcxxsda001: "这是一个单号", kcxxsda002: "this.kcxxsda002" ,kcxxsda003:"this.kcxxsda003"},
      tableColumn: [
        {
          name: "锁定单号",
          width: "",
          prop: "kcxxsda001",
          show: true,
          lock: false,
          sort: true
        },
        {
          name: "锁定日期",
          width: "",
          prop: "kcxxsda002",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "锁定人员",
          width: "",
          prop: "kcxxsda003",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "人员名称",
          width: "",
          prop: "kcxxsda004",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "锁定部门",
          width: "",
          prop: "kcxxsda005",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "部门名称",
          width: "",
          prop: "kcxxsda006",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "备注信息",
          width: "",
          prop: "kcxxsda007",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "单据类型",
          width: "",
          prop: "kcxxsda015",
          show: true,
          lock: true,
          sort: true
        }
      ],
      //单身表格列名
      tableColumnB: [
        {
          name: "产品编号",
          width: "120",
          prop: "kcxxsdb003",
          show: true,
          lock: false,
          sort: true
        },
        {
          name: "产品名称",
          width: "120",
          prop: "kcxxsdb004",
          show: true,
          lock: false,
          sort: true
        },
        {
          name: "仓库编号",
          width: "120",
          prop: "kcxxsdb005",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "收货批号",
          width: "120",
          prop: "kcxxsdb006",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "产品单位",
          width: "120",
          prop: "kcxxsdb007",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "数量",
          width: "120",
          prop: "kcxxsdb008",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "储位编号",
          width: "120",
          prop: "kcxxsdb014",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "货架编号",
          width: "120",
          prop: "kcxxsdb015",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "内部条码",
          width: "120",
          prop: "kcxxsdb016",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "已占用数量",
          width: "120",
          prop: "kcxxsdb017",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "生产日期",
          width: "120",
          prop: "kcxxsdb018",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "供应商条码",
          width: "120",
          prop: "kcxxsdb019",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "保质期（天）",
          width: "120",
          prop: "kcxxsdb020",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "有效起始日期",
          width: "120",
          prop: "kcxxsdb021",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "有效截止日期",
          width: "120",
          prop: "kcxxsdb022",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "状态",
          width: "120",
          prop: "kc021",
          show: true,
          lock: true,
          sort: true
        }
      ],
      tableData: [], //单身
      tableData1: [] //数据浏览
    };
  },
  mounted() {
    this.$axios({
      method: "post",
      url: "http://localhost:8086/kcxxsd/list",
      data: {}
    }).then(response => {
      //数据浏览 赋值
      this.tableData1 = response.data.data;
      //初始化单头赋值
      this.showtableData();
      this.countTableData();
      //查询单身
      this.queryB();
    });
  },
  methods: {
    //数据浏览 点击指定行，给基础数据赋值
    getMsgFormSon(val1, val2, val3) {
      this.kcxxsda001 = val1.kcxxsda001;
      this.kcxxsda002 = val1.kcxxsda002;
      this.kcxxsda003 = val1.kcxxsda003;
      this.kcxxsda004 = val1.kcxxsda004;
      this.kcxxsda005 = val1.kcxxsda005;
      this.kcxxsda006 = val1.kcxxsda006;
      this.kcxxsda007 = val1.kcxxsda007;
      this.kcxxsda015 = val1.kcxxsda015;

      this.editableTabsValue = val2;
      this.delData = val3;
    },
    sendDel(val) {
      this.delData = val;
    },
    addRow() {
      let row = {
       
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
    //单头赋值
    showtableData() {
      if (this.tableData1.length > 0) {
        this.kcxxsda001 = this.tableData1[this.showtableIndex].kcxxsda001;
        this.kcxxsda002 = this.tableData1[this.showtableIndex].kcxxsda002;
        this.kcxxsda003 = this.tableData1[this.showtableIndex].kcxxsda003;
        this.kcxxsda004 = this.tableData1[this.showtableIndex].kcxxsda004;
        this.kcxxsda005 = this.tableData1[this.showtableIndex].kcxxsda005;
        this.kcxxsda006 = this.tableData1[this.showtableIndex].kcxxsda006;
        this.kcxxsda007 = this.tableData1[this.showtableIndex].kcxxsda007;
        this.kcxxsda015 = this.tableData1[this.showtableIndex].kcxxsda015;
      } else {
        this.kcxxsda001 = "";
        this.kcxxsda002 = "";
        this.kcxxsda003 = "";
        this.kcxxsda004 = "";
        this.kcxxsda005 = "";
        this.kcxxsda006 = "";
        this.kcxxsda007 = "";
        this.kcxxsda015 = "";
      }
    },
    //查询
    queryData(){
      this.tableData1 = [];
      this.showtableData();
      this.tableData = [];
      this.addRow();
      this.$axios({
        method: "post",
        url: "http://localhost:8086/kcxxsd/listB",
        data: { kcxxsda001: this.kcxxsda001 }
      }).then(response => {
        this.tableData = response.data.data;
      });
    },
    //查询单身
    addData(){
      this.tableData=[];
      this.showtableData;
      this.addRow();
    },
    queryB() {
      let param = new URLSearchParams();
      var kcxxsda = {
        kcxxsda001: "这是一个单号",
        kcxxsda002: "this.kcxxsda002",
        kcxxsda003: "this.kcxxsda003"
      };
      param.append("kcxxsda001", this.kcxxsda001);
      // param.append("tableB", JSON.stringify(this.tableColumnB));
      param.append("kcxxsda",JSON.stringify(kcxxsda));
      console.log(kcxxsda);
      this.$axios({
        method: "post",
        url: "http://localhost:8086/kcxxsd/listB",
        data: param
      }).then(response => {
        this.tableData = response.data.data;
      });
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
    //上下一条按钮状态判断
    countTableData() {
      if (this.tableData1.length < 2) {
        this.changePagePrevBtn = true;
        this.changePageNextBtn = true;
      }
    },
    // 审核方法
    checkPass(){
      this.pass = !this.pass;
    }
  },
  watch: {
    kcxxsda001() {
      this.queryB();
    }
  },
  components: {
    jcTable,
    sjTable
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.template-one .title {
  font-size: 24px;
  padding-top: 10px;
  padding-bottom: 20px;
  text-align: center;
  position: relative;
}
.tool-btn {
  padding: 10px 0;
}
</style>
