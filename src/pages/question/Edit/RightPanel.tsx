import type { FC } from 'react'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import ComponentProp from './ComponentProp'

const items: TabsProps['items'] = [
  {
    key: 'prop',
    label: '属性',
    children: <ComponentProp />,
    icon: <FileTextOutlined />,
  },
  {
    key: 'setting',
    label: '页面设置',
    children: 'Content of Tab Pane 2',
    icon: <SettingOutlined />,
  },
]

const RightPanel: FC = () => {
  return <Tabs defaultActiveKey="prop" items={items} />
}

export default RightPanel
