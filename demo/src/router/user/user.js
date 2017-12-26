
import index from '../../views/user/index.vue'
import allUser from '../../views/user/allUser.vue'
import retailUser from '../../views/user/retailUser.vue'
import salesManager from '../../views/user/salesManager.vue'
import sales from '../../views/user/sales.vue'
import masterIB from '../../views/user/masterIB.vue'
import subIB from '../../views/user/subIB.vue'

let userRouter = [
    {
        path: 'index',
        name: '首页',
        meta: {
            index: '1',
        },
        component: index
    },{
        path: 'allUser',
        name: '查看所有用户',
        meta: {
            index: '2',
        },
        component: allUser
    }
];
export default userRouter
