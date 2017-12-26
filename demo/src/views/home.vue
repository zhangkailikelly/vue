<template>
    <div class="home">
        <div class="header">
            <el-row :gutter="15">
                <!-- logo START -->
                <el-col :span="3">
                    <img src="../assets/img/svs_logo.jpg" style="height: 60px;">
                </el-col>
                <!-- logo END -->
                <!-- 导航栏 START -->
                <el-col :span="14" class="head-menu">
                    <el-menu
                        :default-active="activeIndex"
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelect"
                        background-color="black"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        >
                        <!-- <li v-for="(item,index) in navData" :key="index" v-if="item.status"> -->
                        <li v-for="(item,index) in navData" :key="index" v-if="item.status">
                            <el-submenu :index="item.index" v-if="item.children">
                                <template slot="title">
                                    <span :class="item.class" aria-hidden="true"></span>
                                    <span style="vertical-align: middle;">{{item.label}}</span>
                                </template>
                                <el-menu-item v-for="(val,j) in item.children" :key="j" :index="val.index" @click="jump(val.index,val.path)" v-if="val.status">{{val.label}}
                                    <!-- v-if="val.status" -->
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item :index="item.index" v-else @click="jump(item.index,item.path)">
                                <template slot="title">
                                    <i :class="item.class" aria-hidden="true"></i>
                                    <span style="vertical-align: middle;">{{item.label}}</span>
                                </template>
                            </el-menu-item>
                        </li>
                    </el-menu>
                </el-col>
                <!-- 导航栏 END -->
                <!-- 操作 START -->
                <el-col :span="7" class="head-operation">
                    <span @click="changeLanguage">
                        <el-tag type="danger"><span v-if="isEnglish">EN</span><span v-else>CN</span></el-tag>
                    </span>
                    <!-- <el-select v-model="operation" placeholder="请选择操作">
                        <el-option v-for="item in operationOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select> -->
                    <el-dropdown style="margin-left:60px;">
                        <span class="el-dropdown-link">
                            <img width="30" style="vertical-align: middle;" src="../assets/img/login_img.jpg" />
                            &nbsp;{{login_username}}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>控制面板</el-dropdown-item>
                            <el-dropdown-item>系统公告</el-dropdown-item>
                            <el-dropdown-item>推广链接</el-dropdown-item>
                            <el-dropdown-item>修改密码</el-dropdown-item>
                            <el-dropdown-item>同步数据</el-dropdown-item>
                            <el-dropdown-item>全局缓存</el-dropdown-item>
                            <el-dropdown-item divided><span @click="loginOut">退出登录</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <!-- 操作 END -->
            </el-row>
        </div>
        <div class="routerView">
            <transition name="slide-fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
        <div class="footer">
            <p>{{footerInfo}}</p>
            <p>Email：<a href="mailto:cn.support@svsfx.com">cn.support@svsfx.com</a> | Tel: 400-606-2000 |
                Address: London | <a href="http://www.svsfx.com" target="_blank">www.svsfx.com</a></p>
        </div>
    </div>
</template>
<script>
import { inArray , getSession } from "@/utils/utils"
import locale from 'element-ui/lib/locale'
export default {
    name: 'home',
    data() {
        return {
            activeIndex: '',
            operationOptions: [
                {label: '控制面板',value: '1'},
                {label: '系统公告',value: '2'},
                {label: '推广链接',value: '3'},
                {label: '修改密码',value: '4'},
                {label: '同步数据',value: '5'},
                {label: '全局缓存',value: '6'},
                {label: '退出登录',value: '7'}
            ],
            operation: '',
            navData: [
                {
                    label: this.$t('indexLang.index'),
                    index: '1',
                    path: 'index',
                    class: 'fa fa-bank',
                    status: inArray('manage_index',getSession('authList'))
                },
                {
                    label: this.$t('indexLang.User'),
                    index: '2',
                    class: 'fa fa-users',
                    path: 'allUser',
                    status: inArray('user_index',getSession('authList'))
                },
                {
                    label: this.$t('indexLang.Account'),
                    index: '3',
                    class: 'fa fa-user',
                    status: inArray('account_index',getSession('authList')),
                    children: [
                        {
                            label: this.$t('indexLang.allAccount'),
                            index: '3-1',
                            path: 'allAccount',
                            status: inArray('account_index',getSession('authList'))
                        },
                        {
                            label: this.$t('indexLang.introBroker'),
                            index: '3-2',
                            path: 'introduceBroker',
                            status: inArray('my_brokers',getSession('authList'))
                        },
                        {
                            label: this.$t('indexLang.retailAccount'),
                            index: '3-3',
                            path: 'retailAccount',
                            status: inArray('my_retails',getSession('authList'))
                        }
                    ]
                },
                {
                    label: this.$t('indexLang.Report'),
                    index: '4',
                    class: 'fa fa-th',
                    status: inArray('self_report',getSession('authList')),
                    children: [
                        {
                            label: this.$t('indexLang.personalReport'),
                            index: '4-1',
                            path: 'personalReport',
                            status: inArray('self_report',getSession('authList'))
                        },
                        {
                            label: this.$t('indexLang.ibReport'),
                            index: '4-2',
                            path: 'IBReport',
                            status: inArray('broker_report',getSession('authList'))
                        },
                        {
                            label: this.$t('indexLang.retailAccount'),
                            index: '4-3',
                            path: 'retailClient',
                            status: inArray('retail_report',getSession('authList'))
                        },
                        {
                            label: this.$t('indexLang.positionReport'),
                            index: '4-4',
                            path: 'positionReport',
                            status: inArray('trade_report',getSession('authList'))
                        },
                        {
                            label: this.$t('indexLang.tradingHistory'),
                            index: '4-5',
                            path: 'tradingHistory',
                            status: inArray('trade_history_report',getSession('authList'))
                        }
                    ]
                },
                {
                    label: this.$t('indexLang.Setting'),
                    index: '5',
                    class: 'fa fa-wrench',
                    status: inArray('settings_index',getSession('authList')),
                    children: [
                        {
                            label: this.$t('indexLang.discountSet'),
                            index: '5-1',
                            path: 'rebateSetting',
                            status: inArray('rebate_settings',getSession('authList'))
                        },
                        {
                            label: this.$t('indexLang.groupSet'),
                            index: '5-2',
                            path: 'userGroup',
                            status: inArray('user_group',getSession('authList'))
                        },
                        {
                            label: this.$t('indexLang.operationLog'),
                            index: '5-3',
                            path: 'operationLog',
                            status: true
                        }
                    ]
                },
            ],
            footerInfo: this.$t('indexLang.fotter'),
            isEnglish: sessionStorage.getItem('language') == 'cn' ? true : false
        }
    },
    computed: {
        /* 记录登录用户名 */
        login_username(){
            let userSession = JSON.parse(sessionStorage.getItem('user_info'));
            return userSession.LOGIN;
        },
    },
    mounted(){
        console.log(inArray('statistic',getSession('authList')));
        this.activeIndex = this.$route.meta.index;
        /* this.$refs.indexRef.tabIndex = 1;
        this.$refs.userRef.tabIndex = 1;
        this.$refs.accRef.tabIndex = 1;
        this.$refs.mentRef.tabIndex = 1;
        this.$refs.windowRef.tabIndex = 1; */
    },
    watch: {
        $route(newVal,oldVal){
            console.log(newVal);
            this.activeIndex = newVal.meta.index;
        }
    },
    methods: {
        handleSelect(v){
            console.log(v);
        },
        /* 路由跳转 */
        jump(index,path){
            console.log('路由跳转：'+path);
            this.activeIndex = index;
            this.$router.push('/'+path);
        },
        /* 切换语言 */
        changeLanguage(){
            this.isEnglish = !this.isEnglish;
            if(this.isEnglish){
                this.$i18n.locale = 'cn';
                sessionStorage.setItem('language','cn');
                window.location.reload();
            }else{
                this.$i18n.locale = 'en';
                sessionStorage.setItem('language','en');
                window.location.reload();
            }
        },
        /* 退出登录 */
        loginOut(){
            this.$router.push({name:'登录'});
        },
    }
}
</script>

<style scoped>
.header{
    height: 60px;
    background: black;
    min-width: 1120px;
    /* overflow: auto; */
}
.routerView {
    height: 100%;
    /* padding: 20px 20px 50px 20px; */
    padding: 20px;
}
.footer{
    padding: 10px 0px;
    position: fixed;
    height: 40px;
    width: 100%;
    left: 0;
    bottom: 0;
    font-size: 12px;
    color: #b8b8b8;
    text-align: center;
    background: #232a34;
    z-index: 3;
}
.footer a{
    text-decoration:none;
    color:#b8b8b8;
}
.el-dropdown-link{
    color: #fff;
    cursor: pointer;
}
</style>
<style>
.header .el-row{
    margin-right: 0px !important;
}
.head-menu .el-menu--horizontal{
    border: none;
}
/* .head-menu .el-menu--horizontal .el-submenu .el-submenu__title{
    height: 75px;
    line-height: 75px;
} */
.head-menu .el-menu--horizontal .el-menu-item:hover{
    background: rgb(84, 92, 100) !important;
}
.head-menu .el-menu--horizontal .el-submenu .el-submenu__title:hover{
    background: rgb(84, 92, 100) !important;
}
.head-menu .el-menu--horizontal .el-submenu .el-submenu__icon-arrow{
    margin-top: 0px;
}
.head-operation{
    margin-top: 15px;
    text-align: center;
}
.head-operation .el-tag--danger{
    background: red;
    color: #fff;
    cursor: pointer;
    width: 40px;
}
.head-operation .el-input__inner{
    height: 32px;
}
.head-menu .el-menu--horizontal .el-submenu>.el-menu{
    top: 60px;
    padding: 5px 0;
}
.head-menu .el-submenu .el-menu-item{
    min-width: 100px;
}
/* .el-submenu__title i{
    color: rgb(255, 208, 75);
} */
.el-table{
    font-size: 12px;
}
.tableHeight .el-table td,.tableHeight .el-table th{
	padding: 5px 0px;
}
.tabHeight .el-table td,.tabHeight .el-table th{
	padding: 8px 0px;
}
.historyDialog .el-dialog__body{
	padding: 0px 20px 10px 20px;
}
.historyDialog .el-dialog__header{
	padding: 20px 20px 0px 20px ;
}
.userDialog .el-dialog__body{
	padding-top: 10px;
	padding-bottom: 20px;
}
.userDialog .el-dialog__header{
	padding-bottom: 15px;
	border-bottom: 1px solid #e5e5e5;
}
</style>
