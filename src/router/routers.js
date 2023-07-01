import Main from '@/components/main'

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hideInMenu: true,
    },
    component: () => import('@/view/login/index.vue'),
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: false,
      notCache: true,
    },
    children: [
      {
        path: '/',
        name: 'home',
        meta: {
          hideInMenu: false,
          title: '首页总览',
          notCache: true,
          icon: 'md-home',
        },
        component: () => import('@/view/home'),
      },
    ],
  },
  {
    path: '/cashier',
    name: 'cashier',
    meta: {
      icon: 'ios-cart',
      title: '收银订单',
      showAlways: true,
    },
    component: Main,
    children: [
      {
        path: 'index',
        name: 'cashier.index',
        meta: {
          icon: '',
          title: '收银开单',
        },
        component: () => import('@/view/cashier/cashier'),
      },
      {
        path: 'order',
        name: 'cashier.order',
        meta: {
          icon: '',
          title: '订单管理',
        },
        component: () => import('@/view/cashier/order'),
      },
    ],
  },
  {
    path: '/appointment',
    name: 'appointment',
    meta: {
      icon: 'md-timer',
      title: '预约排控',
      showAlways: true,
    },
    component: Main,
    children: [
      {
        path: 'card',
        name: 'appointment.card',
        meta: {
          icon: '',
          title: '项目预约',
        },
        component: () => import('@/view/appointment/card'),
      },
      {
        path: 'course',
        name: 'appointment.course',
        meta: {
          icon: '',
          title: '课程预约',
        },
        component: () => import('@/view/appointment/course'),
      },
      {
        path: 'staff-schedule',
        name: 'appointment.staff-schedule',
        meta: {
          icon: '',
          title: '员工排班',
        },
        component: () => import('@/view/appointment/staff-schedule'),
      },
      {
        path: 'online-qr',
        name: 'appointment.online-qr',
        meta: {
          icon: '',
          title: '线上预约二维码',
        },
        component: () => import('@/view/appointment/online-qr'),
      },
    ],
  },
  {
    path: '/vip',
    name: 'vip',
    meta: {
      icon: 'ios-contact',
      title: '会员管理',
      showAlways: true,
    },
    component: Main,
    children: [
      {
        path: 'index',
        name: 'vip.index',
        meta: {
          icon: '',
          title: '会员管理',
        },
        component: () => import('@/view/vip/index'),
      },
      {
        path: 'business-track',
        name: 'vip.business-track',
        meta: {
          icon: '',
          title: '业务跟踪',
        },
        component: () => import('@/view/vip/business-track'),
      },
    ],
  },
  {
    path: '/inventory',
    name: 'inventory',
    meta: {
      icon: 'md-list-box',
      title: '商品库存',
      showAlways: true,
    },
    component: Main,
    children: [
      {
        path: 'overview',
        name: 'inventory.overview',
        meta: {
          icon: '',
          title: '商品总览',
        },
        component: () => import('@/view/inventory/overview'),
      },
      {
        path: 'inventory',
        name: 'inventory.inventory',
        meta: {
          icon: '',
          title: '库存管理',
        },
        component: () => import('@/view/inventory/inventory'),
      },
      {
        path: 'put-storage',
        name: 'inventory.put-storage',
        meta: {
          icon: '',
          title: '商品入库',
        },
        component: () => import('@/view/inventory/put-storage'),
      },
      {
        path: 'out-storage',
        name: 'inventory.out-storage',
        meta: {
          icon: '',
          title: '商品出库',
        },
        component: () => import('@/view/inventory/out-storage'),
      },
      {
        path: 'out-storage',
        name: 'inventory.allocate',
        meta: {
          icon: '',
          title: '调拨管理',
        },
        component: () => import('@/view/inventory/allocate'),
      },
      {
        path: 'out-storage',
        name: 'inventory.take-stock',
        meta: {
          icon: '',
          title: '库存盘点',
        },
        component: () => import('@/view/inventory/take-stock'),
      },
      {
        path: 'out-storage',
        name: 'inventory.cost',
        meta: {
          icon: '',
          title: '成本核算',
        },
        component: () => import('@/view/inventory/cost'),
      },
      {
        path: 'base-set',
        name: 'inventory.base-set',
        meta: {
          icon: '',
          title: '基础设置',
        },
        component: () => import('@/view/inventory/base-set'),
      },
    ],
  },
  {
    path: '/statistics',
    name: 'statistics',
    meta: {
      icon: 'md-pie',
      title: '数据统计',
      showAlways: true,
    },
    component: Main,
    children: [
      {
        path: 'business-data',
        name: 'statistics.business-data',
        meta: {
          icon: '',
          title: '经营数据',
        },
        component: () => import('@/view/statistics/business-data'),
      },
      {
        path: 'staff-data',
        name: 'statistics.staff-data',
        meta: {
          icon: '',
          title: '员工数据',
        },
        component: () => import('@/view/statistics/staff-data'),
      },
      {
        path: 'target',
        name: 'statistics.target',
        meta: {
          icon: '',
          title: '目标管理',
        },
        component: () => import('@/view/statistics/target'),
      },
      {
        path: 'statement',
        name: 'statistics.statement',
        meta: {
          icon: '',
          title: '各类报表',
        },
        component: () => import('@/view/statistics/statement'),
      },
      {
        path: 'diy-data',
        name: 'statistics.diy-data',
        meta: {
          icon: '',
          title: '自定义数据',
        },
        component: () => import('@/view/statistics/diy-data'),
      },
    ],
  },
  {
    path: '/market',
    name: 'market',
    meta: {
      icon: 'ios-keypad',
      title: '营销中心',
      showAlways: true,
    },
    component: Main,
    children: [
      {
        path: 'app-center',
        name: 'market.app-center',
        meta: {
          icon: '',
          title: '应用中心',
        },
        component: () => import('@/view/market/app-center'),
      },
    ],
  },
  {
    path: '/revenue',
    name: 'revenue',
    meta: {
      icon: 'logo-yen',
      title: '收支管理',
      showAlways: true,
    },
    component: Main,
    children: [
      {
        path: 'revenue-list',
        name: 'revenue.revenue-list',
        meta: {
          icon: '',
          title: '收支管理',
        },
        component: () => import('@/view/revenue/revenue-list'),
      },
      {
        path: 'other-revenue-list',
        name: 'revenue.other-revenue-list',
        meta: {
          icon: '',
          title: '其他收入',
        },
        component: () => import('@/view/revenue/other-revenue-list'),
      },
    ],
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
      icon: 'md-settings',
      title: '核心设置',
      showAlways: true,
    },
    component: Main,
    children: [
      {
        path: 'system',
        name: 'setting.system',
        meta: {
          icon: '',
          title: '系统设置',
        },
        component: () => import('@/view/setting/system/index'),
      },
      {
        path: 'commission',
        name: 'setting.commission',
        meta: {
          icon: '',
          title: '提成设置',
        },
        component: () => import('@/view/setting/commission/index'),
      },
      {
        path: 'project',
        name: 'setting.project',
        meta: {
          icon: '',
          title: '品项设置',
        },
        component: () => import('@/view/setting/project/index'),
      },
      {
        path: 'log',
        name: 'setting.log',
        meta: {
          icon: '',
          title: '操作记录',
        },
        component: () => import('@/view/setting/log/index'),
      },
    ],
  },
]
