import React from 'react'
import { TabPanels } from '../../components'

export default function () {
  const ary = ['风险预警信息', '逾期信息']

  return <TabPanels ary={ary} />
}
