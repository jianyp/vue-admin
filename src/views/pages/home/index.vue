<template>
    <div class="home">
      <div>
        <el-button @click="newtableVisible = true">新增主表</el-button>
      </div>
      <eTable
        :tableData="tableData"
        :name="tableName"
        :pageSize="10"
        dataurl="api/table"
      >
      </eTable>

      <el-dialog
        title="新增主表"
        :visible.sync="newtableVisible"
        v-dialogDrag
        width="30%"
        center>
        <div>
          唯一标识：
          <el-input v-model="id"></el-input>
        </div>
        <div>
          表名：
          <el-input v-model="tableName"></el-input>
        </div>

    <el-button @click="newtableVisible = false">取 消</el-button>
    <el-button type="primary" @click="newtableVisible = false">确 定</el-button>
      </el-dialog>
    </div>
</template>

<script>
    import eTable from "@/views/pages/table/index";
    export default {
        props: {
        },
        data(){
          return{
              newtableVisible:false,
              tableData: [],
              id:"",
              tableName:""
          }
        },
        methods:{
            formatter(row, column) {
                return row.address;
            }
        },
        components:{
          eTable
        }
    };
</script>


<style>

</style>

