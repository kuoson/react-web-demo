import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
} from '@ant-design/icons'
import { Button, Tooltip, Space } from 'antd'
import {
  removeSelectedComponent,
  hiddenComponent,
  toggleSelectedComponentLocked,
  copySelectedComponent,
} from '@/store/reducers/questionComponentsSlice'
import { useGetComponentListInfo } from '@/hooks/useGetComponentListInfo'

const EditToolBar: FC = () => {
  const { selectedId, selectedComponent } = useGetComponentListInfo()
  const { isLocked } = selectedComponent
  const dispatch = useDispatch()

  const handleDel = () => {
    dispatch(removeSelectedComponent())
  }

  const handleHidden = () => {
    dispatch(hiddenComponent({ id: selectedId, isHidden: true }))
  }

  const handleLock = () => {
    dispatch(toggleSelectedComponentLocked())
  }

  const handleCopy = () => {
    dispatch(copySelectedComponent())
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDel} />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={handleHidden}
        />
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          type={isLocked ? 'primary' : 'default'}
          onClick={handleLock}
        />
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy} />
      </Tooltip>
    </Space>
  )
}
export default EditToolBar
