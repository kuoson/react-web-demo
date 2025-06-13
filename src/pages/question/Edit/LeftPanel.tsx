import type { FC } from 'react'
import { AppstoreAddOutlined, BarsOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import ComponentLib from './ComponentLib'
import Layers from './Layers'

const items: TabsProps['items'] = [
  {
    key: 'componentLib',
    label: '组件库',
    children: <ComponentLib />,
    icon: <AppstoreAddOutlined />,
  },
  {
    key: 'layers',
    label: '图层',
    children: <Layers />,
    icon: <BarsOutlined />,
  },
]

const LeftPanel: FC = () => {
  return <Tabs defaultActiveKey="componentLib" items={items} />
}

export default LeftPanel
