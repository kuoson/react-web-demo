import { useEffect, useState, type FC } from 'react'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import useGetComponentListInfo from '@/hooks/useGetComponentListInfo'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'

enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const items: TabsProps['items'] = [
  {
    key: TAB_KEYS.PROP_KEY,
    label: '属性',
    children: <ComponentProp />,
    icon: <FileTextOutlined />,
  },
  {
    key: TAB_KEYS.SETTING_KEY,
    label: '页面设置',
    children: <PageSetting />,
    icon: <SettingOutlined />,
  },
]

const RightPanel: FC = () => {
  const { selectedId } = useGetComponentListInfo()
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY)

  useEffect(() => {
    if (selectedId) setActiveKey(TAB_KEYS.PROP_KEY)
    else setActiveKey(TAB_KEYS.SETTING_KEY)
  }, [selectedId])

  return <Tabs activeKey={activeKey} items={items} />
}

export default RightPanel
