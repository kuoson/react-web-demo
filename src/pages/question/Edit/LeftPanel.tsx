import type { FC } from 'react'
import { AppstoreAddOutlined, BarsOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import ComponentLib from './ComponentLib'

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '组件库',
    children: <ComponentLib />,
    icon: <AppstoreAddOutlined />,
  },
  {
    key: '2',
    label: '图层',
    children: 'Content of Tab Pane 2',
    icon: <BarsOutlined />,
  },
]

const LeftPanel: FC = () => {
  return (
    <Tabs defaultActiveKey="1" items={items} style={{ padding: '0 10px' }} />
  )
}

export default LeftPanel
