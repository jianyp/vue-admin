<template>
  <div class="template-two">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="查询条件" name="1">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="活动名称">
                <el-input v-model="form.nameq"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="活动区域">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div style="text-align:center">
            <el-button type="primary"  size="mini" icon="el-icon-search" @click="onSubmit(form)">查询</el-button>
            <el-button  type="primary"  size="mini" icon="el-icon-refresh-left" @click="reSet('form')">重置</el-button>
          </div>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="产品信息选择" name="2">
        <jcTable
          :tableData="tableData"
          :pageSize="10"
          :tableColumnB="tableColumnB"
          @del="getSelectRow"
        ></jcTable>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import jcTable from "@/views/pages/table/templateonesearch";
import sjTable from "@/views/pages/table/templateonesj";

export default {
  data() {
    return {
      activeNames: ["1", "2"],
      tableData: [
        {kcxxsdb003:"单号1",kcxxsdb004:"产品名称"},{kcxxsdb003:"单号2",kcxxsdb004:"产品名称"},{kcxxsdb003:"单号3",kcxxsdb004:"产品名称"}
      ],
      form: {
        name:"",
        nameq:"",
        region:""
      },
      selectData:[],
      //单身表格列名
      tableColumnB: [
        {
          name: "产品编号",
          width: "",
          prop: "kcxxsdb003",
          show: true,
          lock: false,
          sort: true
        },
        {
          name: "产品名称",
          width: "",
          prop: "kcxxsdb004",
          show: true,
          lock: false,
          sort: true
        },
        {
          name: "仓库编号",
          width: "",
          prop: "kcxxsdb005",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "收货批号",
          width: "",
          prop: "kcxxsdb006",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "产品单位",
          width: "",
          prop: "kcxxsdb007",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "数量",
          width: "",
          prop: "kcxxsdb008",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "储位编号",
          width: "",
          prop: "kcxxsdb014",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "货架编号",
          width: "",
          prop: "kcxxsdb015",
          show: true,
          lock: true,
          sort: true
        },
        {
          name: "内部条码",
          width: "",
          prop: "kcxxsdb016",
          show: true,
          lock: true,
          sort: true
        }
      ]
    };
  },
  mounted() {},
  methods:{
    handleChange(){},
    reSet(formName) {
      this.form={}
    },
    onSubmit(form){
      console.log(form)
    },
    getSelectRow(row){
      this.selectData = row;
      this.$emit('sendSelectData',this.selectData);
    }

  },

  components: {
    jcTable
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<style>
.template-two .el-select{
  display: block;
}
.template-two .el-collapse-item__header{
  font-size: 16px;
}
</style>
