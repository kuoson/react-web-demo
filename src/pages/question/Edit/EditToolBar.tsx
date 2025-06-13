import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
} from '@ant-design/icons'
import { Button, Tooltip, Space } from 'antd'
import {
  removeSelectedComponent,
  hiddenComponent,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
} from '@/store/reducers/questionComponentsSlice'
import useGetComponentListInfo from '@/hooks/useGetComponentListInfo'
import useBindCanvasKeyPress from '@/hooks/useBindCanvasKeyPress'

const EditToolBar: FC = () => {
  const { selectedId, selectedComponent, copiedComponent } =
    useGetComponentListInfo()
  const { isLocked } = selectedComponent
  const dispatch = useDispatch()

  const handleDel = () => {
    dispatch(removeSelectedComponent())
  }

  const handleHidden = () => {
    dispatch(hiddenComponent({ fe_id: selectedId, isHidden: true }))
  }

  const handleLock = () => {
    dispatch(toggleComponentLocked(selectedId))
  }

  const handleCopy = () => {
    dispatch(copySelectedComponent())
  }

  const handlePaste = () => {
    dispatch(pasteCopiedComponent())
  }

  useBindCanvasKeyPress()

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
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          disabled={!copiedComponent}
          onClick={handlePaste}
        />
      </Tooltip>
    </Space>
  )
}
export default EditToolBar
