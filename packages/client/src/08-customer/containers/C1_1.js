import React from 'react'
import { TabPanels } from '../../components'

export default function () {
  const ary = ['客户概况', '营业执照', '验资信息', '联系方式', '公司章程']
  return <TabPanels ary={ary} />
}
