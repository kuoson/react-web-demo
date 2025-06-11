import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { Button, Tooltip, Space } from 'antd'
import {
  removeComponent,
  hiddenComponent,
} from '@/store/reducers/questionComponentsSlice'
import { useGetComponentListInfo } from '@/hooks/useGetComponentListInfo'

const EditToolBar: FC = () => {
  const { selectedId } = useGetComponentListInfo()
  const dispatch = useDispatch()

  const handleDel = () => {
    dispatch(removeComponent())
  }

  const handleHidden = () => {
    dispatch(hiddenComponent({ id: selectedId, isHidden: true }))
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
    </Space>
  )
}
export default EditToolBar
