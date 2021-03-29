import {
  AccountCircle,
  BorderBottom,
  Brush,
  Business,
  BusinessCenter,
  CheckCircleOutline,
  CreditCard,
  DataUsage,
  Details,
  DirectionsRun,
  ExitToApp,
  Group,
  Help,
  ListAlt,
  LiveHelp,
  LocationCity,
  MailOutline,
  Message,
  MonetizationOn,
  OfflineBolt,
  PermIdentity,
  Person,
  RateReview,
  SettingsInputSvideo,
  SupervisorAccount,
  Toc,
  TransferWithinAStation,
  Warning,
  BarChart,
} from '@material-ui/icons'
import { C1_1, C4_1 } from './containers'
import { GitAll, GitCustom } from './jobs'

const base = '客户信息'

const navList = {
  base: '客户信息',
  navs: [
    {
      path: '客户基本信息',
      icon: Group,
    },
    {
      path: '财务信息',
      icon: MonetizationOn,
    },
    {
      path: '评级限额信息',
      icon: RateReview,
    },
    {
      path: '风险信息',
      icon: OfflineBolt,
    },
    {
      path: '关联信息',
      icon: SettingsInputSvideo,
    },
    {
      path: '现有数据',
      icon: DataUsage,
    },
    {
      path: '帮助',
      icon: Help,
    },
  ],
}

const mainList = [
  {
    nav: '客户基本信息',
    main: [
      {
        path: '基础信息',
        icon: Message,
        component: C1_1,
      },
      {
        path: '管理层信息',
        icon: MailOutline,
        component: C1_1,
      },
      {
        path: '自然人实际控制人',
        icon: Person,
        component: C1_1,
      },
      {
        path: '非自然人实际控制人',
        icon: PermIdentity,
        component: C1_1,
      },
      {
        path: '主要财务资料',
        icon: BarChart,
      },
      {
        path: '客户评级与限额',
        icon: BarChart,
      },
      {
        path: '预警信息',
        icon: BarChart,
      },
      {
        path: '征信关注及不良',
        icon: BarChart,
      },
      {
        path: '关联关系信息',
        icon: BarChart,
      },
      {
        path: '上下游企业',
        icon: BarChart,
      },
    ],
  },
  {
    nav: '财务信息',
    main: [
      {
        path: '主要财务资料',
        icon: ListAlt,
        component: GitAll,
      },
    ],
  },
  {
    nav: '评级限额信息',
    main: [
      {
        path: '客户评级与限额',
        icon: AccountCircle,
        component: GitCustom,
      },
    ],
  },
  {
    nav: '风险信息',
    main: [
      {
        path: '预警信息',
        icon: Warning,
        component: C1_1,
      },
      {
        path: '征信关注及不良',
        icon: CreditCard,
        // component: C1_1,
      },
    ],
  },
  {
    nav: '关联信息',
    main: [
      {
        path: '关联关系信息',
        icon: Toc,
        // component: C1_1,
      },
      {
        path: '上下游企业',
        icon: LocationCity,
        // component: C1_1,
      },
    ],
  },
  {
    nav: '现有数据',
    main: [
      {
        path: '用户账户',
        icon: Person,
        // component: setView('user')
      },
      {
        path: '角色',
        icon: CheckCircleOutline,
        // component: setView('role')
      },
      {
        path: '组织',
        icon: Business,
        // component: setView('organization')
      },
      {
        path: '部门列表',
        icon: ListAlt,
        // component: setView('department')
      },
      {
        path: '账号细节',
        icon: AccountCircle,
        // component: setView('profile')
      },
      {
        path: 'POC管理',
        icon: SupervisorAccount,
        // component: setView('admin')
      },
      {
        path: '供应商',
        icon: BusinessCenter,
        // component: setView('supplier')
      },
      {
        path: '核心企业',
        icon: BorderBottom,
        // component: setView('core-business')
      },
      {
        path: '凭证',
        icon: Brush,
        // component: setView('certificate')
      },
      {
        path: '凭证状态查询',
        icon: TransferWithinAStation,
        // component: setView('status')
      },
      {
        path: '细节',
        icon: Details,
        // component: setView('detail')
      },
      {
        path: '测试',
        icon: DirectionsRun,
        // component: setView('test')
      },
    ],
  },
  {
    nav: '帮助',
    main: [
      {
        path: '帮助中心',
        icon: LiveHelp,
      },
      {
        path: '注册指导',
        icon: ExitToApp,
      },
      {
        path: '公司简介',
        icon: LocationCity,
      },
    ],
  },
]

export { base, navList, mainList }
