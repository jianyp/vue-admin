<template>
    <div class="home">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        :default-sort = "{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          v-for="(item,index) in tableColumn" :key="index"
          :label=item.name
          :sortable=item.sort
          :prop=item.prop
          :resizable= !item.lock
          :width=item.width
          :formatter=item.formatter
        >

        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        name:"jTable",
        props: {
            name:{
                type:String,
            },
            tableData:[Object,Array]
        },
        data(){
          return{
            tableColumn:[{
                name:"日期",
                width:"120",
                prop:"date",
                show:true,
                lock:false,
                sort:true,
            },
            {
                name:"姓名",
                width:"120",
                prop:"name",
                show:true,
                lock:true,
                sort:true,
            },
            {
                name:"地址",
                width:"120",
                prop:"address",
                show:true,
                lock:true,
                sort:true,
            }],
          }
        },
        methods:{
            formatter(row, column) {
                return row.address;
            }
        },
        components:{
        }
    };
</script>


<style>

</style>

