<template>
    <div class="home">
      i am home2
      <jTable
      :tableData="tableData"
      :name="tableName"
      :pageSize="10"
      dataurl="api/table"
      >
      </jTable>
    </div>
</template>

<script>
    import jTable from "@/views/pages/table/index";
    import {getTable} from '@/api/api.js'
    export default {
        props: {
        },
        data(){
          return{
              tableName:"table1",
              tableData: [{
                  date: '2016-05-02',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1518 弄'
              }, {
                  date: '2016-05-04',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1517 弄'
              }, {
                  date: '2016-05-01',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1519 弄'
              }, {
                  date: '2016-05-03',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1516 弄'
              }]
          }
        },
        mounted(){
            getTable({
                type:0,
                name:111
            })
        },
        methods:{

        },
        components:{
            jTable
        }
    };
</script>


<style>

</style>

