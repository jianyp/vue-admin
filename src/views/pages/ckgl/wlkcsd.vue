<template>
  <div class="template-one">
    <div class="title">
      物料库存锁定表
      <pass v-if="pass"></pass>
    </div>
    <div class="tool-btn">
      <el-button @click="dialogVisible = true" size="mini" type="primary">弹窗（测试用）</el-button>
      <el-button
        type="primary"
        icon="el-icon-edit"
        size="mini"
        :disabled="newBtn"
        @click="addData()"
      >新增</el-button>
      <el-button
        type="primary"
        icon="el-icon-share"
        size="mini"
        :disabled="pass || editBtn"
        @click="editData()"
      >修改</el-button>

      <el-button type="primary" icon="el-icon-edit" size="mini" @click="addData()">新增</el-button>
      <el-button type="primary" icon="el-icon-share" size="mini" :disabled="pass">修改</el-button>
      <el-button
        type="primary"
        icon="el-icon-delete"
        size="mini"
        :disabled="pass || deleteBtn"
        @click="delRowData()"
      >删除</el-button>
      <el-button
        type="primary"
        icon="el-icon-search"
        :disabled="selectBtn"
        size="mini"
        @click="queryData()"
      >查询</el-button>
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
      <el-button
        type="primary"
        icon="el-icon-edit"
        :disabled="commitBtn"
        size="mini"
        @click="commitMed()"
      >确定</el-button>
      <el-button
        type="primary"
        icon="el-icon-share"
        :disabled="cancelBtn"
        size="mini"
        @click="cancelMed()"
      >取消</el-button>
      <el-button
        type="primary"
        icon="el-icon-delete"
        size="mini"
        :disabled="checkBtn"
        @click="checkPass()"
      >
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
                  <i slot="suffix" class="el-icon-search el-input__icon" @click="a()"></i>
                </el-input>
              </el-col>
              <el-col :span="8" class="date-input">
                <div class="date-block">锁定日期</div>
                <!-- <el-input placeholder="锁定日期" v-model="kcxxsda002">
                  <template slot="prepend">锁定日期</template>
                </el-input>-->
                <el-date-picker v-model="kcxxsda002" type="date" placeholder="选择日期"></el-date-picker>
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
            <div class="jc-header">
              <p>锁定\解锁物料表</p>
              <div>
                <el-button size="mini" icon="el-icon-plus" plain @click="addRow()">添加行</el-button>
                <el-button size="mini" icon="el-icon-minus" plain @click="removeRow()">删除行</el-button>
              </div>
            </div>

            <!-- 单身表格 -->
            <jcTable
              :tableData="tableData"
              :pageSize="10"
              :pagination="pagination"
              @del="sendDel"
              :tableColumnB="tableColumnB"
            ></jcTable>
          </div>
        </el-tab-pane>
        <el-tab-pane name="2" label="数据浏览">
          <p>物料库存锁定一览表</p>
          <sjTable
            :tableData="tableData1"
            :pageSize="10"
            data-url="api/table"
            @func="getMsgFormSon"
            :tableColumn="tableColumn"
            :pageTotal="13"
          ></sjTable>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      v-dialogDrag
      width="60%"
      :before-close="handleClose"
    >
      <tempTwo @sendSelectData="childSelectData"></tempTwo>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="dialogVisible = false,coverData()">确 定</el-button>
        <el-button size="small" type="primary" @click="dialogVisible = false,appendData()">追 加</el-button>
        <el-button size="small" type="primary" @click="dialogVisible = false">当前行插入</el-button>
        <el-button size="small" type="primary" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import jcTable from "@/views/pages/table/templateonejc";
import sjTable from "@/views/pages/table/templateonesj";
import { getTableDataA } from "@/api/ckgl/ckglapi.js";
import tempTwo from "@/views/pages/template/templatetwo";

export default {
  data() {
    return {
      // 是否分页
      pagination: true,
      selectData: [],
      kcxxsda001: "",
      kcxxsda002: "",
      kcxxsda003: "",
      kcxxsda004: "",
      kcxxsda005: "",
      kcxxsda006: "",
      kcxxsda007: "",
      kcxxsda015: "",
      templateListA: [],
      dialogVisible: false, //弹出框是否显示
      delData: "", //复选框选中数据
      showtableIndex: 0, //当前数据条数
      changePagePrevBtn: true,
      changePageNextBtn: false,
      newBtn: false, //新增
      editBtn: false, //修改
      deleteBtn: false, //删除
      selectBtn: false, //查询
      checkBtn: false, //审核
      commitBtn: true,
      cancelBtn: true,
      pass: false, //审核状态
      btnFlag: 0, //按钮
      editableTabsValue: "2",
      // 数据浏览分页参数
      sjCurrentPage: 1,
      sjPageSize: 10,
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
          sort: true,
          search: true
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
    this.getTableData();
    this.decisionBtn();
  },
  methods: {
    a() {
      alert(111);
    },
    getTableData() {
      let param = {
        pageSize: this.sjPageSize,
        currentPage: this.sjCurrentPage
      };
      // let param = new URLSearchParams();
      // param.append("pageSize", this.sjPageSize);
      // param.append("currentPage", this.sjCurrentPage);
      getTableDataA(param).then(response => {
        //数据浏览 赋值
        this.tableData1 = response.data;
        //初始化单头赋值
        this.showtableData();
        //判断单头数据是否小于二
        this.countTableData();
        //查询单身
        this.queryB();
      });
      // this.$axios({
      //   method: "post",
      //   url: "http://localhost:8086/kcxxsd/selectStkc",
      //   data: param
      // }).then(response => {
      //   //数据浏览 赋值
      //   this.tableData1 = response.data.data;
      //   //初始化单头赋值
      //   this.showtableData();
      //   //判断单头数据是否小于二
      //   this.countTableData();
      //   //查询单身
      //   this.queryB();
      // });
    },
    // 获取弹窗选择的数据
    childSelectData(val) {
      this.selectData = val;
    },
    coverData() {
      this.tableData = this.selectData;
      this.selectData = [];
    },
    appendData() {
      this.tableData = this.tableData.concat(this.selectData);
      this.selectData = [];
      console.log(this.tableData);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //数据浏览 点击指定行，给基础数据赋值
    getMsgFormSon(val1, val2, val3, showtableIndex, pageSize, currentPage) {
      this.kcxxsda001 = val1.kcxxsda001;
      this.kcxxsda002 = val1.kcxxsda002;
      this.kcxxsda003 = val1.kcxxsda003;
      this.kcxxsda004 = val1.kcxxsda004;
      this.kcxxsda005 = val1.kcxxsda005;
      this.kcxxsda006 = val1.kcxxsda006;
      this.kcxxsda007 = val1.kcxxsda007;
      this.kcxxsda015 = val1.kcxxsda015;
      //标签页 基础信息/数据浏览
      this.editableTabsValue = val2;
      this.delData = val3;

      this.showtableIndex = showtableIndex;
      this.sjCurrentPage = currentPage;
      this.sjPageSize = pageSize;
    },
    //复选框点击
    sendDel(val) {
      this.delData = val;
    },
    addRow() {
      let row = {};
      this.tableData.push(row);
      // console.log(this.tableData);
    },
    removeRow() {
      if (this.delData) {
        this.delData.forEach(data => {
          this.tableData.forEach((val, i) => {
            if (data.index == val.index) {
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
        this.showtableDataChild(this.showtableIndex);
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
    //查询单身
    showtableDataChild() {
      this.kcxxsda001 = this.tableData1[this.showtableIndex].kcxxsda001;
      this.kcxxsda002 = this.tableData1[this.showtableIndex].kcxxsda002;
      this.kcxxsda003 = this.tableData1[this.showtableIndex].kcxxsda003;
      this.kcxxsda004 = this.tableData1[this.showtableIndex].kcxxsda004;
      this.kcxxsda005 = this.tableData1[this.showtableIndex].kcxxsda005;
      this.kcxxsda006 = this.tableData1[this.showtableIndex].kcxxsda006;
      this.kcxxsda007 = this.tableData1[this.showtableIndex].kcxxsda007;
      this.kcxxsda015 = this.tableData1[this.showtableIndex].kcxxsda015;
    },
    //查询
    queryData() {
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
    addData() {
      this.tableData = [];
      this.showtableData;
      this.addRow();
    },
    queryB() {
      let param = new URLSearchParams();
      param.append("kcxxsda001", this.kcxxsda001);
      var kcxxsda = {
        kcxxsda001: "这是一个单号",
        kcxxsda002: "this.kcxxsda002",
        kcxxsda003: "this.kcxxsda003"
      };

      param.append("kcxxsda001", this.kcxxsda001);
      // param.append("tableB", JSON.stringify(this.tableColumnB));
      param.append("kcxxsda", JSON.stringify(kcxxsda));
      console.log(kcxxsda);
      this.$axios({
        method: "post",
        url: "http://localhost:8086/kcxxsd/listB",
        data: param
      }).then(response => {
        this.tableData = response.data.data;
      });
    },
    //查询单身
    showtableDataChild() {
      this.kcxxsda001 = this.tableData1[this.showtableIndex].kcxxsda001;
      this.kcxxsda002 = this.tableData1[this.showtableIndex].kcxxsda002;
      this.kcxxsda003 = this.tableData1[this.showtableIndex].kcxxsda003;
      this.kcxxsda004 = this.tableData1[this.showtableIndex].kcxxsda004;
      this.kcxxsda005 = this.tableData1[this.showtableIndex].kcxxsda005;
      this.kcxxsda006 = this.tableData1[this.showtableIndex].kcxxsda006;
      this.kcxxsda007 = this.tableData1[this.showtableIndex].kcxxsda007;
      this.kcxxsda015 = this.tableData1[this.showtableIndex].kcxxsda015;
    },
    //新增功能
    addData() {
      //this.templateListA = this.tableData1;

      //this.showtableData();
      this.btnFlag = 1;
      this.inputStatusBtn();

      this.editableTabsValue = "1";
      this.tableData = [];
      this.addRow();

      this.kcxxsda001 = "";
      this.kcxxsda002 = "";
      this.kcxxsda003 = "";
      this.kcxxsda004 = "";
      this.kcxxsda005 = "";
      this.kcxxsda006 = "";
      this.kcxxsda007 = "";
      this.kcxxsda015 = "";
    },
    //修改

    editData() {
      this.editableTabsValue = "1";
      this.btnFlag = 2;
      this.inputStatusBtn();
    },
    //删除
    delRowData() {
      // 删除提示
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //删除请求
          alert("删除" + this.kcxxsda001);
          this.tableData1.splice(this.showtableIndex, 1);
          this.countTableData();
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
        .catch(() => {});
    },
    //查询功能
    queryData() {
      //this.templateListA = this.tableData1;
      this.editableTabsValue = "1";
      this.tableData = [];
      this.addRow();
      this.btnFlag = 3;
      this.inputStatusBtn();
      this.kcxxsda001 = "";
      this.kcxxsda002 = "";
      this.kcxxsda003 = "";
      this.kcxxsda004 = "";
      this.kcxxsda005 = "";
      this.kcxxsda006 = "";
      this.kcxxsda007 = "";
      this.kcxxsda015 = "";
      alert(this.deleteBtn);
    },

    //确定按钮
    commitMed() {
      this.checkBtn = false;
      if ((this.btnFlag = 1)) {
        //执行添加请求 添加成功，将当前数据放在第一条，
        //this.countTableData();
        var kcxxsda = {
          kcxxsda001: this.kcxxsda001,
          kcxxsda002: this.kcxxsda002,
          kcxxsda003: this.kcxxsda003,
          kcxxsda004: this.kcxxsda004,
          kcxxsda005: this.kcxxsda005,
          kcxxsda006: this.kcxxsda006,
          kcxxsda007: this.kcxxsda007,
          kcxxsda015: this.kcxxsda015
        };
        this.tableData1.splice(this.sjPageSize - 1, 1);
        this.tableData1.push(kcxxsda);
        //this.tableData1 = this.templateListA;
        this.showtableIndex = this.sjPageSize - 1;
        this.preNextPage();
        this.decisionBtn();
        this.editBtn = false;
        this.deleteBtn = false;
        this.tableData.forEach(el => {
          el.kcxxsdb001 = this.kcxxsda001;
          el.kcxxsdb002 = el.index + 1;
        });
        console.log(this.tableData);

        this.queryB();
        this.btnFlag = 0;
        // alert(this.changePagePrevBtn + "&&" + this.changePageNextBtn);
      } else if (btnFlag == 2) {
        //修改
        this.tableData.forEach(el => {
          el.kcxxsdb001 = this.kcxxsda001;
          el.kcxxsdb002 = el.index + 1;
        });
        console.log(this.tableData);
        this.btnFlag = 0;
      } else if (btnFlag == 3) {
        //查询
        console.log(this.tableData[0]);
        this.btnFlag = 0;
      }
    },

    //取消
    cancelMed() {
      this.cancelBtn = true;
      this.commitBtn = true;
      let param = {
        pageSize: this.sjPageSize,
        currentPage: this.sjCurrentPage
      };
      getTableDataA(param).then(response => {
        this.btnFlag = 0;
        //console.log(response.data);
        //数据浏览 赋值
        this.tableData1 = response.data;
        alert(this.showtableIndex);
        this.showtableDataChild(this.showtableIndex);
        this.preNextPage();
        this.countTableData();
        this.checkBtn = false;
        this.newBtn = false;
        this.selectBtn = false;
        this.isCheck();
      });
    },
    //新增，修改，查询按钮状态
    inputStatusBtn() {
      this.pass = false;
      this.newBtn = true;
      this.editBtn = true;
      this.deleteBtn = true;
      this.selectBtn = true;
      this.checkBtn = true;
      this.changePageNextBtn = true;
      this.changePagePrevBtn = true;
      this.commitBtn = false;
      this.cancelBtn = false;
    },
    decisionBtn() {
      this.newBtn = false;
      this.selectBtn = false;
      this.commitBtn = true;
      this.cancelBtn = true;
    },
    //上下一条按钮状态判断
    countTableData() {
      if (this.tableData1.length < 2) {
        this.changePagePrevBtn = true;
        this.changePageNextBtn = true;
      }
    },
    preNextPage() {
      //alert(this.showtableIndex + "&&" + this.templateListA.length);
      if (this.showtableIndex >= 0 && this.tableData1.length > 1) {
        this.changePagePrevBtn = false;
      }
      if (
        this.showtableIndex < this.tableData1.length - 1 &&
        this.tableData1.length > 1
      ) {
        this.changePageNextBtn = false;
      }
      // alert(this.changePagePrevBtn + "&&" + this.changePageNextBtn);
    },
    // 审核方法
    checkPass() {
      this.pass = !this.pass;
    },
    //判断当前单头审核状态
    isCheck() {
      if (this.tableData1 == []) {
        this.pass = false;
        return;
      }
      //alert(this.tableData1[this.showtableIndex].kcxxsda008);
      if (this.btnFlag == 0) {
        if (this.tableData1[this.showtableIndex].kcxxsda008 == "Y") {
          this.pass = true;
          this.editBtn = true;
          this.deleteBtn = true;
        } else {
          this.pass = false;
          this.editBtn = false;
          this.deleteBtn = false;
        }
      }
    }
  },

  watch: {
    kcxxsda001() {
      if (this.kcxxsda001 != "") {
        this.isCheck();
      }
      if (this.pass == false && this.kcxxsda001 != "" && this.btnFlag == 0) {
        this.editBtn = false;
        this.deleteBtn = false;
      }
      this.queryB();
    },
    sjCurrentPage() {
      this.getTableData();
    },
    sjPageSize() {
      this.getTableData();
    }
  },
  components: {
    jcTable,
    sjTable,
    tempTwo
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
.jc-header p {
  background: #409eff;
  padding: 10px;
  margin: 20px 0 10px 0;
  color: #fff;
}
.date-block {
  border: 1px solid #dcdfe6;
  color: #909399;
  background: #f5f7fa;
  border-radius: 4px 0 0 4px;
  padding: 8px 20px;
  vertical-align: middle;
  font-size: 14px;
  white-space: nowrap;
}
.date-input {
  display: flex;
}
.date-input .el-date-editor {
  flex-grow: 1;
}
</style>

<style>
.template-one .el-row {
  margin: 5px 0;
}
.template-one .el-dialog__body {
  padding: 10px 20px;
}
.template-one .el-dialog__footer {
  text-align: center;
}
</style>
