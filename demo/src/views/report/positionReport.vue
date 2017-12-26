<template>
    <div class="positionReport">
        <el-card class="box-card">
            <div slot="header">
                <el-row :gutter="15">
                    <el-col :span="24" class="header">
                        <el-col :span="6">
                            <i class="fa fa-list" aria-hidden="true"></i>
                            <span>&nbsp;{{$t('indexLang.positionReport')}}</span>
                        </el-col>
                        <el-col :span="18" class="search">
                            <el-input :placeholder="$t('placeholder.enterKeyword')" v-model="search">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                            <el-date-picker 
                                v-model="dateValue"
                                type="daterange"
                                align="right"
                                unlink-panels
                                :range-separator="$t('button.to')" :start-placeholder="$t('button.startDate')" :end-placeholder="$t('button.endDate')">
                            </el-date-picker>
                        </el-col>
                    </el-col>
                </el-row>
            </div>
            <div class="positionList" ref="positionList" v-loading="loading">
                <el-table :data="tableData" style="width: 100%" stripe border height="450">
                    <el-table-column v-for="(item,index) in tableHead" :key="index" :label="item.labelName" :prop="item.propName" :min-width="item.width"></el-table-column>
                </el-table>
                <div class="page">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10,15,20,30 ,50,100,200]"
                        :page-size="tablePageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
import { getPositionList } from "@/api/report/report"
export default {
    name:'positionReport',
      data() {
        return {
            search: '',
            tableData: [],
            status: false,
            loading: false,
            total: 0,
            currentPage: 1,
            tablePageSize: 10,
            dateValue: '',
            pickerOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, 
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, 
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            },
            tableHead: [
				{ propName: 'TICKET',labelName: this.$t('table.ticket'),width: '100' },
				{ propName: 'LOGIN',labelName: this.$t('table.account'),width: '80' },
				{ propName: 'NAME',labelName: this.$t('table.name'),width: '100' },
				{ propName: 'OPEN_TIME',labelName: this.$t('table.positionOpentime'),width: '150' },
				{ propName: 'CMD',labelName: this.$t('table.type'),width: '100' },
				{ propName: 'SYMBOL',labelName: this.$t('table.symbol'),width: '100' },
				{ propName: 'VOLUME',labelName: this.$t('indexLang.volume'),width: '100' },
				{ propName: 'OPEN_PRICE',labelName: this.$t('table.openprice'),width: '100' },
				{ propName: 'SL',labelName: this.$t('table.stoploss'),width: '100' },
				{ propName: 'TP',labelName: this.$t('table.topprofit'),width: '100' },
				{ propName: 'COMMISSION',labelName: this.$t('table.commiss'),width: '100' },
				{ propName: 'SWAPS',labelName: this.$t('table.swaps'),width: '100' },
				{ propName: 'PROFIT',labelName: this.$t('table.profit'),width: '100' }
			]
        }
    },
    created() {
        this.getPositionList();   
    },
    mounted(){
        
    },
    methods: {
        handleCurrentChange(page){
            this.currentPage = page;
            this.getPositionList();
		},
		handleSizeChange(pageSize){
            this.currentPage = 1;
            this.tablePageSize = pageSize;
            this.getPositionList();
        },
        /* 获取所有用户列表 */
        getPositionList(){
            let params = {
                page: this.currentPage,
                page_size: this.tablePageSize
            }
            this.loading = true;
            this.tableData = [];
            getPositionList(params).then( data => {
                console.log(data);
                this.loading = false;
                if(data.code == 0){
                    this.tableData = data.data.row;
                    this.total = data.data.total*1;
                }
            })
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.positionReport{
    .header{
        height: 40px;
        line-height: 40px;
    }
    .btn{
        text-align:right;
    }
    .search{
        padding-right: 0px !important;
        text-align: right;
    }
    .positionList{
        .page{
            text-align: center;
            margin-top: 20px;
        }
    }

}
</style>
<style>
.positionReport .el-card__header{
    padding: 10px 20px;
}
.positionReport .el-card__header{
    padding: 10px 20px;
}
.header .el-input{
    width: 250px;
}
.positionList .el-table th{
	background: rgb(223, 240, 216);
}
.positionList .el-table td,.positionList .el-table th{
	padding: 6px 0px;
}
.el-menu-item i{
    color: #fff;
}
</style>

