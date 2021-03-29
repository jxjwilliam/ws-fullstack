import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Divider,
} from '@material-ui/core'
import { ExpandMore, SupervisorAccount, History, Help } from '@material-ui/icons'
import { getToken } from '../../config/utils'
import { Emails, Contacts } from '../../config/constants.json'
import { version } from '../../../package.json'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
  wrap: {
    wordWrap: 'break-word' /* 允许长单词换行到下一行 */,
    wordBreak: 'break-all' /* 这个参数根据需要来决定要不要 */,
    overflow: 'hidden',
    whiteSpace: 'normal',
  },
}))

function Accordion1({ title = '', icon: Icon = History, expaneded = true, info = [] }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Accordion defaultExpanded={expaneded}>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="accordion1-content" id={title}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <Typography className={classes.heading}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>{info}</List>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

const Typography1 = props => {
  const classes = useStyles()
  return <Typography variant="body1" gutterBottom className={classes.wrap} {...props} />
}

const OperatorInfo = () => {
  const {
    username: account = '测试用户',
    category: organization = '微服务企业',
    role = '操作员',
    email: name = '微服务',
  } = getToken()

  const title = '操作员信息'
  const icon = SupervisorAccount
  const aryInfo = [`企业：${organization}`, `账号：${account}`, `名称：${name}`, `角色：${role}`].map(item => (
    <Typography1 key={item}>{item}</Typography1>
  ))

  return (
    <>
      <Accordion1 title={title} icon={icon} info={aryInfo} />
    </>
  )
}

function HelperInfo() {
  const title = '获取帮助'
  const icon = Help
  const aryInfo = [
    `技术支持部: `,
    ` ☎ ${Contacts.office}`,
    ` 📧 ${Emails.support}`,
    `市场部: `,
    ` ☎ ${Contacts.business}`,
    ` 📧 ${Emails.admin}`,
  ].map(item => <Typography1 key={item}>{item}</Typography1>)
  return <Accordion1 title={title} icon={icon} expaneded={false} info={aryInfo} />
}

function VersionInfo() {
  const title = '发行版本'
  const icon = History
  const aryInfo = [`当前版本: `, `‍🚀 ${version}`]
  return <Accordion1 title={title} icon={icon} expaneded={false} info={aryInfo} />
}

const ShowInfo = () => {
  const info = [OperatorInfo, HelperInfo, VersionInfo].map((Item, idx) => (
    // eslint-disable-next-line react/no-array-index-key
    <ListItem key={idx}>
      <Item />
    </ListItem>
  ))
  return <> {info} </>
}

// 当收缩时仅显示图标
const HideInfo = () => {
  const list = [SupervisorAccount, Help, History].map((Icon, idx) => (
    // eslint-disable-next-line react/no-array-index-key
    <Accordion defaultExpanded={false} key={idx}>
      <ListItemIcon>
        <Icon style={{ margin: 'auto' }} />
      </ListItemIcon>
    </Accordion>
  ))
  return (
    <>
      <Divider />
      {list}
    </>
  )
}

// TODO: cache

export default {
  ShowInfo,
  HideInfo,
}
