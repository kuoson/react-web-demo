import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
} from '@ant-design/icons'
import { Button, Tooltip, Space } from 'antd'
import {
  removeSelectedComponent,
  hiddenComponent,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  moveComponent,
  type componentInfoType,
} from '@/store/reducers/questionComponentsSlice'
import useGetComponentListInfo from '@/hooks/useGetComponentListInfo'
import useBindCanvasKeyPress from '@/hooks/useBindCanvasKeyPress'

const EditToolBar: FC = () => {
  const { selectedId, selectedComponent, componentList, copiedComponent } =
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

  const selectIndex = componentList.findIndex(
    (c: componentInfoType) => c.fe_id === selectedId,
  )
  const isFirst = selectIndex <= 0
  const isLast = selectIndex + 1 === componentList.length

  const handleMoveUp = () => {
    if (isFirst) return

    dispatch(
      moveComponent({ oldIndex: selectIndex, newIndex: selectIndex - 1 }),
    )
  }

  const handleMoveDown = () => {
    if (isLast) return

    dispatch(
      moveComponent({ oldIndex: selectIndex, newIndex: selectIndex + 1 }),
    )
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
      <Tooltip title="上移">
        <Button
          shape="circle"
          icon={<UpOutlined />}
          disabled={isFirst}
          onClick={handleMoveUp}
        />
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          disabled={isLast}
          onClick={handleMoveDown}
        />
      </Tooltip>
    </Space>
  )
}
export default EditToolBar
